import {readFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';
import {montag} from 'montag';
import {print} from '@putout/printer';
import {traverse, parse} from '@putout/babel';
import {parseMarkdown, printMarkdown} from '../lib/makar.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('makar: roundtrip: basic', (t) => {
    const source = '# hello\n\nHello world\n\n```js\nconst a = 3;\n```';
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    const expected = '# hello\n\nHello world\n```js\nconst a = 3;\n```\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: roundtrip: inline formatting', (t) => {
    const source = '**bold** *italic* `code` ~~strike~~';
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = '**bold** *italic* `code` ~~strike~~\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: emphasis', (t) => {
    const source = montag`
        *italic*
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        *italic*\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: delete', (t) => {
    const source = montag`
        ~~strike~~
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ~~strike~~\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: inlineCode', (t) => {
    const source = montag`
        \`code\`
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        \`code\`\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: link', (t) => {
    const source = montag`
        [link](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        [link](url)\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: image', (t) => {
    const source = montag`
        ![alt](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ![alt](url)\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: hr', (t) => {
    const source = montag`
        ---
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ---\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: ul', (t) => {
    const source = montag`
        - item
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        - item\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: ol', (t) => {
    const source = montag`
        1. item
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        1. item\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: code: no lang', (t) => {
    const source = montag`
        \`\`\`
        code
        \`\`\`
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        codeblock('', 'code');
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: image: no alt', (t) => {
    const source = montag`
        ![](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        p(img('', 'url'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: unknown block type html', (t) => {
    const source = montag`
        <div>test</div>
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        html('<div>test</div>');
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: unknown inline type', (t) => {
    const source = 'a\n  b';
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    const expected = 'a\nb\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: code: no lang', (t) => {
    const source = montag`
        \`\`\`
        code
        \`\`\`
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        codeblock('', 'code');\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: image: no alt', (t) => {
    const source = montag`
        ![](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        ![](url)\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: blockquote', (t) => {
    const source = montag`
        > quote
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        > quote\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: unknown block type html', (t) => {
    const source = montag`
        <div>test</div>
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    const expected = '<div>test</div>\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: js -> markdown', (t) => {
    const source = montag`
        # hello
    `;
    
    const ast = parseMarkdown(source);
    
    traverse(ast, {
        CallExpression(path) {
            if (path.node.callee.name === 'h1')
                path.node.callee.name = 'h2';
        },
    });
    const js = print(ast);
    const jsAST = parse(js);
    const result = printMarkdown(jsAST);
    
    const expected = montag`
        ## hello\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: end of file', (t) => {
    const source = montag`
        ## License
        
        MIT\n
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    t.equal(result, source);
    t.end();
});

test('makar: badges', (t) => {
    const source = montag`
        # Hello [![License][NPMURL]][NPMIMGURL]
        
        [NPMURL]: https://npmjs.org/package/hello "npm"
        [NPMIMGURL]: https://img.shields.io/npm/v/hello.svg?style=flat
    
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    t.equal(result, source);
    t.end();
});

test.only('makar: readme', (t) => {
    const source = readFileSync(new URL('../README.md', import.meta.url).pathname, 'utf8');
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    t.equal(result, source);
    t.end();
});

