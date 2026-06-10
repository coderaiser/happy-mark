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
    arrayExpression,
    expressionStatement,
    file,
    program,
} = types;

export function parseMarkdown(source) {
    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(source);
    
    const elements = mdast.children.map(convertBlock);
    
    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
}

const blockVisitors = {
    heading(node) {
        return callExpression(identifier(`h${node.depth}`), node.children.map(convertInline));
    },
    
    paragraph(node) {
        return callExpression(identifier('p'), node.children.map(convertInline));
    },
    
    blockquote(node) {
        return callExpression(identifier('blockquote'), convertBlockquoteChildren(node.children));
    },
    
    list(node) {
        return callExpression(identifier(node.ordered ? 'ol' : 'ul'), node.children.map(convertBlock));
    },
    
    listItem(node) {
        const args = node.children.flatMap((child) => child.children.map(convertInline));
        
        if (node.checked !== null && !isUndefined(node.checked))
            args.push(booleanLiteral(node.checked));
        
        return callExpression(identifier('li'), args);
    },
    
    code(node) {
        return callExpression(identifier('codeblock'), [
            stringLiteral(node.lang || ''),
            stringLiteral(node.value),
        ]);
    },
    
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
    
    imageReference(node) {
        return callExpression(identifier('imgRef'), [
            stringLiteral(node.alt || ''),
            stringLiteral(node.label),
        ]);
    },
    
    break() {
        return callExpression(identifier('br'), []);
    },
    
    html(node) {
        return callExpression(identifier('html'), [
            stringLiteral(node.value),
        ]);
    },
};

function convertBlock(node) {
    const visitor = blockVisitors[node.type];
    
    if (visitor)
        return visitor(node);
    
    return callExpression(identifier('raw'), [
        stringLiteral(node.type),
    ]);
}

function convertBlockquoteChildren(children) {
    const result = [];
    
    for (const child of children) {
        if (child.type === 'blockquote')
            result.push(callExpression(identifier('blockquote'), convertBlockquoteChildren(child.children)));
        
        result.push(...child.children.map(convertInline));
    }
    
    return result;
}

function convertInline(node) {
    const visitor = inlineVisitors[node.type];
    
    if (visitor)
        return visitor(node);
    
    return stringLiteral('');
}
