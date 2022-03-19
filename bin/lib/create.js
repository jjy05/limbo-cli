const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Mustache = require('mustache');

const templateConfig = [
  {
    type: 'reactJs',
    path: './react/javascript',
    tpls: [
      {
        type: 'reactJsPackageJson',
        file: 'package.json',
        path: './react/javascript',
      }
    ]
  }
];

module.exports = async function (name, options) {
  const cwd = process.cwd();
  const dir = path.join(cwd, name);
  
  if (fs.existsSync(dir)) {
    let remove = false;
    if (options.force) {
      remove = true;
    } else {
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '目标目录已经存在了宝！',
          choices: [
            {
              name: '继续冲！',
              value: true
            }, {
              name: '跑了',
              value: false
            }
          ]
        }
      ]);
      remove = action;
    }

    if (remove) {
      fs.emptyDirSync(dir);
    } else return;
  } else fs.mkdirSync(dir);

  copyTemplate(dir, 'reactJs', {
    tplOptions: { name }
  });
}

function copyTemplate (dir, type, options = {}) {
  const template = templateConfig.find(t => {
    return t.type === type;
  });
  if (!template) {
    console.log('没有模板了宝子!');
    return;
  }

  // 复制模板项目
  const { tpls = [] } = template;
  const { tplOptions = {} } = options;

  fs.copySync(path.join(__dirname, './../../templates/', template.path), dir);
  tpls.forEach(tpl => {
    generateTpl(dir, tpl, tplOptions);
  })
}

function generateTpl (dir, tpl, options) {
  if (!tpl) return;

  const { path: p = './', file = '' } = tpl;

  // 读取 tpl
  const tplFile = fs.readFileSync(path.join(__dirname, './../../templates/', p, `${file}.tpl`), 'utf8');
  const renderedTpl = Mustache.render(tplFile, options);
  
  renderTpl(path.resolve(path.join(dir, file)), renderedTpl);
}

function renderTpl (filePath, content) {
 fs.writeFileSync(filePath, content, 'utf8');
}