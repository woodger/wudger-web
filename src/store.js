import { writable } from 'svelte/store';

export const visibleMenu = writable(false);
export const showAuthForm = writable(false);
export const accessToken = writable();
export const userInfo = writable();
