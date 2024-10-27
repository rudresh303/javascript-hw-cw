var toggled = false; 

var headT = document.getElementsByTagName("h1")[0];
var bTag = document.getElementsByTagName("body")[0];
var circleT = document.getElementById("circleT");

document.getElementById("toggle").onclick = function () {
        
    if(!toggled) {
        headT.classList.add("color-white");
        bTag.classList.add("bck-color-black");
        circleT.classList.add("dark-mode")

        toggled = true;
    } else {
        headT.classList.remove("color-white");
        bTag.classList.remove("bck-color-black");
        circleT.classList.remove("dark-mode")

        toggled = false;
    }
    
}