import {createTest} from '#parser/test';
const {test} = createTest(import.meta.url);

test('happy-mark: parser: codeblock-lang', (t) => {
    t.transform('codeblock-lang');
    t.end();
});

test('happy-mark: parser: codeblock-no-lang', (t) => {
    t.transform('codeblock-no-lang');
    t.end();
});

