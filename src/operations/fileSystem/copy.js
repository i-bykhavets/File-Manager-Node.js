import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { basename } from 'node:path';

import {resolvePath} from "../../utils/utils.js";

export const copy = async (currentDirectory, pathToFile, pathToNewDirectory) => {
  try {
    const filename = basename(pathToFile);
    const resolvedPathToFile = resolvePath(currentDirectory, pathToFile);
    const resolvedPathToNewDirectory = resolvePath(currentDirectory, pathToNewDirectory);
    const resolvedPathToCopyFile = resolvePath(resolvedPathToNewDirectory, `${filename}`);

    const readableStream = createReadStream(resolvedPathToFile);
    const writableStream = createWriteStream(resolvedPathToCopyFile);

    await pipeline(
      readableStream,
      writableStream,
    )

  } catch (error) {
    throw new Error('Operation failed')
  }
}
