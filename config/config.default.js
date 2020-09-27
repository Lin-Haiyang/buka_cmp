var config = {};
config.keys = "123456";
//模板
config.view = {
  defaultViewEngine: "nunjucks",
  mapping: {
    ".html": "nunjucks",
  },
};
//安全
config.security = {
  security: {
    csrf: {
      // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: "_csrf", // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  },
};
//数据
config.mongoose = {
  client: {
    url: "mongodb://127.0.0.1:27017/db_buka",
    options: { useNewUrlParser: true },
  },
};

config.session = {
  key: "EGG_SESS",
  maxAge: 24 * 3600 * 1000, // 1 天
  httpOnly: true,
  encrypt: true,
};
module.exports = config;
