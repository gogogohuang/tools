import puppeteer from 'puppeteer';
import ora from 'ora';
import inquirer from 'inquirer';

const testWeb = () => {
  inquirer
    .prompt({
      name: 'url',
      message: 'Plz type url',
      type: 'input',
      validate: input => {
        const match = input.match(/^https/);

        if (!match) {
          return `url should be https, ${input}`;
        }
        return true;
      },
    })
    .then(({ url }) => {
      const spinner = ora('run testing: ').start();

      (async () => {
        try {
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.goto(url);

          spinner.succeed('finish');
          await browser.close();
        } catch (e) {
          spinner.fail('error');
          console.log('error:', e);
        }
      })();
    })
    .catch(error => {
      console.log(error);
      return 1;
    });
};

export default testWeb;
