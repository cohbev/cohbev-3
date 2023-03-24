window.onload = function() {
    let userData = {};

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if (accessToken) {
        document.cookie = `tokenType=${tokenType}; expires=Fri, 31 Dec 9999 23:59:59 UTC`;
        document.cookie = `accessToken=${accessToken}; expires=Fri, 31 Dec 9999 23:59:59 UTC`;
        console.log('accessToken and tokenType loaded from URL parameters and assigned to cookies');
    } else {
        if (document.cookie) {
            console.log(`Cookies: ${document.cookie}`);
            const allCookies = document.cookie;
            const cookieArray = allCookies.split('; ');
            for (let i = 0; i < cookieArray.length; i++) {
                const key = cookieArray[i].split('=')[0];
                const value = cookieArray[i].split('=')[1];
                console.log(`Key:${key}    Value:${value}`)
                userData[key] = value;
            }
            accessToken = userData['accessToken'];
            tokenType = userData['tokenType'];

            console.log('accessToken and tokenType loaded from cookies');
        } else {
            console.log('No login cookies or parameters found');
        }
    }
    console.log(`accessToken: ${accessToken}`);
    console.log(`tokenType: ${tokenType}`);
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
        .then(result => result.json())
        .then(response => {
            const {username, avatar, id} = response;
            const avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
            console.log(`Response from Discord: ${response}`);
            console.log(`username=${username}`);
            console.log(`avatarURL=${avatarURL}`);

            const login_status = document.getElementById('login-statues');
            login_status.removeChild(login_status.firstElementChild);
            let avatar_link_element = document.createElement('a');
            avatar_link_element.innerText = username;
            avatar_link_element.href = "./profile.html";
            let avatar_element = document.createElement('img');
            avatar_element.src = avatarURL;
            avatar_link_element.appendChild(avatar_element);
            login_status.appendChild(avatar_link_element);
        })
        .catch(console.error);

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