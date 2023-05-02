// Not many pictures of myself out there... Enjoy a creepy zoom instead!
var pictureSeb = ["../../../resource/image/Pictures/Picture01.jpg", 
                    "../../../resource/image/Pictures/Picture02.jpg",
                    "../../../resource/image/Pictures/Picture03.jpg"]
var count = 0;
const changeAtTime = 2000;

addEventListener("load", setupInterval);
function setupInterval(){
    setInterval(automatePictureChange, changeAtTime);
}

function automatePictureChange(){
    count++;
    if (count === pictureSeb.length){
        count = 0;
    }

    let picSeb = document.getElementById("picSeb");
    picSeb.src = pictureSeb[count];
}