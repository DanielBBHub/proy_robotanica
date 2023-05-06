var toggle = document.getElementById('container');
var res = document.getElementById('res');
var ini = document.getElementById('ini');

toggle.onclick = function (){
    ini.classList.toggle("active");
    res.classList.toggle("active");
    if(toggle.classList.toggle("active")){
        document.getElementById("ff").style.display = "block";
        document.getElementById("aa").style.display = "none";
    }
    else{
        document.getElementById("aa").style.display = "block";
        document.getElementById("ff").style.display = "none";
    }

}
