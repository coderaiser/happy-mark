import {types} from '@putout/babel';
import {isPrev, isNext} from '@putout/printer/is';
import {dedent} from '#dedent';

const {isTemplateLiteral} = types;

export const blockquote = (path, {maybe, write, traverse}) => {
    const args = path.get('arguments');
    const n = args.length - 1;
    
    maybe.write.newline(isPrev(path));
    
    for (const [i, arg] of args.entries()) {
        write('> ');
        
        const {callee} = arg.node;
        const isParagraph = callee && callee.name === 'paragraph';
        
        if (isParagraph) {
            const pargs = arg.get('arguments');
            
            for (const [j, parg] of pargs.entries()) {
                if (isOnlyNewline(parg))
                    continue;
                
                traverse(parg);
                
                if (isOnlyNewline(pargs[j + 1])) {
                    write.newline();
                    write('> ');
                }
            }
        } else {
            traverse(arg);
        }
        
        maybe.write.newline(i < n);
        
        if (i < n) {
            write('>');
            write.newline();
        }
    }
    
    maybe.write.newline(isNext(path));
};

function isOnlyNewline(path) {
    if (!path || !isTemplateLiteral(path))
        return false;
    
    const [quasi] = path.node.quasis;
    const cooked = dedent(quasi.value.cooked);
    
    return cooked === '\n';
}
