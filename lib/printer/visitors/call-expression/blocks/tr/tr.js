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
    const {type} = node;
    
    if (type === 'StringLiteral')
        return node.value.length;
    
    if (type === 'CallExpression') {
        const {name} = node.callee;
        
        switch(name) {
        case 'code':
            return 2 + nodeWidth(node.arguments[0]);
        
        case 'bold':
            return 4 + nodeWidth(node.arguments[0]);
        
        case 'italic':
            return 2 + nodeWidth(node.arguments[0]);
        
        case 'strike':
            return 4 + nodeWidth(node.arguments[0]);
        
        default:
            return 0;
        }
    }
    
    return 0;
}
