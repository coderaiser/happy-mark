import {createTypeChecker} from '@putout/printer/type-checker';
import {isNext} from '@putout/printer/is';
import {
    isHeading,
    isParagraph,
    isTable,
} from '#printer/is';

const isNewLineAfter = isNext;

const isNewLineBefore = createTypeChecker([
    ['-: -> !CallExpression'],
    ['-', isHeading],
    ['-', isParagraph],
    ['+: -> !', isTable],
]);

export function heading(path, {write, traverse}) {
    const prev = path.getPrevSibling();
    const [count, ...restArgs] = path.get('arguments');
    
    if (isNewLineBefore(prev))
        write.newline();
    
    write('#'.repeat(count.node.value) + ' ');
    
    for (const arg of restArgs)
        traverse(arg);
    
    if (isNewLineAfter(path))
        write.newline();
}
