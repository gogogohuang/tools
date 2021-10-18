import inquirer from 'inquirer';
import testWeb from './src/test-web';

inquirer
  .prompt([
    {
      type: 'list',
      name: 'command',
      message: 'select the command you want to execute',
      choices: ['run-test', new inquirer.Separator()],
    },
  ])
  .then(({ command }) => {
    switch (command) {
      case 'run-test':
        testWeb();
        break;

      default:
        break;
    }
  })
  .catch(error => {
    console.log(error);
    return 1;
  });
