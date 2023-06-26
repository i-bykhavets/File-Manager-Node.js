import { writeFile } from 'node:fs/promises';

import {resolvePath} from "../../utils/utils.js";

export const addFile = async (currentDirectory, newFileName) => {
  try {
    const resolvedPathToNewFile = resolvePath(currentDirectory, newFileName);
    await writeFile(resolvedPathToNewFile, '');
  } catch (error) {
    throw new Error('Operation failed');
  }
}
