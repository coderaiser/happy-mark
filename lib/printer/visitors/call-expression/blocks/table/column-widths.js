// Helper to compute rendered width of table cell content from AST
export const getCellContentWidth = (cellPath) => {
    const args = cellPath.node.arguments;
    let total = 0;
    
    for (const arg of args)
        total += getNodeWidth(arg);
    
    return total;
};

const getNodeWidth = (node) => {
    const {type} = node;
    
    if (type === 'StringLiteral')
        return node.value.length;
    
    if (type === 'CallExpression') {
        const {name} = node.callee;
        
        switch(name) {
        case 'code':
            return 2 + getNodeWidth(node.arguments[0]);
        
        case 'bold':
            return 4 + getNodeWidth(node.arguments[0]);
        
        case 'italic':
            return 2 + getNodeWidth(node.arguments[0]);
        
        case 'strike':
            return 4 + getNodeWidth(node.arguments[0]);
        
        case 'image':
            return getImageWidth(node);
        
        default:
            return 0;
        }
    }
    
    return 0;
};

const getImageWidth = (node) => {
    const args = node.arguments;
    const n = args.length;
    const last = args[n - 1];
    const secondLast = n >= 2 && args[n - 2];
    
    let urlIdx = n - 1;
    let titleIdx = -1;
    
    if (last.type === 'StringLiteral' && secondLast && secondLast.type === 'StringLiteral' && n >= 3) {
        urlIdx = n - 2;
        titleIdx = n - 1;
    }
    
    const altText = args[0]?.value?.length || 0;
    const urlWidth = args[urlIdx]?.value?.length || 0;
    
    if (titleIdx >= 0) {
        const titleWidth = args[titleIdx]?.value?.length || 0;
        return 4 + altText + 1 + urlWidth + 3 + titleWidth + 1;
    }
    
    return 4 + altText + 1 + urlWidth + 1;
};
