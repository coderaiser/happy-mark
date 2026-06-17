import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: table', (t) => {
    t.transform('table');
    t.end();
});
