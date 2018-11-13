import * as globalV from './global';

export default class FrameRenderer{
    private marginleft=30;
    private margintop=30;
    private marginright=30;
    private marginbottom=30;
    private needFlush = true;

    public OnRender(ctx:CanvasRenderingContext2D, drawData: IDrawData | null){   
        if(!this.needFlush){
            return;
        }
        if(drawData!=null){
            ctx.beginPath();

            ctx.rect(this.marginleft,this.margintop,globalV.value.width-this.marginleft-this.marginright,globalV.value.height-this.margintop-this.marginbottom);
            ctx.strokeStyle="red";
            ctx.stroke();
            ctx.closePath();
            // ctx.moveTo(this.marginleft,this.margintop);
            // ctx.lineTo(10,drawData.canvasheight/2);
            // ctx.lineTo(drawData.canvaswidth-20,drawData.canvasheight/2);
            // ctx.createImageData(100,100);
            this.needFlush = false;
        }
    }
}