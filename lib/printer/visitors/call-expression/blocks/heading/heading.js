import {isPrev, isNext} from '@putout/printer/is';
import {isHeading, isParagraph} from '#printer/is';

export function heading(path, {write, traverse}) {
    const prev = path.getPrevSibling();
    const [count, ...restArgs] = path.get('arguments');
    
    if (isPrev(path) && !isHeading(prev) && !isParagraph(prev))
        write.newline();
    
    write('#'.repeat(count.node.value) + ' ');
    
    for (const arg of restArgs)
        traverse(arg);
    
    if (isNext(path))
        write('\n');
}
