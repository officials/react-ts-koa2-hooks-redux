import { route, GET } from "awilix-koa";
import { Context } from "koa";
@route("/")
class IndexController {
    private indexService: { getData: () => void; };
    /**
     * 
     * @param param0 
     * 在这里卡了很久，没注意注入的service需要解构
     * @author duanxl
     * @implements 首页数据获取
     */
    constructor({
        indexService
    }) {
        this.indexService = indexService;
    }
    @GET()
    async actionIndex(ctx: Context, next:()=>Promise<object>) {
        ctx.body = await ctx.render("index");
    }
}
export default IndexController;