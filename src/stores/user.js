import {writable} from 'svelte/store';

export const accessToken = writable();
export const userInfo = writable();

export function authorize() {
  return new Promise(resolve => {
    accessToken.subscribe(value => {
      if (value) {
        resolve(value);
      }
    });
  });
}

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
