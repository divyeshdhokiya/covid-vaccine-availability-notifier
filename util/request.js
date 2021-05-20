const request = require("axios").default;

const get = (options) => {
  const DEFAULT_OPTIONS = {
    method: "get",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    },
  };

  return request({ ...DEFAULT_OPTIONS, ...options }).then((response) => {
    return response.data;
  });
};

module.exports = {
  get,
};
