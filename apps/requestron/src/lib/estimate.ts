require('dotenv').config()
import {request} from 'http';
/**
 * Comment for this function
 */
export const setEstimate = (): boolean => {
  const req = request(
    {
      host: 'https://api.zenhub.io',
      headers: {
        'Content-Type': 'application/json',
        'X-Authentication-Token': process.env.ZENHUB_TOKEN
      },
      path: '/p1/repositories/221524450/issues/4',
      method: 'GET',
    },
    response => {
      console.log(response); // 200
    }
  );
  req.end();
  return true;
};

