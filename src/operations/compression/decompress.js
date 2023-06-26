import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

import { resolvePath } from "../../utils/utils.js";

// In this realisation you should pass exact name of destination file
// pathToFile - /home/../test.txt.br | pathToDestination - /home/../test.txt
export const decompress = async (currentDirectory, pathToFile, pathToDestination) => {
  try {
    const resolvedPathToFile = resolvePath(currentDirectory, pathToFile);
    const resolvedPathToDestination = resolvePath(currentDirectory, pathToDestination);

    const readStream = createReadStream(resolvedPathToFile);
    const writeStream = createWriteStream(resolvedPathToDestination);

    const brotliDecompress = createBrotliDecompress();

    await pipeline(
      readStream,
      brotliDecompress,
      writeStream
    );
  } catch (error) {
    throw new Error('Operation failed');
  }
}
