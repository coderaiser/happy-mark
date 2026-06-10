export const img = (path, {write}) => {
    const args = path.get('arguments');
    const alt = args[0].node.value;
    const url = args.length >= 2 ? args[1].node.value : '';
    const title = args.length >= 3 ? args[2].node.value : '';
    
    if (title) {
        write(`![${alt}](${url} "${title}")`);
        return;
    }
    
    write(`![${alt}](${url})`);
};
