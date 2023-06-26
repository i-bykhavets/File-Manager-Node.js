import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

import { resolvePath } from "../../utils/utils.js";

// In this realisation you should pass exact name of destination file
// pathToFile - /home/../test.txt | pathToDestination - /home/../test.txt.br
export const compress = async (currentDirectory, pathToFile, pathToDestination) => {
  try {
    const resolvedPathToFile = resolvePath(currentDirectory, pathToFile);
    const resolvedPathToDestination = resolvePath(currentDirectory, pathToDestination);

    const readStream = createReadStream(resolvedPathToFile);
    const writeStream = createWriteStream(resolvedPathToDestination);

    const brotliCompress = createBrotliCompress();

    await pipeline(
      readStream,
      brotliCompress,
      writeStream
    );
  } catch (error) {
    throw new Error('Operation failed');
  }
}
