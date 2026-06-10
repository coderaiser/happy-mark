import {createTest} from '#test/printer';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: blocks: ul-task-unchecked', (t) => {
    t.transform('ul-task-unchecked');
    t.end();
});
