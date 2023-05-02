const defaultWidthImg = "32px";
const sizeUpImg = "48px";
const defaultSizeFont = "20px"; // FontSize from Base_CSS;
const sizeUpFont = "32px";

addEventListener("load", setImgEvents);
function setImgEvents(){
    var logo = document.getElementsByClassName("image");
    for (var i = 0; i < logo.length; i++){
        logo[i].addEventListener('mouseenter', onHoverSizeUp(logo[i]), false);
        logo[i].addEventListener('mouseleave', onHoverSizeDown(logo[i]), false);
    }
}

const onHoverSizeUp = (logo) => {
    return (mReturn) => {
    logo.querySelector("a img").style.width = sizeUpImg;
    logo.style.fontSize = sizeUpFont;
  }
}

const onHoverSizeDown = (logo) => {
    return (mReturn) => {
        logo.querySelector("a img").style.width = defaultWidthImg;
        logo.style.fontSize = defaultSizeFont;
    }
}

let fullName;
let errFullName;
let fullEmail;
let errFullEmail;
let textAreaZone;
let errTextAreaZone;
addEventListener("load", setDataRefs);
function setDataRefs(){
    fullName = document.getElementById("fullName");
    errFullName = document.getElementById("errFullName");
    // set saved data
    let name = sessionStorage.getItem("lastName");
    fullName.value = (name !== "")? name: "";

    fullEmail = document.getElementById("fullEmail");
    errFullEmail = document.getElementById("errFullEmail");
    // set saved data
    let email = sessionStorage.getItem("lastEmail");
    fullEmail.value = (email !== "")? email: "";

    textAreaZone = document.getElementById("message");
    errTextAreaZone = document.getElementById("errMessage");


    document.querySelector("body").addEventListener("mousedown", () => {clearInputcues()});

    fullName.addEventListener("mouseup", () => {onInputClickVisualCue(fullName)});
    fullEmail.addEventListener("mouseup", () => {onInputClickVisualCue(fullEmail)});
    textAreaZone.addEventListener("mouseup", () => {onInputClickVisualCue(textAreaZone)});

}
function clearInputcues(){
    fullName.style.backgroundColor = "white";
    fullEmail.style.backgroundColor = "white";
    textAreaZone.style.backgroundColor = "white";
}

function onInputClickVisualCue(element){
    clearInputcues();
    element.style.backgroundColor = "#dddeef";
}

const regexName = /\d/gi; // check for any non-alpha
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexSpecialChar = /[!@#$%^&*()=,/';`~]/g;
function onClickValidateForm(event){
    // Note: Browser does not like sessionStorage.setItem("foo", var.Value)
    // ... It becomes undefined uppon reload, but it does not change with String cast

    let sendEmail = true;
    // Check: Name
    if (fullName.value === "" || String(fullName.value).match(regexName) !== null || String(fullName.value).match(regexSpecialChar) !== null){
        errFullName.style.visibility = "visible";
        sendEmail = false;
    }
    else{
        errFullName.style.visibility = "hidden";
    }

    // Check: Email
    if (!regexEmail.test(fullEmail.value)){
        errFullEmail.style.visibility = "visible";
        sendEmail = false;
    }
    else{
        errFullEmail.style.visibility = "hidden";
    }

    // Check: Message
    if (textAreaZone.value.length === 0){
        errTextAreaZone.style.visibility = "visible";
        sendEmail = false;
    }
    else{
        errTextAreaZone.style.visibility = "hidden";
    }

    if (!sendEmail){
        // Prevent sending email if everything is filled, but there are errors
        event.preventDefault(); 
    }
    else{
        // Set infos in session storage
        sessionStorage.setItem("lastName", String(fullName.value));
        sessionStorage.setItem("lastEmail", String(fullEmail.value));
        sessionStorage.setItem("message", String(textAreaZone.value));

        // Print
        alert("Le bouton d'envoi à été cliqué\n\n" +
                "Voici les éléments sauvegardés:\n" +
                "=========================\n" +
                "Nom complet: " + sessionStorage.getItem("lastName")+ "\n" +
                "Email (cci): " + sessionStorage.getItem("lastEmail")+ "\n" +
                "Message:\n" + sessionStorage.getItem("message")+ "\n\n" +
                "N'oubliez pas de fermer la tabulation pour effacer les données sauvegardés.");

        window.open('mailto:' + 'sebastien.levesque.slev@gmail.com' + 
                    '?bcc=' + sessionStorage.getItem("lastEmail") + 
                    '&subject=' + 'Hi from ' + sessionStorage.getItem("lastName") + 
                    '&body=' + sessionStorage.getItem("message"));
    }
}