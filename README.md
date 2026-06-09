# Makar [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[NPMURL]: https://npmjs.org/package/makar "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/makar.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/makar/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/makar/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"

> Де макар телят пасе...
>
> Far away...

<img width="2560" height="1811" alt="image" src="https://github.com/user-attachments/assets/189eece7-8552-49e7-a5a3-3b29004e2aa6" />

Markdown to JS AST parser.

## Install

```
npm i makar --save
```

## How to use?

```js
import {printMarkdown, parseMarkdown} from 'makar';

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
    h1('hello');
    p('Hello world');
    codeblock('js', 'const a = 3;');

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
