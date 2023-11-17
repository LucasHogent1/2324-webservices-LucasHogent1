const Router = require('@koa/router');
const GebruikerServer = require('../service/gebruiker');

const getAllGebruikers = async (ctx) => {
  ctx.body = await GebruikerServer.getAllGebruiker();
};

const getGebruikerById = async (ctx) => {
  ctx.body = await GebruikerServer.getGebruikerById(Number(ctx.params.id));
};

const createGebruiker = async (ctx) => {
  const newMessage = await GebruikerServer.createGebruiker({
    email: String(ctx.request.body.email),
    voornaam: String(ctx.request.body.voornaam),
    achternaam: String(ctx.request.body.achternaam),
  });
  ctx.body = newMessage;
};

const updateGebruikerById = async (ctx) => {
  ctx.body = await GebruikerServer.updateGebruikerById(Number(ctx.params.id), {
    email: String(ctx.request.body.email),
    voornaam: String(ctx.request.body.voornaam),
    achternaam: String(ctx.request.body.achternaam),
  });
};

const deleteGebruikerById = async (ctx) => {
  GebruikerServer.deleteGebruikerById(Number(ctx.params.id));
  ctx.status = 204;
};


/**
 * Install Message routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/Gebruiker',
  });

  router.get('/', getAllGebruikers);
  router.post('/', createGebruiker);
  router.get('/:id', getGebruikerById);
  router.put('/:id', updateGebruikerById);
  router.delete('/:id', deleteGebruikerById);

  app.use(router.routes())
     .use(router.allowedMethods());
};