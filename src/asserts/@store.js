import { writable } from 'svelte/store';

export default function store() {}

store['modal'] = writable();
store['user.info'] = writable();
store['user.admin'] = writable(false);

store['notification.message'] = writable();
store['notification.error'] = writable();
