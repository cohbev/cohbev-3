window.onload = function() {
    const serverCountElement = document.getElementById('server-count-number');
    const serverCount = '100';
    serverCountElement.textContent = serverCount;

    const totalUsersElement = document.getElementById('total-users-number');
    const totalUsers = '200';
    totalUsersElement.textContent = totalUsers;
}


function addKeprinsToServer() {
    window.open('https://discord.com/api/oauth2/authorize?client_id=890512432135557141&permissions=1495655513187&scope=applications.commands%20bot', '_blank').focus();
}

function joinOfficialServer() {
    window.open('https://discord.gg/qFqGMwkEZT', '_blank').focus();
}

function login() {
    window.location.replace('https://discord.com/api/oauth2/authorize?client_id=1087881200112246886&redirect_uri=http%3A%2F%2Fkeprins.tech%2Fauth&response_type=code&scope=identify')
}