export async function fetchAuthorization({login, password}) {
  const url = new URL('/api/v1/users/authorization', process.env.API_URL);
  const body = new FormData();

  body.set('login', login);
  body.set('password', password);

  const res = await fetch(url, {
    method: 'POST',
    body
  });

  if (res.status !== 200) {
    return;
  }

  return await res.json();
}

export async function fetchRefresh(refreshToken) {
  const url = new URL('/api/v1/users/refresh', process.env.API_URL);
  const body = new FormData();

  body.set('token', refreshToken);

  const res = await fetch(url, {
    method: 'POST',
    body
  });

  if (res.status !== 200) {
    return;
  }

  return await res.json();
}

export async function fetchUserInfo(accessToken) {
  const url = new URL('/api/v1/users/info', process.env.API_URL);
  const body = new FormData();

  const res = await fetch(url, {
    headers: {
      'X-Access-Token': accessToken
    }
  });

  if (res.status !== 200) {
    return;
  }

  return await res.json();
}
