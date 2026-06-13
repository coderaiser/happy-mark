import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-mark: printer: ul', (t) => {
    t.transform('ul');
    t.end();
});

test('happy-mark: printer: ol', (t) => {
    t.transform('ol');
    t.end();
});

test('happy-mark: printer: task-checked', (t) => {
    t.transform('task-checked');
    t.end();
});

test('happy-mark: printer: blockquote', (t) => {
    t.noTransform('blockquote');
    t.end();
});

test('happy-mark: printer: table', (t) => {
    t.transform('table');
    t.end();
});

test('happy-mark: printer: table-alignment', (t) => {
    t.transform('table-alignment');
    t.end();
});

test('happy-mark: printer: link-reference', (t) => {
    t.transform('link-reference');
    t.end();
});

test('happy-mark: printer: image-reference', (t) => {
    t.transform('image-reference');
    t.end();
});

test('happy-mark: printer: nested-blockquote', (t) => {
    t.transform('nested-blockquote');
    t.end();
});

test('happy-mark: printer: ul-task-unchecked', (t) => {
    t.transform('ul-task-unchecked');
    t.end();
});

test('happy-mark: printer: paragraph', (t) => {
    t.noTransform('paragraph');
    t.end();
});

test('happy-mark: printer: bold', (t) => {
    t.noTransform('bold');
    t.end();
});

test('happy-mark: printer: italic', (t) => {
    t.noTransform('italic');
    t.end();
});

test('happy-mark: printer: strikethrough', (t) => {
    t.noTransform('strikethrough');
    t.end();
});

test('happy-mark: printer: inline-code', (t) => {
    t.noTransform('inline-code');
    t.end();
});

test('happy-mark: printer: hr', (t) => {
    t.noTransform('hr');
    t.end();
});

test('happy-mark: printer: image', (t) => {
    t.noTransform('image');
    t.end();
});

test('happy-mark: printer: image-no-alt', (t) => {
    t.noTransform('image-no-alt');
    t.end();
});

test('happy-mark: printer: image-title', (t) => {
    t.noTransform('image-title');
    t.end();
});

test('happy-mark: printer: hard-break', (t) => {
    t.noTransform('hard-break');
    t.end();
});

test('happy-mark: printer: newline-after-img', (t) => {
    t.noTransform('newline-after-img');
    t.end();
});

test('happy-mark: printer: yaml', (t) => {
    t.noTransform('yaml');
    t.end();
});

test('happy-mark: printer: footnote', (t) => {
    t.transform('footnote');
    t.end();
});
