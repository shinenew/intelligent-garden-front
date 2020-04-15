const chalk = require('chalk');
const relatively = 'api/';
const path = require('path');
const fs = require('fs');
const root = '../../src';

module.exports = function (name, aname) {
  console.log(chalk.yellow("-------------开始生成function-------------"));

  if (!name) {
    console.log(chalk.red("请输入function名称"));
    return;
  }

  if (!aname) {
    console.log(chalk.red("请输入api名称"));
    return;
  }

  // 找到api的文件路径
  const apiPath = path.resolve(__dirname, root, relatively, aname);
  // console.log(apiPath);

  // 检查api目录是否存在
  if (!fs.existsSync(apiPath)) {
    console.log(chalk.red("待生成的function所在api【" + aname + "】不存在"));
    return;
  }

  // 检查function目录
  const fPath = path.resolve(apiPath, name);
  if (fs.existsSync(fPath)) {
    console.log(chalk.red("待生成的function【" + name + "】已存在"));
    return;
  }

  // 创建目录
  try {
    fs.mkdirSync(fPath);
    console.log(chalk.blue("function目录创建成功"));
  } catch (error) {
    console.log(chalk.red("function目录创建失败，" + error));
  }

  // 生成文件
  writeTemplate(fPath, 'index.ts', process);
  writeTemplate(fPath, 'IOptions.ts', process);
  writeTemplate(fPath, 'IData.ts', process);

  function process(tem) {
    return tem.replace(/\{\{name\}\}/g, name);
  }

  console.log(chalk.yellow("-------------function生成完成-------------"));
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