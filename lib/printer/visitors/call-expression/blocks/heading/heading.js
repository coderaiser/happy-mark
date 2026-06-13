import {isPrev, isNext} from '@putout/printer/is';

const isHeading = (path) => {
    const {name} = path.node.callee;
    return /h\d/.test(name);
};

const isParagraph = (path) => {
    const {name} = path.node.callee;
    return name === 'p';
};

export function heading(path, {write, traverse}) {
    const {name} = path.node.callee;
    const args = path.get('arguments');
    const prev = path.getPrevSibling();
    
    if (isPrev(path) && !isHeading(prev) && !isParagraph(prev))
        write.newline();
    
    write('#'.repeat(Number(name[1])) + ' ');
    
    for (const arg of args)
        traverse(arg);
    
    if (isNext(path))
        write('\n');
}
