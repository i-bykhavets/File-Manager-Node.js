import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

import { resolvePath } from "../../utils/utils.js";

export const calculateHash = async (currentDirectory, pathToFile) => {
  try {
    const resolvedPathToFile = resolvePath(currentDirectory, pathToFile);

    const fileContent = await readFile(resolvedPathToFile);
    const hexHash = createHash('sha256').update(fileContent).digest('hex');

    console.log(hexHash);
  } catch (error) {
    throw new Error('Operation failed');
  }
}
