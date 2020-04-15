const chalk = require('chalk');
const relatively = 'views/';
const path = require('path');
const fs = require('fs');
const root = '../../src';

module.exports = function (name, url) {
  console.log(chalk.yellow("-------------开始生成组件-------------"));

  if (!name) {
    console.log(chalk.red("请输入组件名称"));
    return;
  }

  if (!url) {
    console.log(chalk.red("请输入组件所在视图目录"));
    return;
  }

  // 找到view的文件路径
  const viewPath = path.resolve(__dirname, root, relatively, url);
  // 检查视图目录是否存在
  if (!fs.existsSync(viewPath)) {
    console.log(chalk.red("待生成的组件所在视图目录【" + url + "】不存在"));
    return;
  }

  // 生成文件
  writeTemplate(viewPath, 'index.vue', process, 'UI.Component.' + name + '.vue');

  function process(tem) {
    return tem.replace(/\{\{name\}\}/g, name);
  }

  console.log(chalk.yellow("-------------组件生成完成-------------"));
}

function writeTemplate(modulePath, tname, process, fileName = '') {
  try {
    tem = fs.readFileSync(path.resolve(__dirname, `${tname}.template`));
    fs.writeFileSync(path.resolve(modulePath, fileName ? fileName : tname), process(tem.toString()));
    console.log(chalk.blue(`${fileName ? fileName : tname}-----ok`));
  } catch (error) {
    console.log(chalk.red(`文件[${tname}]生成失败：`, error));
  }
}