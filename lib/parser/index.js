import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import {types} from '@putout/babel';

const isUndefined = (a) => typeof a === 'undefined';

const {
    stringLiteral,
    booleanLiteral,
    callExpression,
    identifier,
    expressionStatement,
    file,
    program,
} = types;

let definitions = {};

export function parseMarkdown(src) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(src);
    
    definitions = {};
    
    for (const child of mdast.children) {
        if (child.type === 'definition')
            definitions[child.identifier.toLowerCase()] = {
                url: child.url,
                title: child.title || '',
            };
    }
    
    return file(program(mdast.children
        .map(convertBlock)
        .filter(Boolean)));
}

const blockVisitors = {
    heading(node) {
        return expressionStatement(callExpression(identifier(`h${node.depth}`), node.children.map(convertInline)));
    },
    
    paragraph(node) {
        return expressionStatement(callExpression(identifier('p'), node.children.map(convertInline)));
    },
    
    blockquote(node) {
        return expressionStatement(callExpression(identifier('blockquote'), convertBlockquoteChildren(node.children)));
    },
    
    list(node) {
        return expressionStatement(callExpression(identifier(node.ordered ? 'ol' : 'ul'), node.children.map(convertBlock)));
    },
    
    listItem(node) {
        const args = node.children.flatMap((child) => child.children.map(convertInline));
        
        if (node.checked !== null && !isUndefined(node.checked))
            args.push(booleanLiteral(node.checked));
        
        return callExpression(identifier('li'), args);
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
    
    html(node) {
        return expressionStatement(callExpression(identifier('html'), [stringLiteral(node.value)]));
    },
    
    table(node) {
        const align = node.align
            .map((a) => a || '')
            .join(',');
        const args = [stringLiteral(align), ...node.children.map(convertBlock)];
        
        return expressionStatement(callExpression(identifier('table'), args));
    },
    
    tableRow(node) {
        return callExpression(identifier('tr'), node.children.map(convertBlock));
    },
    
    tableCell(node) {
        return callExpression(identifier('td'), node.children.map(convertInline));
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
        const def = definitions[node.identifier.toLowerCase()];
        const url = def ? def.url : '';
        
        return callExpression(identifier('link'), [
            ...node.children.map(convertInline),
            stringLiteral(url),
        ]);
    },
    
    imageReference(node) {
        const def = definitions[node.identifier.toLowerCase()];
        const url = def ? def.url : '';
        
        return callExpression(identifier('img'), [
            stringLiteral(node.alt || ''),
            stringLiteral(url),
        ]);
    },
    
    break() {
        return callExpression(identifier('br'), []);
    },
    
    html(node) {
        return callExpression(identifier('html'), [stringLiteral(node.value)]);
    },
};

function convertBlock(node) {
    if (node.type === 'definition')
        return null;
    
    return blockVisitors[node.type]?.(node) || expressionStatement(callExpression(identifier('raw'), [stringLiteral(node.type)]));
}

function convertBlockquoteChildren(children) {
    return children.flatMap((child) => {
        if (child.type === 'blockquote')
            return callExpression(identifier('blockquote'), convertBlockquoteChildren(child.children));
        
        return child.children.map(convertInline);
    });
}

function convertInline(node) {
    return inlineVisitors[node.type]?.(node) || stringLiteral('');
}
