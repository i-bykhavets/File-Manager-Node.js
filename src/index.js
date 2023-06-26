import { homedir } from 'node:os';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

import { getUsername, isValidInput } from "./utils/utils.js";
import { executeOperation } from "./invoker/executeOperation.js";

const main = async () => {
  const username = getUsername();
  let currentDirectory = homedir();

  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${currentDirectory}`);

  const rl = createInterface({input, output});

  rl.on('line', async (userInput) => {
    if (isValidInput(userInput)) {
      if (userInput === '.exit') {
        rl.close();
        return;
      } else {
        await executeOperation(currentDirectory, userInput)
          .then((result) => {
            currentDirectory = result.currentDirectory;
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } else {
      console.log('Invalid input');
    }

    console.log(`\nYou are currently in ${currentDirectory}`);
  })

  rl.on('close', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`)
  })
}

main();
