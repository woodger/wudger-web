import {writable} from 'svelte/store';

export const authorize = writable(false);
export const credentials = writable();
export const userInfo = writable();
