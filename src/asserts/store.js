import { writable } from 'svelte/store';

export default function store() {}

store['oauth2.menu.visible'] = writable(false);
store['oauth2.login.visible'] = writable(false);
store['oauth2.user.credentials'] = writable();
store['oauth2.user.info'] = writable();
