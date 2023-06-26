import { rm } from 'node:fs/promises';

import { resolvePath } from "../../utils/utils.js";

export const remove = async (currentDirectory, pathToFile) => {
  try {
    const resolvedPathToFile = resolvePath(currentDirectory, pathToFile);

    await rm(resolvedPathToFile);
  } catch (error) {
    throw new Error('Operation failed');
  }
}
