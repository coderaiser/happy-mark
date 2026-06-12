import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import {types} from '@putout/babel';
import {convertInline} from './visitors/inline/inline.js';
import {blockVisitors, convertBlock} from './visitors/block/block.js';

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
        .use(remarkFrontmatter, ['yaml'])
        .parse(source);
    
    const elements = mdast.children.map(convertBlock);
    
    return file(program([
        expressionStatement(arrayExpression(elements)),
    ]));
}

