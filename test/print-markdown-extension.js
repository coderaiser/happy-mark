import {tryCatch} from 'try-catch';
import {printMarkdown, parseMarkdown} from '#happy-mark';

export const printMarkdownExtension = ({fail, equal}) => (fixture, options) => {
    const [errorParse, ast] = tryCatch(parseMarkdown, fixture, {
        printer: 'putout',
        isTS: true,
    });
    
    if (errorParse)
        return fail(`☝️Looks like provided fixture cannot be parsed: '${fixture}'`);
    
    const [errorPrint, source] = tryCatch(printMarkdown, ast, options);
    
    if (errorPrint)
        return fail(errorPrint);
    
    const expected = `${fixture}\n`;
    
    return equal(source, expected);
};
