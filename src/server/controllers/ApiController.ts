import { route, GET } from "awilix-koa";
import { Context } from "koa";
@route("/api")
class ApiController {
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
    @route("/data")
    @GET()
    async actionData(ctx: Context, next:any) {
        const result = await this.indexService.getData();
        
        ctx.body = {
            data:result
        }
    }
}
export default ApiController;