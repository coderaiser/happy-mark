import {isPrev, isNext} from '@putout/printer/is';
export const blockquote = (path, {maybe, write, traverse}) => {
    const args = path.get('arguments');
    const n = args.length - 1;
    
    maybe.write.newline(isPrev(path));
    
    for (const [i, arg] of args.entries()) {
        write('> ');
        traverse(arg);
        maybe.write.newline(i < n);
        
        if (i < n) {
            write('>');
            write.newline();
        }
    }
    
    maybe.write.newline(isNext(path));
};
