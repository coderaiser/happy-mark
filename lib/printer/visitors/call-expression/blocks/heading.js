import {isPrev} from '@putout/printer/is';
export function heading(path, {write, traverse}) {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    
    if (isPrev(path))
        write.newline();
    
    write('#'.repeat(Number(name[1])) + ' ');
    
    for (const arg of args)
        traverse(arg);
    
    write('\n');
}

