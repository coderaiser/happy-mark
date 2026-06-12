import {types} from '@putout/babel';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const yaml = (node) => {
    return callExpression(identifier('yaml'), [
        stringLiteral(node.value),
    ]);
};
