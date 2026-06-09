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

