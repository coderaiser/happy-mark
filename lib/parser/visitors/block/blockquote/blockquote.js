import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {identifier, callExpression} = types;

export const blockquote = (node) => {
    return callExpression(identifier('blockquote'), convertBlockquoteChildren(node.children));
};

function convertBlockquoteChildren(children) {
    const result = [];
    
    for (const child of children) {
        if (child.type === 'blockquote')
            result.push(callExpression(identifier('blockquote'), convertBlockquoteChildren(child.children)));
        else
            result.push(callExpression(identifier('p'), child.children.map(convertInline)));
    }
    
    return result;
}
