import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: p', (t) => {
    t.noTransform('p');
    t.end();
});

test.only('happy-mark: printer: p-newline', (t) => {
    t.noTransform('p-newline');
    t.end();
});

