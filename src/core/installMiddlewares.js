const config = require('config'); // 👈 1
const bodyparser = require("koa-bodyparser")
const koaCors = require('@koa/cors'); // 👈 1


const CORS_ORIGINS = config.get('cors.origins'); // 👈 2
const CORS_MAX_AGE = config.get('cors.maxAge'); // 👈 2


module.exports = function installMiddelare (app) {
app.use(
  koaCors({
    origin: (ctx) => { // 👈 4
      if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
        return ctx.request.header.origin;
      }
      // Not a valid domain at this point, let's return the first valid as we should return a string
      return CORS_ORIGINS[0];
    },
    allowHeaders: ['Accept', 'Content-Type', 'Authorization'], // 👈 5
    maxAge: CORS_MAX_AGE, // 👈 6
  })
);

app.use(bodyparser());

}
