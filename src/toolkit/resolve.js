export default function resolve(src, query) {
  let api;

  if (process.env.NODE_ENV === 'development') {
    api = process.env.API_URL;
  }

  const url = new URL(src, api);

  if (query) {
    for (let i of Object.keys(query)) {
      url.searchParams.set(i, query[i]);
    }
  }

  return url;
}
