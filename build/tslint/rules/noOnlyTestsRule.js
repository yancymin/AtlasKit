"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lint = require("tslint");
var ts = require("typescript");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoOnlyTests(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var objNames = [
    'describe', 'context', 'suite',
    'it', 'specify', 'test'
];
/**
 * Rule for preventing from committing .only test.
 */
var NoOnlyTests = (function (_super) {
    __extends(NoOnlyTests, _super);
    function NoOnlyTests() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoOnlyTests.prototype.visitCallExpression = function (node) {
        var expression = (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression)
            ? node.expression
            : null;
        if (expression
            && objNames.indexOf(expression.expression.getText()) !== -1
            && expression.name.text === 'only') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), node.expression.getText() + " is not permitted!"));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoOnlyTests;
}(Lint.RuleWalker));
