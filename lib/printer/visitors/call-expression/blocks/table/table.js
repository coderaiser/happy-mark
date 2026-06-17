import {types} from '@putout/babel';

const {isStringLiteral} = types;

export const table = (path, {write, traverse}) => {
    const args = path.get('arguments');
    const alignments = [];
    let rowStart = 0;
    const [first] = args;
    
    if (first && isStringLiteral(first)) {
        const alignStr = args[0].node.value;
        
        if (alignStr)
            for (const a of alignStr.split(','))
                alignments.push(a || null);
        
        rowStart = 1;
    }
    
    const rowsArg = args[rowStart];
    const rows = rowsArg.get('elements');
    
    for (let i = 0; i < rows.length; i++) {
        traverse(rows[i]);
        
        if (!i && alignments.length > 0) {
            write('|');
            
            for (const a of alignments) {
                switch(a) {
                case 'left':
                    write(' :--- |');
                    break;
                
                case 'center':
                    write(' :---: |');
                    break;
                
                case 'right':
                    write(' ---: |');
                    break;
                
                default:
                    write(' --- |');
                    break;
                }
            }
            
            write('\n');
        }
    }
};
