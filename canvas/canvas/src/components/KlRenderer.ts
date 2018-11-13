import * as globalV from './global';

export default class KLRenderer {
    private offset = 0;
    private datas: ICandlestick[] = new Array<ICandlestick>();
    private ctx: CanvasRenderingContext2D;
    // 判断当前是否需要重新绘制的标志 数据中心会每秒发送60次左右的重绘请求 但实际是否执行重绘 则是由该标志控制
    private needFlush = true;     
    public init() {
        // window.requestAnimationFrame(this.animate);
    }

    public OnRender(ctx: CanvasRenderingContext2D, drawData: IDrawData) {
        if (drawData == null) {
            return;
        }
        this.ctx = ctx!;
        this.datas = drawData.Candlesticks!;
        this.reflush(false);
    }

    // 设置横向偏移
    public setOffset(offset: number) {
        this.offset = offset;
        this.needFlush = true;
        // this.reflush(true);
    }

    // 重绘界面
    public reflush(clear: boolean) {
        if(!this.needFlush){
            return;
        }
        this.ctx!.clearRect(0, 0, globalV.value.width, globalV.value.height);
        // this.sethigh();
        for (const data of this.datas) {
            this.render(data);
        }
        this.needFlush = false;
    }

    // 数据改变 根据当前可视区数据 重新设置纵向坐标轴
    public setVScale() {
        let highest = null;
        let lowest = null;
        for (const data of this.datas) {
            if (data.x + this.offset < 0 || data.x + this.offset > globalV.value.width) {
                continue;
            }
            if (highest === null) {
                highest = data.high;
            }
            if (data.high > highest) {
                highest = data.high;
            }
            if (lowest === null) {
                lowest = data.low;
            }
            if (data.low < lowest) {
                lowest = data.low;
            }
        }
        if (highest !== null && lowest !== null) {
            globalV.value.highprice = Math.floor(highest + (highest - lowest) * 0.2);
            globalV.value.lowprice = Math.floor(lowest - (highest - lowest) * 0.2);
            globalV.value.perheight = globalV.value.height / (globalV.value.highprice - globalV.value.lowprice);
        }
    }

    // // 动画.....................................................
    // private animate(stamp:number) {
    //     // this.ctx.clearRect(0, 0, globalV.value.width, globalV.value.height);
    //     this.reflush(false);

    //     window.requestAnimationFrame(this.animate);
    // }

    private render(data: ICandlestick) {
        if (data.x + this.offset < 0 || data.x + this.offset > globalV.value.width) {
            return;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(data.x + globalV.value.candlestickwidth / 2 + this.offset, this.getlocation(data.high));
        this.ctx.lineTo(data.x + globalV.value.candlestickwidth / 2 + this.offset, this.getlocation(data.low));
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.rect(data.x + this.offset, this.getlocation(data.open), globalV.value.candlestickwidth, this.getlocation(data.close) - this.getlocation(data.open));
        this.ctx.fillStyle = 'blue'
        this.ctx.fill();
        this.ctx.strokeText(data.index + "", data.x + this.offset, this.getlocation(data.high));
    }

    private getlocation(price: number): number {
        return globalV.value.height - (globalV.value.highprice - price) * globalV.value.perheight;
    }
}