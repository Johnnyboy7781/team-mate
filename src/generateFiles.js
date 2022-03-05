const fs = require('fs');
const Engineer = require('../lib/Engineer');
const Manager = require('../lib/Manager');

const writeFile = HTML => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', HTML, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created!'
            })
        })
    })
}

const generateHTML = memberEls => {
    const HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel='stylesheet' href='style.css' >
        <title>Teammember Review</title>
    </head>
    <body>
        
        <header>
            <h1>My Team</h1>
        </header>

        <main>
            <div class='member-container'>
                ${memberEls}
            </div>
        </main>

    </body>
    </html>
    `

    writeFile(HTML);
}

const generateTeammemberElements = memberArr => {
    let memberEls = '';
    
    for (let i = 0; i < memberArr.length; i++) {
        let specialOption, specialOptionAns, icon, position;
        
        if (memberArr[i] instanceof Manager) {
            specialOption = 'Office';
            specialOptionAns = memberArr[i].office;
            position = 'Manager'
        } else if (memberArr[i] instanceof Engineer) {
            specialOption = 'Github';
            specialOptionAns = memberArr[i].github;
            position = 'Engineer';
        } else {
            specialOption = 'School';
            specialOptionAns = memberArr[i].school;
            position = 'Intern';
        }
        
        const el = `
        <div class='member-card'>
            <div class='member-card-top'>
                <h2>${memberArr[i].name}</h2>
                <h3>${position}</h3>
            </div>
            <div class='member-card-bottom'>
                <div class='member-card-bottom-wrapper'>
                    <p>ID: ${memberArr[i].id}</p>
                    <p>Email: ${memberArr[i].email}</p>
                    <p>${specialOption}: ${specialOptionAns}</p>
                </div>
            </div>
        </div>
        `

        memberEls += el;
    }

    console.log(memberEls);

    generateHTML(memberEls);
}

module.exports = generateTeammemberElements;