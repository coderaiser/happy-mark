[
    html('<details><summary>remove <code>unused variables</code></summary>'),
    codeblock('diff', `  function show() {
-     const message = 'hello';
      console.log('hello world');
  }`),
    html('</details>'),
];
