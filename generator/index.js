const chalk = require('chalk');

// 如果命令参数缺失，则显示帮助信息
if (process.argv == null || process.argv.length < 4) {
  console.log(chalk.blue('------------自动生成代码使用说明------------'));
  console.log(chalk.blue('  1、生成api'));
  console.log(chalk.blue('  命令：npm run cre a [aname]'));
  console.log(chalk.blue('  参数：[aname]为接口名称'));
  console.log(chalk.blue('  说明：执行命令后，会自动在/src/api目录下按[aname]生成目录，同时在[aname]目录下新建index.ts，在index.ts中将结构搭建好'));
  console.log(chalk.blue(''));
  console.log(chalk.blue('  2、生成api中的方法'));
  console.log(chalk.blue('  命令：npm run cre f [fname] [aname]'));
  console.log(chalk.blue('  参数：[fname]为方法名称，[aname]为接口名称'));
  console.log(chalk.blue('  说明：执行命令后，会自动在/src/api/[aname]目录下，新建[fname]目录，同时在[fname]目录下，新建IData.ts，index.jts，IOptions.ts3个文件，同时在3个文件中创建好代码结构'));
  console.log(chalk.blue(''));
  console.log(chalk.blue('  3、生成视图'));
  console.log(chalk.blue('  命令：npm run cre v [vname] [url]'));
  console.log(chalk.blue('  参数：[vname]为视图名称，[url]为父视图文件路径，可为空，默认为/views/目录'));
  console.log(chalk.blue('  说明：执行命令后，会自动在/src/views/[vurl]目录下，新建[vname]目录，同时在[vname]目录下，新建Index.vue，同时在文件中创建好视图的代码结构'));
  console.log(chalk.blue(''));
  console.log(chalk.blue('  4、生成组件'));
  console.log(chalk.blue('  命令：npm run cre c [cname] [vurl]'));
  console.log(chalk.blue('  参数：[cname]为视图名称，[vurl]为视图文件路径'));
  console.log(chalk.blue('  说明：执行命令后，会自动在/src/views/[vurl]目录下，生成以UI.Component.[cname].vue命名的组件文件，同时在文件内部，生成组件的结构'));
  return;
}

// 根据模块决定代码生成方法
switch (process.argv[2].toLowerCase()) {
  case 'a':
    require('./api')(process.argv[3]);
    break;
  case 'f':
    require('./function')(process.argv[3], process.argv[4]);
    break;
  case 'v':
    if (process.argv[4]) {
      require('./view')(process.argv[3], process.argv[4]);
    } else {
      require('./view')(process.argv[3]);
    }
    
    break;
  case 'c':
    require('./component')(process.argv[3], process.argv[4]);
    break;
  default:
    console.log(chalk.red('暂不支持该模块类型：' + process.argv[2]));
    break;
}