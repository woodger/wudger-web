import { writable } from 'svelte/store';

export default function store() {}

store['oauth.form.visible'] = writable(false);
store['oauth.user.admin'] = writable(false);
store['oauth.user.info'] = writable(null);
store['oauth.access.token'] = writable();

store['notification.message'] = writable();
store['notification.error'] = writable();
