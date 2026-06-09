import {isNextParent} from '@putout/printer/is';

export const CallExpression = {
    print(path, {write, traverse: tr}) {
        const {name} = path.node.callee;
        const args = path.get('arguments');
        
        const printArgs = () => {
            for (const arg of args)
                tr(arg);
        };
        
        if (/^h[1-6]$/.test(name)) {
            write('#'.repeat(Number(name[1])) + ' ');
            printArgs();
            
            if (isNextParent(path))
                write('\n\n');
            
            return;
        }
        
        if (inlineWrap[name]) {
            const [prefix, suffix] = inlineWrap[name];
            
            write(prefix);
            printArgs();
            write(suffix);
            
            return;
        }
        
        if (name === 'br') {
            write('  \n');
            
            return;
        }
        
        if (name === 'html') {
            write(args[0].node.value);
            write('\n');
            
            return;
        }
        
        if (name === 'link') {
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
                tr(arg);
            
            if (title)
                write(`](${href} "${title}")`);
            else
                write(`](${href})`);
            
            return;
        }
        
        if (name === 'img') {
            const alt = args[0].node.value;
            let url = '';
            let title = '';
            
            if (args.length >= 2)
                url = args[1].node.value;
            
            if (args.length >= 3)
                title = args[2].node.value;
            
            if (title)
                write(`![${alt}](${url} "${title}")`);
            else
                write(`![${alt}](${url})`);
            
            return;
        }
        
        blockPrint[name]?.(args, {
            printArgs,
            write,
            tr,
        });
    },
};

const blockPrint = {
    p(args, {printArgs, write}) {
        printArgs();
        write('\n');
    },
    
    blockquote(args, {write, tr}) {
        write('> ');
        
        for (const [i, arg] of args.entries()) {
            if (i > 0)
                write('> ');
            
            tr(arg);
            write('\n');
        }
    },
    
    hr(args, {write}) {
        write('---\n');
    },
    
    li(args, {printArgs, write, tr}) {
        const lastArg = args.at(-1);
        const hasCheckbox = lastArg?.node?.type === 'BooleanLiteral';
        
        if (hasCheckbox) {
            write(lastArg.node.value ? '[x] ' : '[ ] ');
            
            for (const arg of args.slice(0, -1))
                tr(arg);
            
            return;
        }
        
        printArgs();
    },
    
    ul(args, {write, tr}) {
        for (const item of args) {
            write('- ');
            tr(item);
            write('\n');
        }
    },
    
    ol(args, {write, tr}) {
        let n = 1;
        
        for (const item of args) {
            write(`${n++}. `);
            tr(item);
            write('\n');
        }
    },
    
    codeblock(args, {write}) {
        write(
            '```' +
            args[0].node.value +
            '\n' +
            args[1].node.value +
            '\n```\n',
        );
    },
    
    table(args, {write, tr}) {
        const alignments = [];
        let rowStart = 0;
        
        if (args[0]?.node?.type === 'StringLiteral') {
            const alignStr = args[0].node.value;
            
            if (alignStr)
                for (const a of alignStr.split(',')) {
                    alignments.push(a || null);
                }
            
            rowStart = 1;
        }
        
        const rows = args.slice(rowStart);
        
        for (let i = 0; i < rows.length; i++) {
            tr(rows[i]);
            
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
    
    tr(args, {write, tr}) {
        write('|');
        
        for (const cell of args) {
            write(' ');
            tr(cell);
            write(' |');
        }
        
        write('\n');
    },
    
    td(args, {printArgs}) {
        printArgs();
    },
    
    raw(args, {write}) {
        write(args[0].node.value);
    },
};

const inlineWrap = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    strike: ['~~', '~~'],
    code: ['`', '`'],
};

