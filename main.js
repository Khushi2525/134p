object = [];
status = "";
song = "alarm_clock.mp3"

function preload(){
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.position(500,200);
    video = createCapture(500,400);
    video.hide()
    objectDetector = ml5.objectDetector("cocossd",modalLoaded);
    document.getElementById("status").innerHTML="Status:Detecting objects";
}

function draw(){
    image(video,0,0,500,400);
    if(status!=""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video,gotResults);
        for (let i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML="Status:Detected Object";
            document.getElementById("obj").innerHTML="Number of Objects Detected:"+object.length;

            fill(r,g,b);
            percentage = Math.floor(object[i].confidence*100);
            text(object[i].label+" "+percentage+"%",object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
        }

        }
}

function modalLoaded(){
    console.log(modalLoaded);
    status = true;
}

function gotResults(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object = result;
    }
}