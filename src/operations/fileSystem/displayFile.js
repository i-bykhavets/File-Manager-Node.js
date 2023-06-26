import { createReadStream } from 'node:fs';

import { resolvePath } from "../../utils/utils.js";

export const displayFile = async (currentDirectory, pathToFile) => {
  try {
    const resolvedPathToFile = resolvePath(currentDirectory, pathToFile);
    const readableStream = createReadStream(resolvedPathToFile);

    readableStream.on('error', () => {
      throw new Error('Operation failed');
    })

    await readableStream.pipe(process.stdout);
  } catch (error) {
    throw new Error('Operation failed');
  }
}
