import {test} from 'supertape';
import {parseMarkdown, printMarkdown} from '../makar.js';

test('makar: printer: heading h1', (t) => {
    const result = printMarkdown(parseMarkdown('# hello'));
    const expected = '# hello\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: heading h2', (t) => {
    const result = printMarkdown(parseMarkdown('## hello'));
    const expected = '## hello\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: heading h3', (t) => {
    const result = printMarkdown(parseMarkdown('### hello'));
    const expected = '### hello\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: paragraph', (t) => {
    const result = printMarkdown(parseMarkdown('Hello world'));
    const expected = 'Hello world\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: bold', (t) => {
    const result = printMarkdown(parseMarkdown('**bold**'));
    const expected = '**bold**\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: italic', (t) => {
    const result = printMarkdown(parseMarkdown('*italic*'));
    const expected = '*italic*\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: strikethrough', (t) => {
    const result = printMarkdown(parseMarkdown('~~strike~~'));
    const expected = '~~strike~~\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: inlineCode', (t) => {
    const result = printMarkdown(parseMarkdown('`code`'));
    const expected = '`code`\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: link', (t) => {
    const result = printMarkdown(parseMarkdown('[text](url)'));
    const expected = '[text](url)\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: image', (t) => {
    const result = printMarkdown(parseMarkdown('![alt](url)'));
    const expected = '![alt](url)\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: hr', (t) => {
    const result = printMarkdown(parseMarkdown('---'));
    const expected = '---\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: ul', (t) => {
    const result = printMarkdown(parseMarkdown('- item'));
    const expected = '- item\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: ol', (t) => {
    const result = printMarkdown(parseMarkdown('1. item'));
    const expected = '1. item\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: blockquote', (t) => {
    const result = printMarkdown(parseMarkdown('> quote'));
    const expected = '> quote\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: link with title', (t) => {
    const result = printMarkdown(parseMarkdown('[text](url "title")'));
    const expected = '[text](url "title")\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: image with title', (t) => {
    const result = printMarkdown(parseMarkdown('![alt](url "title")'));
    const expected = '![alt](url "title")\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: image no alt', (t) => {
    const result = printMarkdown(parseMarkdown('![](url)'));
    const expected = '![](url)\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: html block', (t) => {
    const result = printMarkdown(parseMarkdown('<div>test</div>'));
    const expected = '<div>test</div>\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: inline html', (t) => {
    const result = printMarkdown(parseMarkdown('text <span>inline</span> end'));
    const expected = 'text <span>\ninline</span>\n end\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: hard break', (t) => {
    const result = printMarkdown(parseMarkdown('a  \nb'));
    const expected = 'a  \nb';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: table', (t) => {
    const result = printMarkdown(parseMarkdown('| A | B |\n| - | - |\n| 1 | 2 |'));
    const expected = '| A | B |\n| --- | --- |\n| 1 | 2 |\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: table alignment', (t) => {
    const result = printMarkdown(parseMarkdown('| L | C | R |\n| :--- | :---: | ---: |\n| 1 | 2 | 3 |'));
    const expected = '| L | C | R |\n| :--- | :---: | ---: |\n| 1 | 2 | 3 |\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: link reference', (t) => {
    const result = printMarkdown(parseMarkdown('[text][key]\n\n[key]: https://example.com'));
    const expected = '[text](https://example.com)\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: image reference', (t) => {
    const result = printMarkdown(parseMarkdown('![alt][key]\n\n[key]: https://example.com/img.png'));
    const expected = '![alt](https://example.com/img.png)\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: task checked', (t) => {
    const result = printMarkdown(parseMarkdown('- [x] done'));
    const expected = '- [x] done\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: task unchecked', (t) => {
    const result = printMarkdown(parseMarkdown('- [ ] todo'));
    const expected = '- [ ] todo\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: nested blockquote', (t) => {
    const result = printMarkdown(parseMarkdown('> Outer\n> > Inner'));
    const expected = '> Outer\n> > Inner\n\n';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: bold in link', (t) => {
    const result = printMarkdown(parseMarkdown('[**bold**](url)'));
    const expected = '[**bold**](url)';
    
    t.equal(result, expected);
    t.end();
});

test('makar: printer: link no text', (t) => {
    const result = printMarkdown(parseMarkdown('[](url)'));
    const expected = '[](url)';
    
    t.equal(result, expected);
    t.end();
});
