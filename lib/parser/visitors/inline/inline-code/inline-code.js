import {types} from '@putout/babel';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const inlineCode = (node) => {
    return callExpression(identifier('code'), [
        stringLiteral(node.value),
    ]);
};

