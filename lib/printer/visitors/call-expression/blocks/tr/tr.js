import {types} from '@putout/babel';

const {
    isCallExpression,
    isStringLiteral,
} = types;

export const tr = (path, {write, traverse, store}) => {
    const [first] = path.get('arguments');
    const cells = first.get('elements');
    const columnWidths = store();
    
    write('|');
    
    for (const [i, cell] of cells.entries()) {
        write(' ');
        traverse(cell);
        
        if (columnWidths) {
            const contentWidth = getContentWidth(cell);
            const padding = columnWidths[i] - contentWidth;
            
            if (padding > 0)
                write(' '.repeat(padding));
        }
        
        write(' |');
    }
    
    write('\n');
};

function getContentWidth(cellPath) {
    const args = cellPath.node.arguments;
    let total = 0;
    
    for (const arg of args)
        total += nodeWidth(arg);
    
    return total;
}

function nodeWidth(node) {
    if (isStringLiteral(node))
        return node.value.length;
    
    if (isCallExpression(node)) {
        const {name} = node.callee;
        const [first] = node.arguments;
        
        switch(name) {
        case 'code':
            return 2 + nodeWidth(first);
        
        case 'bold':
            return 4 + nodeWidth(first);
        
        case 'italic':
            return 2 + nodeWidth(first);
        
        case 'strike':
            return 4 + nodeWidth(first);
        }
    }
    
    return 0;
}
