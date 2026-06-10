import {print} from '@putout/printer';
import {parseMarkdown} from './parser/index.js';

export {printMarkdown} from './printer/index.js';

export {
    parseMarkdown,
};

export const convertMarkdownToJs = (markdown) => {
    return print(parseMarkdown(markdown));
};
