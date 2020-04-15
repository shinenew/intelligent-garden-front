const chalk = require('chalk');
const relatively = 'views/';
const path = require('path');
const fs = require('fs');
const root = '../../src';

module.exports = function (name, url = '') {
  console.log(chalk.yellow("-------------开始生成视图-------------"));

  if (!name) {
    console.log(chalk.red("请输入视图名称"));
    return;
  }

  // 找到view的文件路径
  const pPath = path.resolve(__dirname, root, relatively, url);
  // 检查视图父目录是否存在
  if (!fs.existsSync(pPath)) {
    console.log(chalk.red("待生成的视图父目录【" + url + "】不存在"));
    return;
  }

  const viewPath = path.resolve(pPath, name);

  // 检查视图目录是否存在
  if (fs.existsSync(viewPath)) {
    console.log(chalk.red("待生成的视图【" + name + "】" + (url ? ("在【/" + url + "】下") : "") + "已存在"));
    return;
  }

  // 创建目录
  try {
    fs.mkdirSync(viewPath);
    console.log(chalk.blue("视图目录创建成功"));
  } catch (error) {
    console.log(chalk.red("视图目录创建失败，" + error));
  }

  // 生成文件
  writeTemplate(viewPath, 'Index.vue', process);

  function process(tem) {
    return tem.replace(/\{\{name\}\}/g, name);
  }

  console.log(chalk.yellow("-------------视图生成完成-------------"));
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