import * as Koa from 'koa';
import mongodb from './utils/mongodb';
import { getEnvironment } from './utils/config';
import exception from './middleware/exception';
import routers from './routers/index';
import service from './services/index';

const http = require('http');
const logger = require('koa-logger');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');

let port = 8080;
const app = new Koa();
app.use(exception());
app.use(bodyParser());
app.use(
    koaJson({
        pretty: false,
        param: 'pretty',
    }),
);
app.use(logger());
const server = http.createServer(app.callback());
routers(app);
mongodb.init().then(async ({ mongoDB }) => {
    try {
        console.log('connect kafka success');
        server.listen(port, () => {
            console.log('启动服务成功，监听端口', port);
            app.context.mongoDB = mongoDB;
            service(app);
            // const apolloServer = graphql(app);
            // console.log('graph path is', apolloServer.graphqlPath);
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
});
