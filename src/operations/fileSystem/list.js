import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

export const list = async (currentDirectory) => {
  try {
    const files = await readdir(currentDirectory);
    const tabularFiles = [];
    const tabularDirectories = [];

    for (const file of files) {
      const isDirectory = await stat(join(currentDirectory, file))
        .then((fileStat) => fileStat.isDirectory()).catch(() => true);
      isDirectory
        ? tabularDirectories.push({name: file, type: isDirectory ? 'directory' : 'file'})
        : tabularFiles.push({name: file, type: isDirectory ? 'directory' : 'file'});
    }
    console.table([
      ...tabularDirectories.sort((a, b) => a.name.localeCompare(b.name)),
      ...tabularFiles.sort((a, b) => a.name.localeCompare(b.name)),
    ])

  } catch (error) {
    // throw new Error('Operation failed');
    throw error;
  }
}
