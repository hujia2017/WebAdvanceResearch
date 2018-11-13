interface ICandlestick{
    index:number;      // K线柱子索引  
    x:number;          // 横坐标
    open:number;       // 开盘价
    close:number;      // 收盘价
    high:number;       // 最高价
    low:number;        // 最低价
}

// 绘制数据的基本类型
interface IDrawData{
    Candlesticks?:ICandlestick[];
    canvaswidth?:number;
    canvasheight?:number;
}

interface ILocation{
    x:number;
    y:number;
}