import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: blockquote', (t) => {
    t.transform('blockquote');
    t.end();
});

test('happy-mark: parser: blockquote-multi', (t) => {
    t.transform('blockquote-multi');
    t.end();
});

