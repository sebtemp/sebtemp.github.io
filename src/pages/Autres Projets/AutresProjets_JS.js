addEventListener('load', onLoadSetImages);
/**images is a map which you can find on the .js file of the current page.
 * It holds data (picture indexes, image sources) for every ".scrollerImages" sections.
*/
let images = new Map();
function onLoadSetImages(){
    images.set(
        "LaSalle Cloning Club", 
        {
            "indexPrevious" : 0,
            "indexNext": 0,
            "img": [
            "../../../resource/image/SideProject/LaSalleCloningClub/LaSalleCloningClub_Itch.png",
            "../../../resource/image/SideProject/LaSalleCloningClub/LaSalleCloningClub_Discord.png"]});
}

