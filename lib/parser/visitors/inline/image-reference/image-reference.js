import {types} from '@putout/babel';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const imageReference = (node) => {
    const {alt = '', label} = node;
    
    return callExpression(identifier('imgRef'), [
        stringLiteral(alt),
        stringLiteral(label),
    ]);
};
