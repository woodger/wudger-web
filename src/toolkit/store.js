import { writable } from 'svelte/store';

export default function store() {}

store.modal = writable();
store.user = writable();
store.admin = writable(false);
store.articles = writable();
store.notification = writable();
