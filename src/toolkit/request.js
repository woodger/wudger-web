import store from './store.js';
import Coyote from './coyote.js';
import resolve from './resolve.js';

const dev = process.env.NODE_ENV === 'development';

const {getItem, setItems, clearAll} = new Coyote();

Object.assign(request, {
  getItem,
  setItems,
  clearAll
});

export default async function request(...args) {
  let counter = 0;

  async function throttle(src, options = {}) {
    let {
      onError,
      auth = true,
      method = 'GET',
      query = {},
      headers = {},
      body,
      mode
    } = options;

    counter++;

    if (auth) {
      let token = getItem('accessToken');

      if (!token || undefined + '' === token) {
        const res = await throttle('/api/v1/users', {
          method: 'POST',
          auth: false
        });

        setItems(res);
        token = getItem('accessToken');
      }

      headers = {
        ...headers,
        'X-Access-Token': token
      };
    }

    const url = resolve(src, query);

    if (typeof body === 'object' && body instanceof FormData === false) {
      headers = {
        ...headers,
        'Content-Type': 'application/json'
      };

      body = JSON.stringify(body);
    }

    if (dev) {
      mode = 'no-cors';
    }

    const res = await fetch(url, {
      method,
      headers,
      body,
      mode
    });

    if (res.statusText === 'JWT Expired' && counter === 1) {
      const opie = getItem('refreshToken');

      const res = await throttle(`/api/v1/oauth/${opie}`, {
        method: 'POST',
        auth: false,
        onError() {
          clearAll();
        }
      });

      if (res) {
        setItems(res);
      }

      return await throttle(...args);
    }

    if (!res.ok) {
      if (onError) {
        return onError(res);
      }

      throw new Error(
        await res.text()
      );
    }

    return await res.json();
  }

  try {
    return await throttle(...args);
  }
  catch (err) {
    store.notification.set(err);
  }
}
