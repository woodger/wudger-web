import { writable } from 'svelte/store';

export default function store() {}

store['oauth.required'] = writable(false);
store['oauth.access.token'] = writable();
store['oauth.user.info'] = writable();
store['oauth.user.admin'] = writable();

store['notification.message'] = writable();
store['notification.error'] = writable();
