import fetch from 'node-fetch';
import * as sapper from '@sapper/server';
import polka from 'polka';
import sirv from 'sirv';
import resolve from './toolkit/resolve.js';

const dev = process.env.NODE_ENV === 'development';

const controller = {
  imagesHaveMoved(req, res) {
    const path = req.url.substr(4);
    const url = new URL(`/api/v1/images/${path}`, process.env.API_URL);

    res.writeHead(301, {
      Location: url.toString()
    });

    res.end();
  },

  faqHasRemoved(req, res) {
    res.writeHead(410);
    res.end();
  },

  catalogPageHaveMoved(req, res) {
    res.writeHead(301, {
      Location: '/articles'
    });

    res.end();
  },

  async catalogThingHaveMoved(req, res, next) {
    const url = resolve('/api/v1/roadmap.json');
    const inq = await fetch(url);

    if (inq.ok) {
      const locations = await inq.json();

      for (const item of locations) {
        if (item.path === req.url) {
          res.writeHead(item.code, item.headers);
          res.end();
        }
      }
    }

    if (res.writableEnded === false) {
      next();
    }
  }
};

polka()
  .get('/im/*', controller.imagesHaveMoved)
  .get('/cg', controller.catalogPageHaveMoved)
  .get('/cg/*', controller.catalogThingHaveMoved)
  .get('/fg', controller.faqHasRemoved)
  .get('/fg/*', controller.faqHasRemoved)

  .use(sirv('static', { dev }))
  .use(sapper.middleware())

  .listen(process.env.PORT, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
