import {types} from '@putout/babel';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const code = (node) => {
    const {value} = node;
    const lang = node.lang || '';
    
    const codeblock = identifier('codeblock');
    
    return callExpression(codeblock, [
        stringLiteral(lang),
        stringLiteral(value),
    ]);
};
