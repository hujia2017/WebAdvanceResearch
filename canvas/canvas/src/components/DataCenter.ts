
import * as globalV from './global';
import MainDraw from './MainDraw';

export default class DataCenter {
    private charts: MainDraw[] = new Array<MainDraw>();
    private datas: IDrawData = { Candlesticks: new Array<ICandlestick>() };
    private loctionx: number = -1000;
    private open: number = 200;
    private close: number = 180;
    public initdata() {
        this.buildData();
        // this.tick();
    }

    public Sub(baseClass: MainDraw) {
        this.charts.push(baseClass);
        setInterval(this.tick, 16);    // 稳定60帧左右
        // const inteval = setInterval(this.tick, 16);
        // setTimeout(() => {
        //     clearInterval(inteval);
        // });
        // this.tick();
    }

    private tick = () => {
        this.charts.forEach((o) => {
            if (o instanceof MainDraw) {
                o.setDrawData(this.datas);
            }
        });
    }

    private buildData() {
        for (let i = 0; i < 1000; i++) {
            this.loctionx = this.loctionx + globalV.value.candlestickwidth + globalV.value.candlestickmargin;
            this.open = this.open + Math.floor(Math.random() * 30 - 15);
            this.close = this.open - Math.floor(Math.random() * 40);
            this.datas.Candlesticks!.push({ index:i, x: this.loctionx, open: this.open, close: this.close, high: this.open + 10, low: this.close - 10 });
        }
    }
}