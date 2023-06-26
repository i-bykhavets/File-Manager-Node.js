import { rename as fsRename } from 'node:fs/promises';
import {resolvePath} from "../../utils/utils.js";

export const rename = async (currentDirectory, pathToFile, newFileName) => {
  try {
    const resolvedPathToOldFile = resolvePath(currentDirectory, pathToFile);
    const resolvedPathToNewFile = resolvePath(resolvedPathToOldFile, `../${newFileName}`);

    await fsRename(resolvedPathToOldFile, resolvedPathToNewFile);
  } catch (error) {
    throw new Error('Operation failed');
  }
}
