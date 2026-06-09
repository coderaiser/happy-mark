import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import {types} from '@putout/babel';

const {
    stringLiteral,
    callExpression,
    identifier,
    expressionStatement,
    file,
    program,
} = types;

export function parseMarkdown(src) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(src);
    
    return file(program(mdast.children.map(convertBlock)));
}

const blockVisitors = {
    heading(node) {
        return expressionStatement(callExpression(identifier(`h${node.depth}`), node.children.map(convertInline)));
    },
    
    paragraph(node) {
        return expressionStatement(callExpression(identifier('p'), node.children.map(convertInline)));
    },
    
    blockquote(node) {
        const children = node.children.flatMap((child) => child.children.map(convertInline));
        
        return expressionStatement(callExpression(identifier('blockquote'), children));
    },
    
    list(node) {
        return expressionStatement(callExpression(identifier(node.ordered ? 'ol' : 'ul'), node.children.map(convertBlock)));
    },
    
    listItem(node) {
        return callExpression(identifier('li'), node.children.flatMap((child) => child.children.map(convertInline)));
    },
    
    code(node) {
        return expressionStatement(callExpression(identifier('codeblock'), [
            stringLiteral(node.lang || ''),
            stringLiteral(node.value),
        ]));
    },
    
    thematicBreak() {
        return expressionStatement(callExpression(identifier('hr'), []));
    },
};

const inlineVisitors = {
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
        return callExpression(identifier('code'), [stringLiteral(node.value)]);
    },
    
    link(node) {
        return callExpression(identifier('link'), [
            ...node.children.map(convertInline),
            stringLiteral(node.url),
        ]);
    },
    
    image(node) {
        return callExpression(identifier('img'), [
            stringLiteral(node.alt || ''),
            stringLiteral(node.url),
        ]);
    },
};

function convertBlock(node) {
    return blockVisitors[node.type]?.(node) || expressionStatement(callExpression(identifier('raw'), [stringLiteral(node.type)]));
}

function convertInline(node) {
    return inlineVisitors[node.type]?.(node) || stringLiteral('');
}
