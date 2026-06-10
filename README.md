# Happy Mark [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[NPMURL]: https://npmjs.org/package/happy-mark "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/happy-mark.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/happy-mark/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/happy-mark/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"

<img width="2560" height="1811" alt="image" src="https://github.com/user-attachments/assets/189eece7-8552-49e7-a5a3-3b29004e2aa6" />

Markdown to JS AST parser.

## Install

```
npm i happy-mark --save
```

## How to use?

```js
import {printMarkdown, parseMarkdown} from 'happy-mark';
import {montag} from 'montag';
import {print} from 'putout';

const source = montag`
    # hello
    
    Hello world
    
    \`\`\`js
    const a = 3;
    \`\`\`
`;

const ast = parseMarkdown(source);

print(ast);
// returns
`
[
    h1('hello'),
    p('Hello world'),
    codeblock('js', 'const a = 3;'),
];
`;

printMarkdown(ast);
// returns
`
    # hello
    
    Hello world
    
    \`\`\`js
    const a = 3;
    \`\`\`
`;
```

## License

MIT
