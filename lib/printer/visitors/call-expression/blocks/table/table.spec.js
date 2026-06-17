import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: table', (t) => {
    t.transform('table');
    t.end();
});

test('happy-mark: printer: table-alignment', (t) => {
    t.transform('table-alignment');
    t.end();
});

test('happy-mark: printer: table-indent', (t) => {
    t.transform('table-indent');
    t.end();
});
