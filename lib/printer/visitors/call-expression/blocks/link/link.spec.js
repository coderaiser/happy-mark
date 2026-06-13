import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: link-reference', (t) => {
    t.transform('link-reference');
    t.end();
});

test('happy-mark: printer: link-title', (t) => {
    t.noTransform('link-title');
    t.end();
});

