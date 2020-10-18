import Coyote from './coyote.js';

const {getItem, setItems, clearAll} = new Coyote();

Object.assign(request, {
  getItem,
  setItems,
  clearAll
});

export default async function request(...args) {
  let counter = 0;

  async function throttle(path, options = {}, auth = true) {
    let {
      method = 'GET',
      query = {},
      headers = {},
      body
    } = options;

    counter++;

    if (auth) {
      let token = request.getItem('accessToken');

      if (!token || token === String(undefined)) {
        const res = await throttle('/api/v1/users', {
          method: 'POST'
        },
        false);

        request.setItems(
          await res.json()
        );

        token = request.getItem('accessToken');
      }

      headers = {
        ...headers,
        'X-Access-Token': token
      };
    }

    const url = new URL(path, process.env.API_URL);

    for (let i of Object.keys(query)) {
      url.searchParams.set(i, query[i]);
    }

    if (typeof body === 'object' && body instanceof FormData === false) {
      headers = {
        ...headers,
        'Content-Type': 'application/json'
      };

      body = JSON.stringify(body);
    }

    const res = await fetch(url, {
      method,
      headers,
      body
    });

    if (res.statusText === 'JWT Expired' && counter === 1) {
      const opie = request.getItem('refreshToken');

      const res = await throttle(`/api/v1/oauth/${opie}`, {
        method: 'POST'
      },
      false);

      request.setItems(
        await res.json()
      );

      return await throttle(...args);
    }

    return res;
  }

  return await throttle(...args);
}
