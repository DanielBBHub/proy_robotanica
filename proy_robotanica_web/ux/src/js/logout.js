const logout = () => {

    window.location.replace('index.html');
}

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);