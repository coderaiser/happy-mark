import {types} from '@putout/babel';

const {isCallExpression} = types;

export const ul = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const depth = getListDepth(path);
    const indent = '    '.repeat(depth);
    
    for (const item of args) {
        write(`${indent}- `);
        traverse(item);
        write('\n');
    }
};

export const ol = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const depth = getListDepth(path);
    const indent = '    '.repeat(depth);
    let n = 1;
    
    for (const item of args) {
        write(`${indent}${n++}. `);
        traverse(item);
        write('\n');
    }
};

function getListDepth(path) {
    let depth = 0;
    let current = path.parentPath;
    
    while (current) {
        if (isCallExpression(current) && current.node.callee) {
            const {name} = current.node.callee;
            
            if (name === 'ul' || name === 'ol')
                ++depth;
        }
        
        current = current.parentPath;
    }
    
    return depth;
}
