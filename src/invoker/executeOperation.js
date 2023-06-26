import * as operations from '../operations/index.js';

export const executeOperation = async (currentDirectory, userInput) => {
  const [command, ...args] = userInput.split(' ');
  const result = { currentDirectory, data: null };

  try {
    switch (command) {
      case 'up': {
        const newCurrentDirectory = await operations.navigateUp(currentDirectory);
        result.currentDirectory = newCurrentDirectory;
        return result;
      }

      case 'cd': {
        const newCurrentDirectory = await operations.navigate(currentDirectory, ...args);
        result.currentDirectory = newCurrentDirectory;
        return result;
      }

      case 'ls': {
        await operations.list(currentDirectory);
        return result;
      }

      case 'cat': {
        await operations.displayFile(currentDirectory, ...args);
        return result;
      }

      case 'add': {
        await operations.addFile(currentDirectory, ...args);
        return result;
      }

      case 'rn': {
        await operations.rename(currentDirectory, ...args);
        return result;
      }

      case 'cp': {
        await operations.copy(currentDirectory, ...args);
        return result;
      }

      case 'mv': {
        await operations.move(currentDirectory, ...args);
        return result;
      }

      case 'rm': {
        await operations.remove(currentDirectory, ...args);
        return result;
      }

      case 'os': {
        await operations.getOSInfo(...args);
        return result;
      }

      case 'hash': {
        await operations.calculateHash(currentDirectory, ...args);
        return result;
      }

      case 'compress': {
        return 'Up';
      }

      case 'decompress': {
        return 'Up';
      }

      default: {
        return 'Up';
      }
    }
  } catch (error) {
    throw error;
  }
}
