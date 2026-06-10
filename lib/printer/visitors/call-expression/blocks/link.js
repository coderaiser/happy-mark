export const link = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const n = args.length;
    const lastIsString = args.at(-1).node.type === 'StringLiteral';
    const secondLastIsString = n >= 2 && args.at(-2).node.type === 'StringLiteral';
    
    let urlIdx = n - 1;
    let titleIdx = -1;
    
    if (lastIsString && secondLastIsString && n >= 3) {
        urlIdx = n - 2;
        titleIdx = n - 1;
    }
    
    const href = args[urlIdx].node.value;
    const title = titleIdx >= 0 ? args[titleIdx].node.value : '';
    
    write('[');
    
    for (const arg of args.slice(0, urlIdx))
        traverse(arg);
    
    if (title) {
        write(`](${href} "${title}")`);
        return;
    }
    
    write(`](${href})`);
};
