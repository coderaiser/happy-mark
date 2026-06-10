import {extend} from 'supertape';
import {readFixtures} from './fixture.js';
import {printMarkdownExtension} from './print-markdown-extension.js';

export const createTest = (dir) => {
    const fixture = readFixtures(dir);
    const test = extend({
        print: printMarkdownExtension,
    });
    
    return {
        fixture,
        test,
    };
};
