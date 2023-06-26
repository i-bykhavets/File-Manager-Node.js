import * as os from 'node:os';

import { availableOSArguments } from "../../constants/availableOSArguments.js";

export const getOSInfo = async (infoType) => {
  if (!infoType.startsWith('--') || !availableOSArguments.includes(infoType.slice(2)))
    throw new Error('Invalid input');

  try {
    let requiredInfo = null;

    switch (infoType.slice(2)) {
      case 'EOL':
        requiredInfo = os.EOL;
        break;

      case 'cpus':
        requiredInfo = os.cpus();
        break;

      case 'homedir':
        requiredInfo = os.homedir();
        break;

      case 'username':
        requiredInfo = os.userInfo().username;
        break;

      case 'architecture':
        requiredInfo = os.arch();
        break;

      default:
        requiredInfo = 'Not Found';
    }

    console.log(requiredInfo);
  } catch (error) {
    throw new Error('Operation failed');
  }
}
