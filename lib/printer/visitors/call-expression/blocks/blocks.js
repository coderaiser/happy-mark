import {table} from './table.js';
import {createInlineBlock} from './inline.js';
import {heading} from './heading/heading.js';
import {ul} from './ul/ul.js';
import {blockquote} from './blockquote.js';
import {html} from './html/html.js';
import {link} from './link.js';
import {img} from './img.js';
import {codeblock} from './codeblock/codeblock.js';
import {p} from './p/p.js';
import {definition} from './definition/definition.js';

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
    
    img,
    imgRef(path, {write}) {
        const args = path.get('arguments');
        const alt = args[0].node.value;
        const label = args[1].node.value;
        
        write(`![${alt}][${label}]`);
    },
    definition,
    p,
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
    
    codeblock,
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
    yaml(path, {write}) {
        const args = path.get('arguments');
        const value = args[0].node.quasis[0].value.raw;
        
        write('---\n');
        write(value);
        write('\n---');
    },
};
