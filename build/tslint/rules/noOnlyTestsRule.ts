import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoOnlyTests(sourceFile, this.getOptions()));
    }
}

const objNames = [
  'describe', 'context', 'suite',
  'it', 'specify', 'test'
];

/**
 * Rule for preventing from committing .only test.
 */
class NoOnlyTests extends Lint.RuleWalker {
  public visitCallExpression(node: ts.CallExpression) {
    const expression = (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression)
      ? node.expression as ts.PropertyAccessExpression
      : null;

    if (
      expression
      && objNames.indexOf(expression.expression.getText()) !== -1
      && expression.name.text === 'only'
    ) {
      this.addFailure(
        this.createFailure(node.getStart(), node.getWidth(), `${node.expression.getText()} is not permitted!`)
      );
    }

    super.visitCallExpression(node);
  }
}
