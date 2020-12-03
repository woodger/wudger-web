import http from 'http';
import https from 'https';
import sirv from 'sirv';
import polka from 'polka';
import * as sapper from '@sapper/server';

const dev = process.env.NODE_ENV === 'development';

polka()
  .use((req, res, next) => {
    const found = ['/pages', '/bucket'].some((item) => {
      return req.url.indexOf(item) === 0;
    });

    if (found === false) {
      return next();
    }

    const url = new URL(`/api/v1/files${req.url}`, process.env.API_URL);
    const module = url.protocol === 'https' ?
      https : http;

    module.get(url, (api) => {
      api.pipe(res);
    });
  })
  .use(sirv('static', {
    dev
  }))
  .use(sapper.middleware())
  .listen(process.env.PORT, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
