export const StringLiteral = {
    print(path, {write}) {
        write(path.node.value);
    },
};
