import {types} from '@putout/babel';
import {createStringLiteral} from '#create-string-literal';
import {imageReference} from './image-reference/image-reference.js';
import {strong} from './strong/strong.js';
import {link} from '../block/link/link.js';
import {linkReference} from './link-reference/link-reference.js';

const {
    identifier,
    callExpression,
    stringLiteral,
} = types;

export const convertInline = (node) => {
    const {type} = node;
    const visitor = inlineVisitors[type];
    
    if (visitor)
        return visitor(node);
    
    return stringLiteral('');
};

export const inlineVisitors = {
    text(node) {
        return createStringLiteral(node.value);
    },
    strong,
    emphasis(node) {
        return callExpression(identifier('italic'), node.children.map(convertInline));
    },
    
    delete(node) {
        return callExpression(identifier('strike'), node.children.map(convertInline));
    },
    
    inlineCode(node) {
        return callExpression(identifier('code'), [
            stringLiteral(node.value),
        ]);
    },
    
    link,
    image(node) {
        const args = [
            stringLiteral(node.alt || ''),
            stringLiteral(node.url),
        ];
        
        if (node.title)
            args.push(stringLiteral(node.title));
        
        return callExpression(identifier('img'), args);
    },
    
    linkReference,
    imageReference,
    
    break() {
        return callExpression(identifier('br'), []);
    },
    
    html(node) {
        return callExpression(identifier('html'), [
            stringLiteral(node.value),
        ]);
    },
};
