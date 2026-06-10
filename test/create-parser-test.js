import {createTest as createPutoutTest} from '@putout/test';
import {convertMarkdownToJs} from '#happy-mark';

const noop = () => {};

const lint = (source) => ({
    code: convertMarkdownToJs(source),
    places: [],
});

export const createTest = (url, options) => {
    return createPutoutTest(url, {
        extension: 'md',
        lint,
        plugins: [['markdown', {
            report: noop,
            replace: noop,
        }]],
        ...options,
    });
};
