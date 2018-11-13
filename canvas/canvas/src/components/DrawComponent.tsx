import * as React from 'react';
import './Components.css'
import DataCenter from './DataCenter';
import MainDraw from './MainDraw';


export class ComponentTips extends React.Component {
  private ismousedown = false;
  private mousedownloc: ILocation = { x: 0, y: 0 };
  private mouseloc: ILocation = { x: 0, y: 0 };
  private datacenter = new DataCenter();
  private offsetcount = 0;

  public componentDidMount() {
    // 初始化绘图图层
    const test = new MainDraw();
    test.init("ChartRoot");
    // 初始化数据中心 生成数据 开启绘图线程
    this.datacenter.initdata();
    this.datacenter.Sub(test);
    // 监听鼠标 将偏移发送给绘图图层
    const rootElement = document.getElementById("ChartRoot") as HTMLDivElement;
    rootElement.onmousedown = (event: MouseEvent) => {
      this.ismousedown = true;
      this.mousedownloc.x = event.clientX;
      this.mousedownloc.y = event.clientY;
    }
    rootElement.onmousemove = (event: MouseEvent) => {
      if (this.ismousedown) {
        this.mouseloc.x = event.clientX;
        this.mouseloc.y = event.clientY;
        test.setOffset(this.offsetcount + this.mouseloc.x - this.mousedownloc.x);
      }
    }
    rootElement.onmouseup = (event: MouseEvent) => {
      this.ismousedown = false;
      this.offsetcount = this.offsetcount + this.mouseloc.x - this.mousedownloc.x;
    }
  }

  public render() {
    return (
      <div id="ChartRoot" className="ChartRoot" />
    );
  }
}