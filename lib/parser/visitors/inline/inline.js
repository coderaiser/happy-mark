import {types} from '@putout/babel';
import {imageReference} from './image-reference/image-reference.js';

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
        return stringLiteral(node.value);
    },
    
    strong(node) {
        return callExpression(identifier('bold'), node.children.map(convertInline));
    },
    
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
    
    link(node) {
        const args = [
            ...node.children.map(convertInline),
            stringLiteral(node.url),
        ];
        
        if (node.title)
            args.push(stringLiteral(node.title));
        
        return callExpression(identifier('link'), args);
    },
    
    image(node) {
        const args = [
            stringLiteral(node.alt || ''),
            stringLiteral(node.url),
        ];
        
        if (node.title)
            args.push(stringLiteral(node.title));
        
        return callExpression(identifier('img'), args);
    },
    
    linkReference(node) {
        return callExpression(identifier('linkRef'), [
            ...node.children.map(convertInline),
            stringLiteral(node.label),
        ]);
    },
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

