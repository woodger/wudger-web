import * as sapper from '@sapper/server';
import polka from 'polka';
import sirv from 'sirv';

const dev = process.env.NODE_ENV === 'development';

polka()
  .use(sirv('static', {
    dev
  }))
  .use(sapper.middleware())
  .listen(process.env.PORT, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
