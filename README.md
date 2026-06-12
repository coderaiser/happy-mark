# Happy Mark [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[NPMURL]: https://npmjs.org/package/happy-mark "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/happy-mark.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/happy-mark/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/happy-mark/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"

<img width="770" height="554" alt="image" src="https://github.com/user-attachments/assets/b1f7a29a-52a1-42b0-893b-51c17f48f192" />

Markdown to JS AST parser.

## Install

```
npm i happy-mark --save
```

## How to use?

```js
import {
    convertMarkdownToJs,
    convertJsToMarkdown,
} from 'happy-mark';

const source = montag`
    # hello
    
    Hello world
    
    \`\`\`js
    const a = 3;
    \`\`\`
`;

const js = convertMarkdownToJs(source);
// returns
`
[
    h1('hello'),
    p('Hello world'),
    codeblock('js', 'const a = 3;'),
];
`;

convertJsToMarkdown(js);
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
