import './DataModal';
import FrameRenderer from './FrameRenderer';
import * as globalV from './global';
import KLRenderer from './KlRenderer';
// import VScaleRenderer from './VScaleRenderer';

export default class  MainDraw{
    private klrender=new KLRenderer();
    private framerender=new FrameRenderer();
    // private vscalerender = new VScaleRenderer();
    private ctxkl : CanvasRenderingContext2D | null;
    private ctxframe : CanvasRenderingContext2D | null;
    // private ctxvscale : CanvasRenderingContext2D | null;
    // public  setDrawType(type:string){
    //     this.type=type;
    // }

    // 数据中心调用该函数 将数据发送到各个绘制图层
    public setDrawData(drawData: IDrawData){
        if(this.ctxkl!=null && drawData.Candlesticks !== undefined){
            this.klrender.setVScale();
            this.klrender.OnRender(this.ctxkl, drawData);
        }
        if(this.ctxframe!=null && drawData.Candlesticks !== undefined){
            this.framerender.OnRender(this.ctxframe, drawData);
        }
        // if(this.ctxvscale!=null && drawData.Candlesticks !== undefined){
        //     this.vscalerender.OnRender(this.ctxvscale, drawData);
        // }
        return null;
    }

    // 组件调用该函数 将偏移值发送到各个绘制图层
    public setOffset(offset:number){
        this.klrender.setOffset(offset);
        return;
    }

    // 创建绘制图层
    public init(elementId:string){
        // this.klrender.init();
        const parent=document.getElementById(elementId);
        if(parent==null){
            return;
        }
        // k线数据canvas
        const canvas1= document.createElement("canvas");
        canvas1.className="framecanvas";
        canvas1.width=globalV.value.width;
        canvas1.height=globalV.value.height;
        parent.appendChild(canvas1);
        this.ctxkl = canvas1.getContext("2d");

        // 边框canvas
        const canvas2= document.createElement("canvas");
        canvas2.className="framecanvas";
        canvas2.width=globalV.value.width;
        canvas2.height=globalV.value.height;
        parent.appendChild(canvas2);
        this.ctxframe = canvas2.getContext("2d");

        // // 纵坐标canvas
        // const canvas3= document.createElement("canvas");
        // canvas3.className="vscalecanvas";
        // canvas3.width=globalV.value.width;
        // canvas3.height=globalV.value.height;
        // parent.appendChild(canvas3);
        // this.ctxvscale = canvas3.getContext("2d");
        // const infospan=document.createElement();
    }
}