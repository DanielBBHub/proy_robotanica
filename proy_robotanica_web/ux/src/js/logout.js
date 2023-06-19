const logout = () => {
    
    window.location.replace("./index.html")
}

const volverperfil = () => {
    const queryString = window.location.search;
    console.log(queryString);
    var dni = queryString.split("?")
    dni = dni[1].split("=")[1]
    console.log(dni)
    window.location.replace("./perfil.html?dni=" + dni);}
   
try
{
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logout);
}
catch(TypeError){
    const volverperfilbtn = document.getElementById('volverPerfilbtn');
    volverperfilbtn.addEventListener('click', volverperfil);
}

