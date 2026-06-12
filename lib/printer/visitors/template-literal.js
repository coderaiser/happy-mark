import {dedent} from '#dedent';

export const TemplateLiteral = {
    print(path, {write}) {
        for (const quasi of path.node.quasis) {
            write(dedent(quasi.value.cooked));
        }
    },
};
