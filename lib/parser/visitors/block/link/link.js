import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const link = (node) => {
    const args = [
        ...node.children.map(convertInline),
        stringLiteral(node.url),
    ];
    
    if (node.title)
        args.push(stringLiteral(node.title));
    
    return callExpression(identifier('link'), args);
};
