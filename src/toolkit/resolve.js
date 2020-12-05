export default function resolve(src, query) {
  const url = new URL(src, process.env.API_URL);

  if (query) {
    for (let i of Object.keys(query)) {
      url.searchParams.set(i, query[i]);
    }
  }

  return url;
}
