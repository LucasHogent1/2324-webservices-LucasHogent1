const Koa = require('koa');

const config = require('config'); // 👈 1
const installRest = require("./rest")
const { initializeLogger, getLogger } = require('./core/logging');
const installMiddelare = require('./core/installMiddlewares')
const {initializeData, shutdownData} = require('./data')

const NODE_ENV = config.get("env") //process.env.NODE_ENV; // 👈 5
const LOG_LEVEL = config.get('log.level'); // 👈 2
const LOG_DISABLED = config.get('log.disabled'); // 👈 2
const HOST_PORT = config.get("host.port");

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`); // 👈 3

module.exports=async function createServer()  {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV,
    },
});


await initializeData();

const app = new Koa();

installMiddelare(app);

installRest(app);

return{
    getApp(){
        return app;
    },
    start(){
        return new Promise((resolve) =>{
            app.listen(HOST_PORT, () => {
                getLogger().info('🚀 Server listening on http://localhost:9000');
              });
              resolve();
        })
    },
    async stop(){
        //cleanup
        app.removeAllListeners();
        await shutdownData();
        getLogger().info('Goodbye');
    }
}


}


