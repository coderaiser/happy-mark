import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test.only('happy-mark: printer: table', (t) => {
    t.transform('table');
    t.end();
});

test.only('happy-mark: printer: table-alignment', (t) => {
    t.transform('table-alignment');
    t.end();
});
