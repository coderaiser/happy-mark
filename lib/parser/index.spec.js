import {test} from 'supertape';
import {print} from '@putout/printer';
import {parseMarkdown} from './index.js';

test('makar: parser: heading', (t) => {
    const result = print(parseMarkdown('# hello'));
    const expected = `h1('hello');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: heading h2', (t) => {
    const result = print(parseMarkdown('## hello'));
    const expected = `h2('hello');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: paragraph', (t) => {
    const result = print(parseMarkdown('Hello world'));
    const expected = `p('Hello world');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: strong', (t) => {
    const result = print(parseMarkdown('**bold**'));
    const expected = `p(bold('bold'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: emphasis', (t) => {
    const result = print(parseMarkdown('*italic*'));
    const expected = `p(italic('italic'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: delete', (t) => {
    const result = print(parseMarkdown('~~strike~~'));
    const expected = `p(strike('strike'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: inlineCode', (t) => {
    const result = print(parseMarkdown('`code`'));
    const expected = `p(code('code'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: link', (t) => {
    const result = print(parseMarkdown('[link](url)'));
    const expected = `p(link('link', 'url'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: image', (t) => {
    const result = print(parseMarkdown('![alt](url)'));
    const expected = `p(img('alt', 'url'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: hr', (t) => {
    const result = print(parseMarkdown('---'));
    const expected = 'hr();\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: ul', (t) => {
    const result = print(parseMarkdown('- item'));
    const expected = `ul(li('item'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: ol', (t) => {
    const result = print(parseMarkdown('1. item'));
    const expected = `ol(li('item'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: blockquote', (t) => {
    const result = print(parseMarkdown('> quote'));
    const expected = `blockquote('quote');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: codeblock with lang', (t) => {
    const result = print(parseMarkdown('```js\nconst a = 3;\n```'));
    const expected = `codeblock('js', 'const a = 3;');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: codeblock no lang', (t) => {
    const result = print(parseMarkdown('```\ncode\n```'));
    const expected = `codeblock('', 'code');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: html block', (t) => {
    const result = print(parseMarkdown('<div>test</div>'));
    const expected = `html('<div>test</div>');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: link with title', (t) => {
    const result = print(parseMarkdown('[text](url "title")'));
    const expected = `p(link('text', 'url', 'title'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: image with title', (t) => {
    const result = print(parseMarkdown('![alt](url "title")'));
    const expected = `p(img('alt', 'url', 'title'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: image no alt', (t) => {
    const result = print(parseMarkdown('![](url)'));
    const expected = `p(img('', 'url'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: table', (t) => {
    const result = print(parseMarkdown('| A | B |\n| - | - |\n| 1 | 2 |'));
    const expected = `table(',', tr(td('A'), td('B')), tr(td('1'), td('2')));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: link reference', (t) => {
    const result = print(parseMarkdown('[text][key]\n\n[key]: https://example.com'));
    const expected = `p(link('text', 'https://example.com'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: image reference', (t) => {
    const result = print(parseMarkdown('![alt][key]\n\n[key]: https://example.com/img.png'));
    const expected = `p(img('alt', 'https://example.com/img.png'));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: task checked', (t) => {
    const result = print(parseMarkdown('- [x] done'));
    const expected = `ul(li('done', true));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: task unchecked', (t) => {
    const result = print(parseMarkdown('- [ ] todo'));
    const expected = `ul(li('todo', false));\n`;
    
    t.equal(result, expected);
    t.end();
});

test('makar: parser: break', (t) => {
    const result = print(parseMarkdown('a  \nb'));
    const expected = `p('a', br(), 'b');\n`;
    
    t.equal(result, expected);
    t.end();
});
