const saveCredentials = (pairs) => {
  localStorage.setItem('accessToken', pairs.accessToken);
  localStorage.setItem('refreshToken', pairs.refreshToken);
};

const clearCredentials = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export default async function request(...args) {
  let [path, {method = 'GET', query = {}, headers = {}, data} = {}, auth = true] = args;
  const url = new URL(path, process.env.API_URL);

  for (let i of Object.keys(query)) {
    url.searchParams.set(i, query[i]);
  }

  if (auth) {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      const res = await request('/api/v1/users', {
        method: 'POST'
      },
      false);

      const pairs = await res.json();
      saveCredentials(pairs);

      accessToken = localStorage.getItem('accessToken');
    }

    headers = {
      'X-Access-Token': accessToken,
      ...headers
    };
  }

  let body;

  if (data) {
    body = new FormData();

    for (let [key, value] of Object.entries(data)) {
      body.append(key, value);
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body
  });

  if (res.status === 401 && res.statusText === 'JWT Expired') {
    const opie = localStorage.getItem('refreshToken');

    const res = await request(`/api/v1/oauth/${opie}`, {
      method: 'POST'
    },
    false);

    const pairs = await res.json();
    saveCredentials(pairs);

    return await request(...args);
  }

  return res;
}

request.saveCredentials = saveCredentials;
request.clearCredentials = clearCredentials;
