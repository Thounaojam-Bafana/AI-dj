song = "";
leftWristY = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    song = loadSound('song.mp3');
}
function setup(){
    canvas = createCanvas(500,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,500,450);
    
    fill(245, 37, 37);
    stroke(245, 37, 37);

    if(scoreLeftWrist >= 0.2){
    circle(leftWristX, leftWristY, 20);
    inNumberLeftWristY = Number(leftWristY);
    removedLWY = floor(inNumberLeftWristY);
    volume = removedLWY/500;
    document.getElementById("volume").innerHTML = "Volume: " + volume;
    song.setVolume(volume);
    }

    if(scoreRightWrist >= 0.2){
    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY < 100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed: 0.5x";
    }
    else if(rightWristY >= 100 && rightWristY < 200 ){
        song.rate(1);
        document.getElementById("speed").innerHTML = "Speed: 1.0x";
    }
    else if(rightWristY >= 200 && rightWristY < 300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
    }
    else if(rightWristY >= 300 && rightWristY < 400){
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed: 2.0x";
    }
    else if(rightWristY >= 400 && rightWristY < 500){
        song.rate(2.5)
        document.getElementById("speed").innerHTML = "Speed: 2.5x";
    }
}
}

function play(){
    song.stop();
    song.play();
    song.setVolume(1);
    song.rate(1);  
}
function stop(){
    song.stop();
}
function  modelLoaded(){
    console.log("PoseNet is Initialised!");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + scoreRightWrist);
        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X : " + leftWristX + "Left Wrist Y : "+ leftWristX);
        console.log("Right Wrist X : " + rightWristX + "Right Wrist Y : " + rightWristY);
    }
}