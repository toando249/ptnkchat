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
  const info1 = await fb.getUserData(id1);
  const info2 = await fb.getUserData(id2);
  const payload = {
    id1: id1,
    info1: info1,
    id2: id2,
    info2: info2,
  };
  try {
    const res = await phin({
      url: `https://script.google.com/macros/s/AKfycbyzD9L-I6wtTXgUqZvoInU-jlERNOt4f2vgIF1ncclMXIo9Z4Q/exec`,
      method: 'POST',
      parse: 'json',
      data: payload,
    });
   };
