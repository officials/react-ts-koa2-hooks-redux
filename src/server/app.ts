import Koa from 'koa';
import render from 'koa-swig';
import * as coo from 'co';
import serve from 'koa-static';
import { join } from 'path';
const app = new Koa();
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import {historyApiFallback} from 'koa2-connect-history-api-fallback';

const container = createContainer();
console.log(container);
container.loadModules([__dirname + "/services/*.ts"], {
    formatName: "camelCase",
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
})
//和koa融合
app.use(scopePerRequest(container));
//加载controller
app.use(loadControllers(__dirname + '/controllers/*.ts'));
var co = require('co');
app.use(serve(__dirname + '/assets'));
app.context.render = coo.wrap(render({
    root: join(__dirname, 'views'),
    autoescape: true,
    cache: false, // disable, set to false
    ext: 'html',
    writeBody: false
}));

app.use(async ctx => ctx.body = await ctx.render('index'));
app.use(historyApiFallback({ whiteList: ['/api'] }));
app.listen(3000, () => {
    console.log('🍺服务启动成功---3000');
});