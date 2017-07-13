/* tslint:disable:no-bitwise */
import * as ts from 'typescript';

import JSONSchemaNode, {
  SchemaNode,
  StringSchemaNode,
  ArraySchemaNode,
  ObjectSchemaNode,
  EnumSchemaNode,
  PrimitiveSchemaNode,
  RefSchemaNode,
  EmptySchemaNode,
  AnyOfSchemaNode,
  AllOfSchemaNode,
} from './json-schema-nodes';


// Assuming that the last param will be a file, can be replaced with something like yargs in future
const file = process.argv[process.argv.length - 1];
const files = [file];

const program = ts.createProgram(files, { jsx: ts.JsxEmit.React });
const checker = program.getTypeChecker();
const typeIdToDefName: Map<number, string> = new Map();

const jsonSchema = new JSONSchemaNode(
  'draft-04',
  'Schema for Atlassian Editor documents.',
  'doc_node'
);

let ticks = 0;
program.getSourceFiles().forEach(walk);

waitForTicks().then(() => {
  /* tslint:disable-next-line:no-console */
  console.log(JSON.stringify(jsonSchema));
});

// Functions
function waitForTicks() {
  return new Promise(resolve => {
    const waitForTick = () => {
      process.nextTick(() => {
        ticks--;
        ticks > 0 ? waitForTick() : resolve();
      });
    };
    waitForTick();
  });
}

function walk(node: ts.Node) {
  if (isSourceFile(node)) {
    node.forEachChild(walk);
  } else if (isInterfaceDeclaration(node) || isTypeAliasDeclaration(node)) {
    const symbol: ts.Symbol = (node as any).symbol;
    const { name, ...rest } = getTags(symbol.getJsDocTags());
    if (name) {
      if (jsonSchema.hasDefinition(name)) {
        throw new Error(`Duplicate definition for ${name}`);
      }
      const type = checker.getTypeAtLocation(node);
      jsonSchema.addDefinition(name, getSchemaNodeFromType(type, rest));
      typeIdToDefName.set((type as any).id, name);
    }
  } else {
    // If in future we need support for other nodes, this will help to debug
    // console.log(syntaxKindToName(node.kind));
    // node.forEachChild(walk);
  }
}

function getSchemaNodeFromType(type: ts.Type, validators = {}): SchemaNode {
  // Found a $ref
  if (typeIdToDefName.has((type as any).id)) {
    return new RefSchemaNode(
      `#/definitions/${typeIdToDefName.get((type as any).id)!}`
    );
  } else if (isStringType(type)) {
    return new StringSchemaNode(validators);
  } else if (isBooleanType(type)) {
    return new PrimitiveSchemaNode('boolean');
  } else if (isNumberType(type)) {
    return new PrimitiveSchemaNode('number', validators);
  } else if (isUnionType(type)) {
    const isEnum = type.types.every(t => isStringLiteralType(t));
    if (isEnum) {
      return new EnumSchemaNode(
        type.types.map(t => (t as ts.LiteralType).text)
      );
    } else {
      return new AnyOfSchemaNode(type.types.map(t => getSchemaNodeFromType(t)));
    }
  } else if (isIntersectionType(type)) {
    return new AllOfSchemaNode(type.types.map(t => getSchemaNodeFromType(t)));
  } else if (isArrayType(type)) {
    const types = type.typeArguments.length === 1 // Array< X | Y >
      ? [type.typeArguments[0]]
      : type.typeArguments;
    return new ArraySchemaNode(
      types.length === 1 && isAnyType(types[0]) // Array<any>
        ? []
        : types.map(t => getSchemaNodeFromType(t)),
      validators
    );
  } else if (isObjectType(type)) {
    const obj = new ObjectSchemaNode({}, validators);
    // Use node's queue to prevent circular dependency
    process.nextTick(() => {
      ticks++;
      const props = checker.getPropertiesOfType(type);
      props.forEach(prop => {
        const name = prop.getName();
        // Drop private properties __fileName, __fileType, etc
        if ((name[0] !== '_' || name[1] !== '_') && prop.valueDeclaration) {
          const propType = checker.getTypeOfSymbolAtLocation(
            prop,
            prop.valueDeclaration
          );
          const isRequired = (prop.getFlags() & ts.SymbolFlags.Optional) === 0;
          const validators = getTags(prop.getJsDocTags());
          obj.addProperty(
            name,
            getSchemaNodeFromType(propType, validators),
            isRequired
          );
        }
      });
    });
    return obj;
  } else if (isLiteralType(type)) {
    // Using ConstSchemaNode doesn't pass validation
    return new EnumSchemaNode(extractLiteralValue(type));
  } else if (isNonPrimitiveType(type)) {
    // object
    return new EmptySchemaNode();
  }

  throw new Error(`TODO: ${checker.typeToString(type)} to be defined`);
}

