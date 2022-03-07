const fs = require('fs');
const pug = require('pug');

function compile(module, filename) {
  const contents = fs.readFileSync(filename);
  const templateFun = pug.compileClient(contents, {
    filename: filename
  })

  module.exports = new Function([], `
        ${templateFun};
        
        return template;
    `)();
}

if (require.extensions) {
  require.extensions['.pug'] = compile
}