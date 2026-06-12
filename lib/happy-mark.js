import {print} from '@putout/printer';
import {parseMarkdown} from '#parser';

export {printMarkdown} from '#printer';

export {
    parseMarkdown,
};

export const convertMarkdownToJs = (markdown) => {
    return print(parseMarkdown(markdown));
};
