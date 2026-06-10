import {blocks} from './blocks/index.js';

export const CallExpression = {
    print(path, printer) {
        const {name} = path.node.callee;
        
        if (!blocks[name])
            throw Error(`${name} not supported yet`);
        
        blocks[name](path, printer);
    },
};

