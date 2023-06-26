import { stat } from 'node:fs/promises';

import { resolvePath } from "../../utils/utils.js";

export const navigate = async (currentDirectory, pathToDirectory) => {
  try {
    const resolvedPath = resolvePath(currentDirectory, pathToDirectory);
    const fileStat = await stat(resolvedPath);

    if (fileStat.isDirectory()) {
      return resolvedPath;
    } else {
      throw new Error('Operation failed');
    }
  } catch (error) {
    throw new Error('Operation failed');
  }
}
