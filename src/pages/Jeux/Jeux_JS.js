addEventListener('load', onLoadSetImages);
/**images is a map which you can find on the .js file of the current page.
 * It holds data (picture indexes, image sources) for every ".scrollerImages" sections.
*/
let images = new Map();
function onLoadSetImages(){
    images.set(
        "TrainWreck", 
        {
            "indexPrevious" : 0,
            "indexNext": 0,
            "img": [
            "../../../resource/image/Game/TrainWreck/TrainWreck_GIF_00.gif",
            "../../../resource/image/Game/TrainWreck/TrainWreck_GIF_01.gif"]});

    images.set(
        "TBDoom", 
        {
            "indexPrevious" : 0,
            "indexNext": 0,
            "img": [
            "../../../resource/image/Game/TBDoom/TBD_Misille launcher.webp",
            "../../../resource/image/Game/TBDoom/TBD_Tennis ball.webp"]});

    images.set(
        "Druidal Communion",
        {
            "indexPrevious" : 0,
            "indexNext": 0,
            "img": [
            "../../../resource/image/Game/DruidalCommunion/DC_Bush.gif",
            "../../../resource/image/Game/DruidalCommunion/DC_Fight_Warlock.gif",
            "../../../resource/image/Game/DruidalCommunion/DC_Heal.gif"]});
}