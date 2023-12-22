class Pipe{
    static pipeWidth = 50;
    static size = 90;
    constructor(x){
        this.y = 50 + Math.random()*200; 
        this.x = x;
    }

    show(){
        fill(0);
        rect(this.x, 0, Pipe.pipeWidth ,this.y);
        // rect(x,y,w,h); HEIGHT = 600;
        rect(this.x, this.y + Pipe.size, Pipe.pipeWidth, 600 - this.y - Pipe.size);
        this.x -= 3;   
    }
}