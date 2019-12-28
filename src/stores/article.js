export async function fetchArticleList(XAccessToken) {
  const url = new URL(`/api/v1/articles${location.search}`, process.env.API_URL);

  const res = await fetch(url, {
    headers: {
      'X-Access-Token': XAccessToken
    }
  });

  if (res.ok === false) {
    return null;
  }

  return await res.json();
}
