import { resolvePath } from "../../utils/utils.js";

export const navigateUp = (currentDirectory) => {
  try {
    const resolvedPath = resolvePath(currentDirectory, '../');
    return resolvedPath;
  } catch (error) {
    throw new Error('Operation failed')
  }

}
