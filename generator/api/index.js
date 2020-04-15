const chalk = require('chalk');
const relatively = 'api/';
const path = require('path');
const fs = require('fs');
const root = '../../src';

module.exports = function (name) {
  console.log(chalk.yellow("-------------开始生成api-------------"));

  if (!name) {
    console.log(chalk.red("请输入api名称"));
    return;
  }

  // 找到api的文件路径
  const apiPath = path.resolve(__dirname, root, relatively, name);
  // console.log(apiPath);

  // 检查目录是否存在
  if (fs.existsSync(apiPath)) {
    console.log(chalk.red("待生成的api【" + name + "】已存在"));
    return;
  }

  // 创建目录
  try {
    fs.mkdirSync(apiPath);
    console.log(chalk.blue("api目录创建成功"));
  } catch (error) {
    console.log(chalk.red("api目录创建失败，" + error));
  }

  // 生成文件
  writeTemplate(apiPath, 'index.ts', process);

  // 生成api中的一个demo方法
  require("../function")("demo", name);

  function process(tem) {
    return tem.replace(/\{\{name\}\}/g, name);
  }

  console.log(chalk.yellow("-------------api生成完成-------------"));
}

function writeTemplate(modulePath, tname, process, fileName = '') {
  try {
    tem = fs.readFileSync(path.resolve(__dirname, `${tname}.template`));
    fs.writeFileSync(path.resolve(modulePath, fileName ? fileName : tname), process(tem.toString()));
    console.log(chalk.blue(`${tname}-----ok`));
  } catch (error) {
    console.log(chalk.red(`文件[${tname}]生成失败：`, error));
  }
}