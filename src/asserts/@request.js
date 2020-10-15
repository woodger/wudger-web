const accessToken = 'accessToken';
const refreshToken = 'refreshToken';

const saveCredentials = (pairs) => {
  localStorage.setItem(accessToken, pairs.accessToken);
  localStorage.setItem(refreshToken, pairs.refreshToken);
};

const clearCredentials = () => {
  localStorage.removeItem(accessToken);
  localStorage.removeItem(refreshToken);
};

// let body;
//
// if (data) {
//   body = new FormData();
//
//   for (let [key, value] of Object.entries(data)) {
//     if (value instanceof FileList) {
//       for (let file of value) {
//         body.append(key, file);
//       }
//     }
//     else {
//       body.append(key, value);
//     }
//   }
// }

export default async function request(...args) {
  let counter = 0;

  async function throttle(path, options = {}) {
    let {
      method = 'GET',
      query = {},
      headers = {},
      auth = true,
      data,
      body
    } = options;

    counter++;

    if (auth) {
      let token = localStorage.getItem(accessToken);

      if (!token || token === String(undefined)) {
        const res = await throttle('/api/v1/users', {
          method: 'POST',
          auth: false
        });

        try {
          const pairs = await res.json();
          saveCredentials(pairs);

          token = localStorage.getItem(accessToken);
        }
        catch (err) {
          return res;
        }
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

    const res = await fetch(url, {
      method,
      headers,
      body
    });

    if (res.statusText === 'JWT Expired' && counter === 1) {
      const opie = localStorage.getItem(refreshToken);

      const res = await throttle(`/api/v1/oauth/${opie}`, {
        method: 'POST',
        auth: false
      });

      try {
        const pairs = await res.json();
        saveCredentials(pairs);
      }
      catch (err) {
        return res;
      }

      return await throttle(...args);
    }

    return res;
  }

  return await throttle(...args);
}

request.saveCredentials = saveCredentials;
request.clearCredentials = clearCredentials;
