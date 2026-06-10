export const CallExpression = {
    print(path, printer) {
        const {write, traverse} = printer;
        const {name} = path.node.callee;
        
        if (/^h[1-6]$/.test(name))
            return h(path, printer);
        
        if (inlineWrap[name]) {
            const [prefix, suffix] = inlineWrap[name];
            const args = path.get('arguments');
            
            write(prefix);
            
            for (const arg of args)
                traverse(arg);
            
            write(suffix);
            
            return;
        }
        
        if (!blockPrint[name])
            throw Error(`${name} not supported yet`);
        
        blockPrint[name](path, printer);
    },
};

function h(path, {write, traverse}) {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    
    write('#'.repeat(Number(name[1])) + ' ');
    
    for (const arg of args)
        traverse(arg);
    
    write('\n');
}

const blockPrint = {
    br(path, {write}) {
        write('  \n');
    },
    
    html(path, {write}) {
        const args = path.get('arguments');
        write(args[0].node.value);
    },
    
    link(path, {write, traverse}) {
        const args = path.get('arguments');
        const n = args.length;
        const lastIsString = args.at(-1).node.type === 'StringLiteral';
        const secondLastIsString = n >= 2 && args.at(-2).node.type === 'StringLiteral';
        
        let urlIdx = n - 1;
        let titleIdx = -1;
        
        if (lastIsString && secondLastIsString && n >= 3) {
            urlIdx = n - 2;
            titleIdx = n - 1;
        }
        
        const href = args[urlIdx].node.value;
        const title = titleIdx >= 0 ? args[titleIdx].node.value : '';
        
        write('[');
        
        for (const arg of args.slice(0, urlIdx))
            traverse(arg);
        
        if (title) {
            write(`](${href} "${title}")`);
            return;
        }
        
        write(`](${href})`);
    },
    
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
    
    blockquote(path, {write, traverse}) {
        const args = path.get('arguments');
        
        write('> ');
        
        for (const [i, arg] of args.entries()) {
            if (i > 0)
                write('> ');
            
            traverse(arg);
        }
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
    
    ul(path, {write, traverse}) {
        const args = path.get('arguments');
        
        for (const item of args) {
            write('- ');
            traverse(item);
            write('\n');
        }
    },
    
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
    
    table(path, {write, traverse}) {
        const args = path.get('arguments');
        const alignments = [];
        let rowStart = 0;
        
        if (args[0] && args[0].node.type === 'StringLiteral') {
            const alignStr = args[0].node.value;
            
            if (alignStr)
                for (const a of alignStr.split(','))
                    alignments.push(a || null);
            
            rowStart = 1;
        }
        
        const rows = args.slice(rowStart);
        
        for (let i = 0; i < rows.length; i++) {
            traverse(rows[i]);
            
            if (!i && alignments.length > 0) {
                write('|');
                
                for (const a of alignments) {
                    switch(a) {
                    case 'left':
                        write(' :--- |');
                        break;
                    
                    case 'center':
                        write(' :---: |');
                        break;
                    
                    case 'right':
                        write(' ---: |');
                        break;
                    
                    default:
                        write(' --- |');
                        break;
                    }
                }
                
                write('\n');
            }
        }
    },
    
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

const inlineWrap = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    strike: ['~~', '~~'],
    code: ['`', '`'],
};
