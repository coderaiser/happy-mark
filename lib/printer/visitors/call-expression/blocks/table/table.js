import {types} from '@putout/babel';
import {getCellContentWidth} from './column-widths.js';

const {isStringLiteral} = types;

export const table = (path, {write, traverse, store}) => {
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
    
    // Compute max column widths from all rows
    const columnWidths = computeMaxColumnWidths(rows);
    
    // Store column widths so tr can use them
    store(columnWidths);
    
    for (let i = 0; i < rows.length; i++) {
        traverse(rows[i]);
        
        // After first row, print separator if alignments present
        if (!i && alignments.length > 0)
            writeSeparator(alignments, columnWidths, write);
    }
};

function writeSeparator(alignments, columnWidths, write) {
    write('|');
    
    for (const [j, a] of alignments.entries()) {
        const contentWidth = columnWidths[j];
        const colWidth = Math.max(contentWidth + 2, 3);
        
        switch(a) {
        case 'left':
            write(':');
            write('-'.repeat(colWidth));
            break;
        
        case 'center':
            write(':');
            write('-'.repeat(colWidth - 1));
            write(':');
            break;
        
        case 'right':
            write('-'.repeat(colWidth));
            write(':');
            break;
        
        default:
            write('-'.repeat(colWidth));
            break;
        }
        
        write('|');
    }
    
    write('\n');
}

function computeMaxColumnWidths(rows) {
    const widths = [];
    
    for (const row of rows) {
        const cells = row.get('arguments')[0].get('elements');
        
        for (let j = 0; j < cells.length; j++) {
            const width = getCellContentWidth(cells[j]);
            
            if (!widths[j] || width > widths[j])
                widths[j] = width;
        }
    }
    
    return widths;
}
