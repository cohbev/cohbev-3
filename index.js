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

            const login_status = document.getElementById('login-status');
            login_status.href = './profile.html';
            login_status.removeAttribute('onclick');
            login_status.innerText = '';
            let username_element = document.createElement('a');
            username_element.innerText = username;
            let avatar_element = document.createElement('img');
            avatar_element.src = avatarURL;
            login_status.appendChild(avatar_element);
            login_status.appendChild(username_element);
        })
        .catch(console.error);

    void setGuildCount();
    void setUserCount();
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

async function setGuildCount() {
    const guildCountElement = document.getElementById('guild-count-number');
    const url = 'https://raw.githubusercontent.com/cohbev/keprins-file-storage/main/servers.txt';
    const response = await fetch(url);
    const data = await response.text();
    const guildCount = data.split(/\r\n|\r|\n/).length
    console.log(`guildCount=${guildCount}`)
    guildCountElement.textContent = guildCount.toString();
}

async function setUserCount() {
    const userCountElement = document.getElementById('user-count-number');
    const url = 'https://raw.githubusercontent.com/cohbev/keprins-file-storage/main/points.txt';
    const response = await fetch(url);
    const data = await response.text();
    const lines = data.split(/\r\n|\r|\n/);
    let activeUsers = 0;
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].split('::')[1].startsWith('0:0:0:0:0:0:0')) {
            activeUsers++;
        }
    }
    userCountElement.textContent = activeUsers.toString();
}