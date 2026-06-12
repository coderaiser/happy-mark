import {types} from '@putout/babel';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const html = (node) => {
    return callExpression(identifier('html'), [
        stringLiteral(node.value),
    ]);
};
