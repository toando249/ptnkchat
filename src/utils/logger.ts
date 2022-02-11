/**
 * Logging module
 * @packageDocumentation
 */

import config from '../config';
import fb from './facebook';
import phin from 'phin';

/**
 * Log error
 * @param source - Source
 * @param message - Message
 * @param err - Error details. Will be converted to a JSON string
 * @param sendToDev - Should notify developer
 */
const logError = (source: string, message: string, err: unknown = null, sendToDev = false): void => {
  console.error(`[ERROR - ${source}] ${message}. Details: ${JSON.stringify(err)}`, err);

  // truncate message if too long
  message = `[ERROR - ${source}] ${message}`;
  if (message.length > config.MAX_MESSAGE_LENGTH) {
    message = message.substr(0, config.MAX_MESSAGE_LENGTH) + '...';
  }

  // send message to dev
  if (sendToDev) {
    fb.sendTextMessage('', config.DEV_ID, message, false);
  }
};

/**
 * Log pair of users to Google Forms
 * @param id1 - ID of first user
 * @param id2 - ID of second user
 */
const logPair = async (id1: string, id2: string): Promise<void> => {
  if (!config.HAS_POST_LOG) {
    return;
  }

  const info1 = await fb.getUserData(id1);
  const info2 = await fb.getUserData(id2);

  try {
    await phin({
      url: `https://script.googleusercontent.com/macros/echo?user_content_key=MkiO9o13gmRNA7FVYCPZea5fH7C8b22t8KQnM1G8LSU6m5c_J4jsMAojBeaFdQ1evPaL5NUPJT0BcQWZo_0RwPUzrYgSqxdBm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKctyZhchWt7CAU3MTAL8jufIGbWIx336j52oWbgY_88WpSmoTlGYxyX7zb3ctJeCQLGTNTj7YKL34Wft5nFJnaaxop5Hjy3e1VvDeNWEXrJ&lib=MlocdZqIsRUTxSiVCiR7KY35g-2G6-JsI`,
      method: 'POST',
      form: {
        [id1]: id1,
        [id2]: id2,
        [info1]: info1,
        [info2]: info2,
      },
    });
  } catch (err) {
    logError('logger::logPair', 'Failed to send log to Google Forms', err, true);
  }
};

export default {
  logError,
  logPair,
};
