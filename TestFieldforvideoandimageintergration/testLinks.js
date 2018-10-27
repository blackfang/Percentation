
//The most vital piece of information in the entire code, the datainput will test all values input into the youtube or imgur fields, returning the appropriate value for the next steps. It will always change right before its called upon for a function.
var dataInput = 0;

// Tests if the link is a youtube link (that it contains the value of https://www.youtube.com/embed), if it doesn't contain embed it will check if it contains /watch instead, in which case it will change the link to a youtube embed link.
function testYoutube() {
    var testYoutube = document.getElementById("createVideo").value.indexOf("https://www.youtube.com/embed");
    var testYoutubeW = document.getElementById("createVideo").value.indexOf("https://www.youtube.com/watch");
    if (testYoutube == -1 && testYoutubeW == -1) {
        alert("Not a valid youtube link!");
    }
    else if(testYoutubeW != -1 && testYoutube == -1) {
        alert("valid youtube link, needs converting");
        dataInput = document.getElementById("createVideo").value;
        dataInputConvert = dataInput.substr(32);
        console.log(dataInputConvert);
        dataInput = "https://www.youtube.com/embed/"+dataInputConvert;
        console.log(dataInput);
        prepareFrame();        
}
    
    else {
        alert("valid youtube link!");
        dataInput = document.getElementById("createVideo").value;
        prepareFrame();
        console.log(dataInput)
    }
    

}
// Tests if the link is an imgur link (that it contains the value of https://i.imgur.com/)
function testImgur() {
    var testImgur = document.getElementById("createImage").value.indexOf("https://i.imgur.com/");
    if(testImgur == -1){
        alert("Not a valid imgur link!");
        
    }
    else {
        alert("valid imgur link!");
        dataInput = document.getElementById("createImage").value;
        prepareImg();
        console.log(dataInput);
    }

}
// This function just tests if there is anything written in either of the two. You can in theory input both a picture and a video at the same time, but its mostly just to test if you actually have anything written in either one of them,
//just so you don't run parts of the code unnecessarily. Can and probably will integrate it into one big function with all the youtube and imgur tests just to save space when we integrate it.
function testEither() {
    if (document.getElementById("createImage").value.length !== 0)
        {
    testImgur();
}
    if (document.getElementById("createVideo").value.length !== 0)
        {
    testYoutube();
}
    
}
// This function creates a youtube video, probably want to change the thing it appends to for real integration but for now its ok.
function prepareFrame() {
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", dataInput);
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        document.body.appendChild(ifrm);
        reinstateState();
}
//This function makes an image element with imgur elements, probably want to change the thing it appends to for real integration but for now its ok.
function prepareImg() {
        var imgFr = document.createElement("img");
        imgFr.setAttribute("src", dataInput);
        imgFr.style.width = "640px";
        imgFr.style.height = "480px";
        document.body.appendChild(imgFr);
        reinstateState();
}
//function to create all the buttons and inputs needed to interact with the code.
function createButtons() {
    document.getElementById("theWhole").removeChild(document.getElementById("createImageorVideo"));
    let createForm = document.createElement("FORM");
    createForm.setAttribute("id", "uploadForm");
    document.getElementById("theWhole").appendChild(createForm);
    
    let createInput1 = document.createElement("INPUT");
    createInput1.setAttribute("type", "text");
    createInput1.setAttribute("id", "createImage");
    createInput1.setAttribute("placeholder", "Insert imgur image link");
    document.getElementById("uploadForm").appendChild(createInput1);
    
    let createInput2 = document.createElement("INPUT");
    createInput2.setAttribute("type", "text");
    createInput2.setAttribute("id", "createVideo");
    createInput2.setAttribute("placeholder", "insert youtube link");
    document.getElementById("uploadForm").appendChild(createInput2);
    
    let createBtn = document.createElement("Button");
    createBtn.setAttribute("type", "Button");
    createBtn.setAttribute("id", "addEvent");
    
    createBtn.appendChild(document.createTextNode("Get Served"));
    document.getElementById("uploadForm").appendChild(createBtn);
    document.getElementById("addEvent").onclick = function() {testEither()};
}

//Back to the past. This will reinitialize the original state.
function reinstateState() {
    let createBtn = document.createElement("Button");
    createBtn.setAttribute("type", "Button");
    createBtn.setAttribute("id", "createImageorVideo");
    
    createBtn.appendChild(document.createTextNode("Click to Initiate"));
    document.getElementById("theWhole").appendChild(createBtn);
    document.getElementById("createImageorVideo").onclick = function() {createButtons()};
    document.getElementById("uploadForm").removeChild(document.getElementById("createImage"));
    document.getElementById("uploadForm").removeChild(document.getElementById("createVideo"));
    document.getElementById("uploadForm").removeChild(document.getElementById("addEvent"));
    
}