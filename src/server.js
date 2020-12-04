import http from 'http';
import https from 'https';
import sirv from 'sirv';
import polka from 'polka';
import * as sapper from '@sapper/server';

const dev = process.env.NODE_ENV === 'development';
const list = [];

if (dev) {
  list.push(sirv('static', {
    dev
  }));
}

list.push(sapper.middleware());

polka()
  .use(...list)
  .listen(process.env.PORT, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
