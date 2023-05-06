var toggle = document.getElementById('container');
var ff = document.getElementById('ff');

toggle.onclick = function (){
    if(toggle.classList.toggle("active")){
        document.getElementById("ff").style.display = "block";
        document.getElementById("aa").style.display = "none";
    }
    else{
        document.getElementById("aa").style.display = "block";
        document.getElementById("ff").style.display = "none";
    }

}
