import {test} from 'supertape';
import {montag} from 'montag';
import {print} from '@putout/printer';
import {parseMarkdown, printMarkdown} from '../lib/makar.js';

test('makar: parseMarkdown', (t) => {
    const source = montag`
        # hello
        
        Hello world
        
        \`\`\`js
        const a = 3;
        \`\`\`
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        h1('hello');
        p('Hello world');
        codeblock('js', 'const a = 3;');
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: strong', (t) => {
    const source = montag`
        **bold**
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        p(bold('bold'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: emphasis', (t) => {
    const source = montag`
        *italic*
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        p(italic('italic'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: delete', (t) => {
    const source = montag`
        ~~strike~~
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        p(strike('strike'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: inlineCode', (t) => {
    const source = montag`
        \`code\`
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        p(code('code'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: link', (t) => {
    const source = montag`
        [link](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        p(link('link', 'url'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: image', (t) => {
    const source = montag`
        ![alt](url)
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        p(img('alt', 'url'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: hr', (t) => {
    const source = montag`
        ---
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        hr();
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: ul', (t) => {
    const source = montag`
        - item
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        ul(li('item'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: ol', (t) => {
    const source = montag`
        1. item
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        ol(li('item'));
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: blockquote', (t) => {
    const source = montag`
        > quote
    `;
    
    const ast = parseMarkdown(source);
    const result = print(ast);
    
    const expected = montag`
        blockquote('quote');
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown', (t) => {
    const source = montag`
        # hello
        Hello world
        
        \`\`\`js
        const a = 3;
        \`\`\`
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        # hello
        
        Hello world
        \`\`\`js
        const a = 3;
        \`\`\`\n
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: printMarkdown: strong', (t) => {
    const source = montag`
        **bold**
    `;
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    
    const expected = montag`
        **bold**\n
    
    `;
    
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
        raw('html');
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parseMarkdown: unknown inline type', (t) => {
    const source = 'a  \nb';
    
    const ast = parseMarkdown(source);
    const result = printMarkdown(ast);
    const expected = 'ab\n\n';
    
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
    const result = printMarkdown(ast);
    
    const expected = montag`
        \`\`\`
        code
        \`\`\`\n
    
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
    const expected = '\n';
    
    t.equal(result, expected);
    t.end();
});
