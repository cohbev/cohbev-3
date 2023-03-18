const token = "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";
const repoOwner = "cohbev-3";
const repoName = "keprins.tech-data";
const filePath = "learnlists.json";

// Retrieve file contents
fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    headers: {
        "Authorization": `token ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        const fileContents = atob(data.content); // Decode Base64-encoded content
        console.log(fileContents);
    })
    .catch(error => console.error(error));

// Update file contents
const newFileContents = "{'file': 'updated'}";
const encodedContents = btoa(newFileContents);
const commitMessage = "Update file test";
const committerName = "Cohen Beveridge";
const committerEmail = "cohen.beveridge@hotmail.com";

fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: "PUT",
    headers: {
        "Authorization": `token ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: commitMessage,
        content: encodedContents,
        committer: {
            name: committerName,
            email: committerEmail
        }
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));


function beginLearning() {
    window.alert('Hello');

}











/*
accorgersi to notice, realize
addormentarsi to fall asleep
arrabbiarsi to get angry
allenarsi to train
alzarsi to get up
asciugarsi to dry oneself
cambiarsi to get changed
chiamarsi to be named, called
depilarsi to shave (legs, underarms etc)
dimenticarsi (di + infinitive) to forget (to)
divertirsi to enjoy oneself, have a good time / fun
farsi la barba to shave (facial hair)
farsi la doccia to have a shower
incontrarsi con to meet up with
lamentarsi to complain
laurearsi to graduate (university)
lavarsi to wash oneself
lavarsi i capelli... to wash one's hair
lavarsi i denti to brush one's teeth
mettersi to put on
mettersi a + infinitive to start + verb
perdersi to get lost
pettinarsi to comb one's hair
preoccuparsi to worry
prepararsi to get ready
ricordarsi (di + infinitive) to remember
rilassarsi to relax
riposarsi to rest
sdraiarsi to lie down
sedersi to sit down
sentirsi to feel
svegliarsi to wake up
truccarsi to put makeup on
vestirsi to get dressed
*/