type TagInfo = { name: string };

function getTags(tagInfo: ts.JSDocTagInfo[]): TagInfo {
  return tagInfo.reduce((obj, { name, text = '' }) => {
    let val: any = text;
    if (/^\d+$/.test(text)) {
      // Number
      val = +text;
    } else if (text[0] === '"') {
      // " wrapped string
      val = JSON.parse(text);
    } else if (text === 'true') {
      val = true;
    } else if (text === 'false') {
      val = false;
    }
    (obj as any)[name] = val;
    return obj;
  }, {} as TagInfo);
}

type PrimitiveType = number | boolean | string;

function extractLiteralValue(typ: ts.Type): PrimitiveType {
  if (typ.flags & ts.TypeFlags.EnumLiteral) {
    let str = (<ts.LiteralType>typ).text;
    let num = parseFloat(str);
    return isNaN(num) ? str : num;
  } else if (typ.flags & ts.TypeFlags.StringLiteral) {
    return (<ts.LiteralType>typ).text;
  } else if (typ.flags & ts.TypeFlags.NumberLiteral) {
    return parseFloat((<ts.LiteralType>typ).text);
  } else if (typ.flags & ts.TypeFlags.BooleanLiteral) {
    return (typ as any).intrinsicName === 'true';
  }
  throw new Error(`Couldn't parse in extractLiteralValue`);
}

// Helpers
function isSourceFile(node: ts.Node): node is ts.SourceFile {
  return node.kind === ts.SyntaxKind.SourceFile;
}

function isInterfaceDeclaration(
  node: ts.Node
): node is ts.InterfaceDeclaration {
  return node.kind === ts.SyntaxKind.InterfaceDeclaration;
}

function isTypeAliasDeclaration(
  node: ts.Node | ts.Declaration
): node is ts.TypeAliasDeclaration {
  return node.kind === ts.SyntaxKind.TypeAliasDeclaration;
}

function isStringType(type: ts.Type) {
  return (type.flags & ts.TypeFlags.String) > 0;
}

function isBooleanType(type: ts.Type) {
  return (type.flags & ts.TypeFlags.Boolean) > 0;
}

function isNumberType(type: ts.Type) {
  return (type.flags & ts.TypeFlags.Number) > 0;
}

function isUnionType(type: ts.Type): type is ts.UnionType {
  return (type.flags & ts.TypeFlags.Union) > 0;
}

function isIntersectionType(type: ts.Type): type is ts.IntersectionType {
  return (type.flags & ts.TypeFlags.Intersection) > 0;
}

function isArrayType(type: ts.Type): type is ts.TypeReference {
  return (
    (type.flags & ts.TypeFlags.Object) > 0 &&
    ((type as ts.ObjectType).objectFlags & ts.ObjectFlags.Reference) > 0 &&
    type.getSymbol().getName() === 'Array'
  );
}

function isObjectType(type: ts.Type): type is ts.ObjectType {
  return (type.flags & ts.TypeFlags.Object) > 0;
}

function isStringLiteralType(type: ts.Type): type is ts.LiteralType {
  return (type.flags & ts.TypeFlags.StringLiteral) > 0;
}

function isLiteralType(type: ts.Type): type is ts.LiteralType {
  return (type.flags & ts.TypeFlags.Literal) > 0;
}

function isNonPrimitiveType(type: ts.Type): type is ts.LiteralType {
  return (type.flags & ts.TypeFlags.NonPrimitive) > 0;
}

function isAnyType(type: ts.Type): type is ts.Type {
  return (type.flags & ts.TypeFlags.Any) > 0;
}

/*
function syntaxKindToName(kind: ts.SyntaxKind) {
  return ts.SyntaxKind[kind];
}
*/
