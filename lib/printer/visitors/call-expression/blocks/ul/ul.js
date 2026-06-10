export const ul = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    for (const item of args) {
        write('- ');
        traverse(item);
        write('\n');
    }
};
