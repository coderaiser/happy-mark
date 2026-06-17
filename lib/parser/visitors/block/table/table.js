import {types} from '@putout/babel';
import {convertBlock} from '#parser/block';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const table = (node) => {
    const align = node.align
        .map((a) => a || '')
        .join(',');
    
    const args = [
        stringLiteral(align),
        ...node.children.map(convertBlock),
    ];
    
    return callExpression(identifier('table'), args);
};

