export async function get(path, {headers = {}} = {}) {
  const url = new URL(path, process.env.API_URL);

  const res = await fetch(url, {
    headers
  });

  if (res.status !== 200) {
    return;
  }

  return await res.json();
}

export async function post(path, {headers = {}, data = {}} = {}) {
  const url = new URL(path, process.env.API_URL);
  const body = new FormData();

  for (let [key, value] of Object.entries(data)) {
    body.set(key, value);
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body
  });

  if (res.status !== 200) {
    return;
  }

  return await res.json();
}
