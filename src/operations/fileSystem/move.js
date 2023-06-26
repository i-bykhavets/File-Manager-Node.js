import { createReadStream, createWriteStream } from 'node:fs';
import { rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { basename } from 'node:path';

import {resolvePath} from "../../utils/utils.js";

export const move = async (currentDirectory, pathToFile, pathToNewDirectory) => {
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

    await rm(resolvedPathToFile);
  } catch (error) {
    throw new Error('Operation failed')
  }
}
