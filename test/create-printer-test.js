import {createTest as createPutoutTest} from '@putout/test';
import {parseMarkdown, printMarkdown} from '#happy-mark';

const noop = () => {};

const lint = (source) => ({
    code: printMarkdown(parseMarkdown(source)),
    places: [],
});

export const createTest = (url, options) => {
    return createPutoutTest(url, {
        extension: 'md',
        lint,
        plugins: [
            ['markdown', {
                report: noop,
                replace: noop,
            }],
        ],
        ...options,
    });
};
