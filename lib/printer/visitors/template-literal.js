export const TemplateLiteral = {
    print(path, {write}) {
        for (const quasi of path.node.quasis) {
            write(quasi.value.cooked ?? quasi.value.raw);
        }
    },
};
