let HEIGHT = 600;
let WIDTH = 400;
let spaceOfPipes = 200;
// let bird = new Bird(100,200);
let birds = [];
let pipes= [];  
let generation = 1;
for (let i = 0; i < 100; i++){
    pipes.push(new Pipe(400 + i * spaceOfPipes));
}
for (let i = 0; i < 1000; i++){
    let bird = new Bird(100,200);
    nn = new NeuralNetwork();
    nn.add(new Layer(5));
    nn.add(new Layer(6));
    nn.add(new Layer(1));
    bird.setBrain(nn);
    birds.push(bird);
}
let timeJustClicked = 5;
function setup() {
    createCanvas(HEIGHT, WIDTH);
    frameRate(60);
  }

function draw(){
    background(255);
    // bird.show();
    let totalAlive = 0;
    for (let bird of birds){
        if(bird.alive){
            bird.show();
            totalAlive++;
        }
    }
    for (let pipe of pipes){
        pipe.show();
        // birds = birds.filter(b => !checkCollision(b,pipe));
        for (let bird of birds){
            if (checkCollision(bird,pipe) || bird.y > 600){
                bird.alive = false;
            }
        }
    }
    // let aheadPipes = pipes.filter((p) => p.x + Pipe.pipeWidth - 100 > 0);
    // let closestPipe = aheadPipes.reduce((a,b) => (Math.abs(a.x + Pipe.pipeWidth - 110) < Math.abs(b.x + Pipe.pipeWidth - 110))?a:b);
    //console.log(closestPipe.x)
    let closest = Infinity;
    let closestPipe;
    for (let pipe of pipes){
      let d = (pipe.x + Pipe.pipeWidth + 10) - 100;
      if (d < closest && d > 0) {
        closestPipe = pipe;
        closest = d;
    }
    }
    pipes = pipes.filter((p) => p.x > -100)
    for (let bird of birds){
        let input = [];
        input[0] = bird.y;
        input[1] = closestPipe.y;
        input[2] = (closestPipe.x);
        input[3] = bird.velY;
        input[4] = (bird.y - closestPipe.y);
        let p = bird.brain.predict(input);
        //console.log(p[0])
        if (p[0] >= 0.5){
            bird.flap();
        }
    }
    if(totalAlive == 0){
        noLoop();
        birds.sort((a,b) => (a.score > b.score)?-1:1)
        birds = birds.slice(0,10);
        for (let i = 0; i < 10; i++){
            birds[i].alive = true;
            birds[i].score = 0;
            for (let j = 0; j < 99; j++){
                let newBird = new Bird(100,200);
                newBird.setBrain(birds[i].brain.mutate(0.3));
                birds.push(newBird);
            }
        }
        console.log(birds.length)
        pipes = [];
        for (let i = 0; i < 100; i++){
            pipes.push(new Pipe(400 + i * spaceOfPipes));
        }
        loop();
        console.log(generation++);
    }
    // if (bird.y >= HEIGHT) noLoop();
}
// function keyPressed(){
//     switch(key){
//         case ' ': {
//             bird.flap();
//         } 
//     }
// }
function checkCollision(bird,pipe){
    return ((bird.x + Bird.size >= pipe.x && bird.x - Bird.size <= pipe.x + Pipe.pipeWidth) && (bird.y - Bird.size <= pipe.y || bird.y + Bird.size >= pipe.y + Pipe.size));
}