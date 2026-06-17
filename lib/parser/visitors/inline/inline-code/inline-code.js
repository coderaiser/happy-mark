import {types} from '@putout/babel';

const {
    stringLiteral,
    identifier,
    callExpression,
} = types;

export const inlineCode = ({value}) => {
    const code = value.includes('`') ? ` ${value} ` : value;
    
    return callExpression(identifier('code'), [
        stringLiteral(code),
    ]);
};
