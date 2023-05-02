addEventListener('load', onLoadInit);
function onLoadInit(){
    // Dropdown menu
    setOnHoverColorEvents();
    // Popup window
    setEnlargeEvents();
    // Scrollable
    setScrollImgEvents();
    setScrollableCues();
}

// Dropdown Menu
function ddHoverIn(parent){
    parent.style.background = "#545454";
    parent.querySelector(".dropdown-items").style.display = "flex";
    parent.querySelector(".dropdown-items").style.flexDirection = "column";
}

function ddHoverOut(parent){
    parent.style.background = "#272632";
    parent.querySelector(".dropdown-items").style.display = "none";
    parent.querySelector(".dropdown-items").style.flexDirection = "none";
}

function ddItemClick(onLoadPage){
    onLoadPageString = onLoadPage;
    if (document.querySelector("title").textContent != "Jeux"){
        window.location.href = "../Jeux/Jeux_HTML.html#" + onLoadPage;
    }
    else if (document.querySelector("title").textContent === "Jeux"){
        document.getElementById(onLoadPageString).scrollIntoView();
    }
}

/**
 * Reusable event listener for class="hoverableLink".
 * Add visual feedback: color change on hover in and out.
 * Also set for links
*/
function setOnHoverColorEvents(){
    var dropdownButtons = document.getElementsByClassName("hoverableLink");

    for (var i = 0; i < dropdownButtons.length; i++){
        dropdownButtons[i].addEventListener('mouseenter', onHoverInSetColor(dropdownButtons[i]));
        dropdownButtons[i].addEventListener('mouseleave', onHoverOutSetColor(dropdownButtons[i]));
    }
}

const onHoverInSetColor = (parent) => {
    return (mReturn) => {
        parent.style.color = "#38c352";
    }
}

const onHoverOutSetColor = (parent) => {
    return (mReturn) => {
        parent.style.color = "#ebebeb";
    }
}

// Popup window
/**Requires [class="enlargeable"] on desired img markup to allow enlarge*/
function setEnlargeEvents(){
    var enlargeables = document.getElementsByClassName("enlargeable");

    for (var i = 0; i < enlargeables.length; i++){
        enlargeables[i].addEventListener('click', onEnlargeSubscribe(enlargeables[i]));
    }
}

const onEnlargeSubscribe = (enlargeable) => {
    return (mReturn) => {
        let bigImg = document.getElementById("bigImg");
        bigImg.querySelector("img").src = enlargeable.src;
        bigImg.style.display = "flex";
    }
}

function onCloseEnlarge(){
    let bigImg = document.getElementById("bigImg");
    bigImg.style.display = "none"; 
}

// Scroll image
/**
 * Disable arrows if quantity of images of .scrollerImages .enlargeable is >= to quantity of stored sources of images.
 * Still allows for single image with scroll.
 */ 
function setScrollableCues(){
    let bottoms = document.getElementsByClassName("bottom");

    // quit check for pages with no bottom section or with no scrollerImages section
    if (bottoms.length === 0 || bottoms[0].getElementsByClassName("scrollerImages").length === 0)
    {
        return;
    }

    // set arrows for scrollable section
    // will disable scrolling arrows of any bottom section where the quantity of img is equal to or bigger than the length...
    // ... of the stored array or src for that section
    for (var i = 0; i < bottoms.length; i++){
        let name = bottoms[i].parentElement.getElementsByClassName("title")[0].innerHTML;
        let imgs = bottoms[i].getElementsByClassName("enlargeable");

        
        if (!images.has(name))
        {
            console.log(name);
            bottoms[i].getElementsByClassName("scrollPrevious")[0].style.display = "none";
            bottoms[i].getElementsByClassName("scrollNext")[0].style.display = "none";
        }
        else if (imgs.length >= images.get(name)["img"].length)
        {
            bottoms[i].getElementsByClassName("scrollPrevious")[0].style.display = "none";
            bottoms[i].getElementsByClassName("scrollNext")[0].style.display = "none";
        }
        else {
            // set next index for every valid bottom section
            images.get(name)["indexNext"] = imgs.length - 1;
        }
    }
}

function setScrollImgEvents(){
    // previous
    var scrollPreviouses = document.getElementsByClassName("scrollPrevious");
    for (var i = 0; i < scrollPreviouses.length; i++){
        scrollPreviouses[i].addEventListener('click', onScrollPrevious(scrollPreviouses[i]));
    }

    // next
    var scrollNexts = document.getElementsByClassName("scrollNext");
    for (var i = 0; i < scrollPreviouses.length; i++){
        scrollNexts[i].addEventListener('click', onScrollNext(scrollNexts[i]));
    }
}

const onScrollPrevious = (element) => {
    return (mReturn) => {
        // not the cleanest way to access game title (map.get(title)), but will do
        let gameTitle = element.parentElement.parentElement.getElementsByClassName("title")[0].innerHTML;

        // images refers to the specific page's JavaScript's images map
        if (images.has(gameTitle)){
            let enlargeables = element.parentElement.getElementsByClassName("enlargeable");
            for (let i = enlargeables.length - 1; i >= 1; i--){
                enlargeables[i].src = enlargeables[i - 1].src;
            }

            // manage indexes
            images.get(gameTitle)["indexPrevious"] -= 1;
            if (images.get(gameTitle)["indexPrevious"] < 0){
                images.get(gameTitle)["indexPrevious"] = images.get(gameTitle)["img"].length - 1;
            }
            images.get(gameTitle)["indexNext"] -= 1;
            if (images.get(gameTitle)["indexNext"] < 0){
                images.get(gameTitle)["indexNext"] = images.get(gameTitle)["img"].length - 1;
            }

            // Set first enlargeable of the clicked section
            enlargeables[0].src = images.get(gameTitle)["img"][images.get(gameTitle)["indexPrevious"]];
        }
    }
}

const onScrollNext = (element) => {
    return (mReturn) =>{
        // not the cleanest way to access game title (map.get(title)), but will do
        let gameTitle = element.parentElement.parentElement.getElementsByClassName("title")[0].innerHTML;

        // images refers to the specific page's JavaScript's images map
        if (images.has(gameTitle)){
            let enlargeables = element.parentElement.getElementsByClassName("enlargeable");

            for (let i = 0; i < enlargeables.length - 1; i++){
                enlargeables[i].src = enlargeables[i + 1].src;
            }

            images.get(gameTitle)["indexNext"] += 1;
            if (images.get(gameTitle)["indexNext"] >= images.get(gameTitle)["img"].length){
                images.get(gameTitle)["indexNext"] = 0;
            }
            images.get(gameTitle)["indexPrevious"] += 1;
            if (images.get(gameTitle)["indexPrevious"] >= images.get(gameTitle)["img"].length){
                images.get(gameTitle)["indexPrevious"] = 0;
            }

            // set last enlargeable of the clicked section
            enlargeables[enlargeables.length - 1].src = images.get(gameTitle)["img"][images.get(gameTitle)["indexNext"]];
        }
    }
}
