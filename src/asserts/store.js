import { writable } from 'svelte/store';

export default function store() {}

store['oauth2.authorization.required'] = writable(false);
store['oauth2.access.token'] = writable();
store['oauth2.user.info'] = writable();
store['oauth2.user.admin'] = writable();

store['notification.message'] = writable();
store['notification.error'] = writable();
