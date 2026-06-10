import {createTest} from '#test/parser';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: ul', (t) => {
    t.transform('ul');
    t.end();
});

test('happy-mark: parser: ul-task-checked', (t) => {
    t.transform('ul-task-checked');
    t.end();
});

test('happy-mark: parser: ul-task-unchecked', (t) => {
    t.transform('ul-task-unchecked');
    t.end();
});

test('happy-mark: parser: br', (t) => {
    t.transform('br');
    t.end();
});
