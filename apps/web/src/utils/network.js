
export const getApi = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`${url}: `, `ok: ${res.ok},status: ${res.status}, statusText: ${res.statusText}`);
      return { ok: res.ok, status: res.status, message: res.statusText };
    };

    return await res.json();

  } catch (error) {
    console.error(`${url}: `, error);
    return { ok: false, message: error };
  }
}