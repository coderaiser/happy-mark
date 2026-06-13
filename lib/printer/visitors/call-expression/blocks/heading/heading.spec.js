import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: heading-h1', (t) => {
    t.transform('heading-h1');
    t.end();
});

test('happy-mark: printer: heading-h2', (t) => {
    t.transform('heading-h2');
    t.end();
});

test('happy-mark: printer: heading-h3', (t) => {
    t.transform('heading-h3');
    t.end();
});

