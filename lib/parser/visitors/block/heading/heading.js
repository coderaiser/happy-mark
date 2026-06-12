import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';

const {identifier, callExpression} = types;

export const heading = (node) => {
    const {depth} = node;
    const id = identifier(`h${depth}`);
    const args = node.children.map(convertInline);
    
    return callExpression(id, args);
};
