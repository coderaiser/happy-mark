import {types} from '@putout/babel';

const {
    stringLiteral,
    templateLiteral,
    templateElement,
} = types;

export const createStringLiteral = (value) => {
    if (!value.includes('\n'))
        return stringLiteral(value);
    
    return templateLiteral(
        [templateElement({
            raw: escapeRaw(value),
            cooked: value,
        })],
        [],
    );
};

function escapeRaw(value) {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${');
}
