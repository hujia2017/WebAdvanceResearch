// import * as globalV from './global';

export default class VScaleRenderer{

    public OnRender(ctx:CanvasRenderingContext2D, drawData: IDrawData | null){   
        if(drawData!=null){
            ctx.beginPath();

            ctx.rect(0,0,10,10);
            ctx.strokeStyle="red";
            ctx.stroke();
            ctx.closePath();
            // ctx.moveTo(this.marginleft,this.margintop);
            // ctx.lineTo(10,drawData.canvasheight/2);
            // ctx.lineTo(drawData.canvaswidth-20,drawData.canvasheight/2);
            // ctx.createImageData(100,100);
        }
    }
}