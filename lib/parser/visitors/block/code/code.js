import {types} from '@putout/babel';

const {
    stringLiteral,
    identifier,
    callExpression,
    templateLiteral,
    templateElement,
} = types;

export const code = (node) => {
    const {value} = node;
    const lang = node.lang || '';
    
    const codeblock = identifier('codeblock');
    const valueArg = value.includes('\n') ? templateLiteral([
        templateElement({
            raw: escapeRaw(value),
            cooked: value,
        }),
    ], []) : stringLiteral(value);
    
    function escapeRaw(value) {
        return value
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replaceAll('${', '\\${');
    }
    
    return callExpression(codeblock, [
        stringLiteral(lang),
        valueArg,
    ]);
};
