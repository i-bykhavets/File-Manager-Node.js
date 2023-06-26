import { isAbsolute, join } from 'node:path';

import { fileManagerOperations } from '../constants/availableCommands.js';

export const getUsername = () => {
  const startArguments = process.argv.slice(2);
  const providedUsername = startArguments.find((argument) => argument.startsWith('--username'));

  if (providedUsername) {
    const username = providedUsername.split('=')[1];
    return username || 'Undefined user';
  } else {
    return 'Secret user';
  }
}

export const isValidInput = (userInput) => {
  const [command, ...args] = userInput.split(' ');

  if (fileManagerOperations.some((operation) => command === operation.name && args.length === operation.argsAmount)) {
    return true;
  }
  return false;
}

export const resolvePath = (currentDirectory, path) => {
  let resolvedPath = path;
  if (!isAbsolute(path)) {
    resolvedPath = join(currentDirectory, path);
  }
  // TODO: check root dir
  return resolvedPath;
}
