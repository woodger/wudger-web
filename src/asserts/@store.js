import { writable } from 'svelte/store';

export default function store() {}

store['oauth.form.visible'] = writable(false);
store['oauth.user.admin'] = writable();
store['oauth.user.info'] = writable();
store['oauth.access.token'] = writable();

store['oauth.token'] = writable();
store['modal'] = writable();

store['notification.message'] = writable();
store['notification.error'] = writable();
