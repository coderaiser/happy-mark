export const tr = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const [first] = args;
    const cells = first.get('elements');
    
    write('|');
    
    for (const cell of cells) {
        write(' ');
        traverse(cell);
        write(' |');
    }
    
    write('\n');
};
