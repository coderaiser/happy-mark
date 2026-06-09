import {StringLiteral} from './string-literal.js';
import {ExpressionStatement} from './expression-statement.js';
import {CallExpression} from './call-expression.js';

export const visitors = {
    CallExpression,
    StringLiteral,
    ExpressionStatement,
};
