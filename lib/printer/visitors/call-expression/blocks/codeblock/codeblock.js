import {types} from '@putout/babel';
import {dedent} from '#dedent';

const {isTemplateLiteral} = types;

export const codeblock = (path, {write}) => {
    const [lang, code] = path.get('arguments');
    
    const value = parseValue(code);
    
    write(
        '```' +
        lang.node.value +
        '\n' +
        value +
        '\n```',
    );
};

function parseValue(codePath) {
    if (isTemplateLiteral(codePath)) {
        const {quasis} = codePath.node;
        const [first] = quasis;
        
        return dedent(first.value.cooked);
    }
    
    return codePath.node.value;
}
