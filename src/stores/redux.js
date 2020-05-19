import {writable} from 'svelte/store';

export const userInfo = writable({});

/*
accessToken.subscribe(async value => {
  $userInfo = await fetchUserInfo(value);

  console.log(value);
});

refreshToken.subscribe(value => {
  localStorage.setItem('refreshToken', value);

  console.log(value);
});
*/
