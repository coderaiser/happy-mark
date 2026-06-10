import {link} from 'node:fs/promises';
import {table} from './table.js';
import {createInlineBlock} from './inline.js';
import {heading} from './heading.js';
import {ul} from './ul/ul.js';
import {blockquote} from './blockquote.js';
import {html} from './html.js';

export const blocks = {
    blockquote,
    bold: createInlineBlock('**'),
    italic: createInlineBlock('*'),
    strike: createInlineBlock('~~'),
    code: createInlineBlock('`'),
    h1: heading,
    h2: heading,
    h3: heading,
    h4: heading,
    h5: heading,
    h6: heading,
    br(path, {write}) {
        write('  \n');
    },
    
    html,
    link,
    linkRef(path, {write, traverse}) {
        const args = path.get('arguments');
        const label = args.at(-1).node.value;
        
        write('[');
        
        for (const arg of args.slice(0, -1))
            traverse(arg);
        
        write(`][${label}]`);
    },
    
    img(path, {write}) {
        const args = path.get('arguments');
        const alt = args[0].node.value;
        const url = args.length >= 2 ? args[1].node.value : '';
        const title = args.length >= 3 ? args[2].node.value : '';
        
        if (title) {
            write(`![${alt}](${url} "${title}")`);
            return;
        }
        
        write(`![${alt}](${url})`);
    },
    
    imgRef(path, {write}) {
        const args = path.get('arguments');
        const alt = args[0].node.value;
        const label = args[1].node.value;
        
        write(`![${alt}][${label}]`);
    },
    
    def(path, {write}) {
        const args = path.get('arguments');
        const label = args[0].node.value;
        const url = args[1].node.value;
        const title = args.length >= 3 ? args[2].node.value : '';
        
        if (title) {
            write(`[${label}]: ${url} "${title}"`);
            return;
        }
        
        write(`[${label}]: ${url}`);
    },
    
    p(path, {traverse}) {
        const args = path.get('arguments');
        
        for (const arg of args)
            traverse(arg);
    },
    hr(path, {write}) {
        write('---');
    },
    
    li(path, {write, traverse}) {
        const args = path.get('arguments');
        const lastArg = args.at(-1);
        const hasCheckbox = lastArg && lastArg.node.type === 'BooleanLiteral';
        
        if (hasCheckbox) {
            write(lastArg.node.value ? '[x] ' : '[ ] ');
            
            for (const arg of args.slice(0, -1))
                traverse(arg);
            
            return;
        }
        
        for (const arg of args)
            traverse(arg);
    },
    ul,
    ol(path, {write, traverse}) {
        const args = path.get('arguments');
        let n = 1;
        
        for (const item of args) {
            write(`${n++}. `);
            traverse(item);
            write('\n');
        }
    },
    
    codeblock(path, {write}) {
        const args = path.get('arguments');
        
        write(
            '```' +
            args[0].node.value +
            '\n' +
            args[1].node.value +
            '\n```',
        );
    },
    table,
    
    tr(path, {write, traverse}) {
        const args = path.get('arguments');
        
        write('|');
        
        for (const cell of args) {
            write(' ');
            traverse(cell);
            write(' |');
        }
        
        write('\n');
    },
    
    td(path, {traverse}) {
        const args = path.get('arguments');
        
        for (const arg of args)
            traverse(arg);
    },
    
    raw(path, {write}) {
        const args = path.get('arguments');
        write(args[0].node.value);
    },
};
