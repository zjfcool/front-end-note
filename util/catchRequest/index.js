/**
 * 缓存请求路径
 * @param {string} url
 * @param {function} sucCb
 * @param {function} errCb
 */
function catchRequest(url, sucCb, errCb) {
  let obj = {};
  if (!obj[url]) {
    obj[url] = {
      status: 1,
      data: null,
      url: url,
      onerror: errCb,
      onsuccess: sucCb,
    };
  }
  if (obj[url].status && obj[url].data) {
    return Promise.resolve(obj[url]);
  }
  return axios(url)
    .then((res) => {
      obj[url].status = 1;
      obj[url].data = res.data;
      obj[url].onsuccess(obj[url]);
    })
    .catch((err) => {
      obj[url].status = 0;
      obj[url].data = null;
      obj[url].onerror(obj[url]);
    });
}
