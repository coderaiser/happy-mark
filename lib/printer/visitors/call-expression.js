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
    
    blockquote(args, {printArgs, write}) {
        write('> ');
        printArgs();
        write('\n');
    },
    
    hr(args, {write}) {
        write('---\n');
    },
    
    li(args, {printArgs}) {
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
    
    link(args, {write, tr}) {
        const href = args.at(-1).node.value;
        
        write('[');
        
        for (const arg of args.slice(0, -1))
            tr(arg);
        
        write(`](${href})`);
    },
    
    img(args, {write}) {
        write(`![${args[0].node.value}](${args[1].node.value})`);
    },
};

const inlineWrap = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    strike: ['~~', '~~'],
    code: ['`', '`'],
};
