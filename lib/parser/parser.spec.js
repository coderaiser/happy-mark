import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-mark: parser: heading', (t) => {
    t.transform('heading');
    t.end();
});

test('happy-mark: parser: heading-h2', (t) => {
    t.transform('heading-h2');
    t.end();
});

test('happy-mark: parser: paragraph', (t) => {
    t.transform('paragraph');
    t.end();
});

test('happy-mark: parser: emphasis', (t) => {
    t.transform('emphasis');
    t.end();
});

test('happy-mark: parser: delete', (t) => {
    t.transform('delete');
    t.end();
});

test('happy-mark: parser: inline-code', (t) => {
    t.transform('inline-code');
    t.end();
});

test('happy-mark: parser: link', (t) => {
    t.transform('link');
    t.end();
});

test('happy-mark: parser: image', (t) => {
    t.transform('image');
    t.end();
});

test('happy-mark: parser: hr', (t) => {
    t.transform('hr');
    t.end();
});

test('happy-mark: parser: ul', (t) => {
    t.transform('ul');
    t.end();
});

test('happy-mark: parser: ol', (t) => {
    t.transform('ol');
    t.end();
});

test('happy-mark: parser: link-title', (t) => {
    t.transform('link-title');
    t.end();
});

test('happy-mark: parser: image-title', (t) => {
    t.transform('image-title');
    t.end();
});

test('happy-mark: parser: image-no-alt', (t) => {
    t.transform('image-no-alt');
    t.end();
});

test('happy-mark: parser: table', (t) => {
    t.transform('table');
    t.end();
});

test('happy-mark: parser: link-reference', (t) => {
    t.transform('link-reference');
    t.end();
});

test('happy-mark: parser: badges', (t) => {
    t.transform('badges');
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

test('happy-mark: parser: footnote', (t) => {
    t.transform('footnote');
    t.end();
});
