import {isPrev} from '@putout/printer/is';

export const html = (path, {write, maybe}) => {
    maybe.write.newline(isPrev(path));
    
    const args = path.get('arguments');
    
    write(args[0].node.value);
    write.newline();
};
