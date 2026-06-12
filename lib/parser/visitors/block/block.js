import {types} from '@putout/babel';
import {convertInline} from '#parser/inline';
import {yaml} from './yaml/yaml.js';
import {code} from './code/code.js';
import {blockquote} from './blockquote/blockquote.js';

export function convertBlock(node) {
    const {type} = node;
    const visitor = blockVisitors[type];
    
    if (visitor)
        return visitor(node);
    
    return callExpression(identifier('raw'), [
        stringLiteral(node.type),
    ]);
}

const isUndefined = (a) => typeof a === 'undefined';

const {
    callExpression,
    identifier,
    booleanLiteral,
    stringLiteral,
} = types;

export const blockVisitors = {
    heading(node) {
        return callExpression(identifier(`h${node.depth}`), node.children.map(convertInline));
    },
    
    paragraph(node) {
        return callExpression(identifier('p'), node.children.map(convertInline));
    },
    blockquote,
    
    list(node) {
        const type = node.ordered ? 'ol' : 'ul';
        return callExpression(identifier(type), node.children.map(convertBlock));
    },
    
    listItem(node) {
        const args = node.children.flatMap((child) => child.children.map(convertInline));
        
        if (node.checked !== null && !isUndefined(node.checked))
            args.push(booleanLiteral(node.checked));
        
        return callExpression(identifier('li'), args);
    },
    code,
    thematicBreak() {
        return callExpression(identifier('hr'), []);
    },
    
    html(node) {
        return callExpression(identifier('html'), [
            stringLiteral(node.value),
        ]);
    },
    
    table(node) {
        const align = node.align
            .map((a) => a || '')
            .join(',');
        
        const args = [
            stringLiteral(align),
            ...node.children.map(convertBlock),
        ];
        
        return callExpression(identifier('table'), args);
    },
    
    tableRow(node) {
        return callExpression(identifier('tr'), node.children.map(convertBlock));
    },
    
    tableCell(node) {
        return callExpression(identifier('td'), node.children.map(convertInline));
    },
    
    definition(node) {
        const args = [
            stringLiteral(node.label),
            stringLiteral(node.url),
        ];
        
        if (node.title)
            args.push(stringLiteral(node.title));
        
        return callExpression(identifier('def'), args);
    },
    yaml,
};

