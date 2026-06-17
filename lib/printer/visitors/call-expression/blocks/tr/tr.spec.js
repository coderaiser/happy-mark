import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: tr', (t) => {
    t.transform('tr');
    t.end();
});
