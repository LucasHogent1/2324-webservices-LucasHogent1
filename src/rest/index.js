const Router = require("@koa/router");
const installGebruiker = require("./gebruiker");


/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installGebruiker(router);  
//   installTopic(router);
//   installReactie(router);
//   installLike(router);
//   installGebruiker(router);
//   installBericht(router);
//   installHealthRoutes(router);

  app.use(router.routes()).use(router.allowedMethods());
};