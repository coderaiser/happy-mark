import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('happy-mark: printer: blocks: ul', (t) => {
    t.print(fixture.ul);
    t.end();
});
