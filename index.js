window.onload = function() {
    let userData = {};

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if (accessToken) {
        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
            .then(result => result.json())
            .then(response => {
                const {username, discriminator, avatar, id, email} = response;
                const avatar_url = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;

                document.cookie = `username=${username}; expires=Fri, 31 Dec 9999 23:59:59 UTC`;
                document.cookie = `discriminator=${discriminator}; expires=Fri, 31 Dec 9999 23:59:59 UTC`;
                document.cookie = `id=${id}; expires=Fri, 31 Dec 9999 23:59:59 UTC`;
                document.cookie = `email=${email}; expires=Fri, 31 Dec 9999 23:59:59 UTC`;
                document.cookie = `avatar_url=${avatar_url}; expires=Fri, 31 Dec 9999 23:59:59 UTC`;
            })
            .catch(console.error);
    }

    if (document.cookie) {
        console.log('cookies found');
        const allCookies = document.cookie;
        const cookieArray = allCookies.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const key = cookieArray[i].split('=')[0];
            const value = cookieArray[i].split('=')[1];
            console.log(`Key:${key}    Value:${value}`)
            userData[key] = value;
        }
        console.log(userData);
    }

    if (userData) {
        const login_status = document.getElementById('login-status');
        login_status.removeChild(login_status.firstElementChild);

        let avatar_container = document.createElement('img');
        avatar_container.src = userData['avatar_url'];
        login_status.appendChild(avatar_container);

        let username_container = document.createElement("a");
        username_container.innerText = userData['username'];
        username_container.href = "./profile.html";
        login_status.appendChild(username_container);
    }

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
    window.location.replace('https://discord.com/api/oauth2/authorize?client_id=1087881200112246886&redirect_uri=https%3A%2F%2Fkeprins.tech&response_type=token&scope=identify%20email%20guilds')
}