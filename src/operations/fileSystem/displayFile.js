import { createReadStream } from 'node:fs';
import { Buffer } from 'node:buffer';

import { resolvePath } from "../../utils/utils.js";

export const displayFile = async (currentDirectory, pathToFile) => {
  try {
    const resolvedPathToFile = resolvePath(currentDirectory, pathToFile);
    const readableStream = createReadStream(resolvedPathToFile);

    readableStream.on('data', (chunk) => {
      process.stdout.write(chunk.toString());
    })

    // const fileChunks = [];
    // return new Promise((resolve, reject) => {
    //   readableStream.on('data', (chunk) => fileChunks.push(Buffer.from(chunk)));
    //   readableStream.on('error', (err) => reject(err));
    //   readableStream.on('end', () => resolve(Buffer.concat(fileChunks).toString('utf8')));
    // })
  } catch (error) {
    throw new Error('Operation failed');
  }
}
