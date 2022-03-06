const fs = require('fs');
const Engineer = require('../lib/Engineer');
const Manager = require('../lib/Manager');

const glassesSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M21.06 11.91c0 .232-.012.432-.025.628-.503-1.725-1.315-2.131-3.413-2.688 3.438 0 3.438.847 3.438 2.06zm2.94-3.195v1.462c-.328.276-.999.447-1.001 1.418-.006 3.827-1.588 4.387-4.604 4.405-4.05 0-4.597-.927-5.273-4.148-.15-.715-.513-1.148-1.122-1.148s-.972.434-1.122 1.148c-.677 3.221-1.224 4.148-5.274 4.148-2.428-.015-3.925-.384-4.419-2.522.383.104.775.191 1.144.264.444.986 1.406 1.248 3.28 1.258 3.608.026 3.736-.754 4.297-3.416.151-.72.119-1.244-.097-1.556-.404-.587-1.585-1.028-3.51-1.028-1.99 0-3.053.229-3.627.623-.938-.092-1.859-.561-2.116-1.01 1.784-.337 3.821-.613 5.743-.613 3.24 0 3.525.934 5.701.923 2.176.011 2.465-.923 5.701-.923 2.119 0 4.397.332 6.299.715zm-2 2.859c0-1.516 0-2.574-4.299-2.574-1.925 0-3.106.441-3.511 1.028-.216.312-.248.836-.097 1.556.561 2.661.688 3.442 4.297 3.416 2.84-.017 3.61-.57 3.61-3.426zm-14-.574h-3.219v2h3.219v-2zm-4-.078v2.078c-.613-.075-2.402-.347-3.438-.776-.34-.141-.562-.473-.562-.841v-1.909c.812.828 1.891 1.026 4 1.448zm-2.078.453c0-.276-.225-.5-.501-.5-.275 0-.499.224-.499.5s.224.5.499.5c.276 0 .501-.224.501-.5z"/></svg>';
const coffeeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M13 24h-7c-1.857-3.32-3.742-8.431-4-16h15c-.255 7.504-2.188 12.781-4 16zm5.088-14c-.051.688-.115 1.355-.192 2h1.707c-.51 1.822-1.246 3.331-2.539 4.677-.283 1.173-.601 2.25-.939 3.229 3.261-2.167 5.556-6.389 5.875-9.906h-3.912zm-7.714-3.001c4.737-4.27-.98-4.044.117-6.999-3.783 3.817 1.409 3.902-.117 6.999zm-2.78.001c3.154-2.825-.664-3.102.087-5.099-2.642 2.787.95 2.859-.087 5.099z"/></svg>';
const internSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 12.875v5.068c0 2.754-5.789 4.057-9 4.057-3.052 0-9-1.392-9-4.057v-6.294l9 4.863 9-3.637zm-8.083-10.875l-12.917 5.75 12 6.5 11-4.417v7.167h2v-8.25l-12.083-6.75zm13.083 20h-4c.578-1 1-2.5 1-4h2c0 1.516.391 2.859 1 4z"/></svg>';

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

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'Stylesheet copied!'
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
    copyFile();
}

const generateTeammemberElements = memberArr => {
    let memberEls = '';
    
    for (let i = 0; i < memberArr.length; i++) {
        let specialOption, specialOptionAns, icon, position;
        
        if (memberArr[i] instanceof Manager) {
            specialOption = 'Office';
            specialOptionAns = memberArr[i].office;
            position = 'Manager';
            icon = coffeeSvg;
        } else if (memberArr[i] instanceof Engineer) {
            specialOption = 'Github';
            specialOptionAns = `<a href="https://github.com/${memberArr[i].github}">${memberArr[i].github}</a>`;
            position = 'Engineer';
            icon = glassesSvg;
        } else {
            specialOption = 'School';
            specialOptionAns = memberArr[i].school;
            position = 'Intern';
            icon = internSvg;
        }
        
        const el = `
        <div class='member-card'>
            <div class='member-card-top'>
                <h2>${memberArr[i].name}</h2>
                <h3>${icon}${position}</h3>
            </div>
            <div class='member-card-bottom'>
                <div class='member-card-bottom-wrapper'>
                    <p>ID: ${memberArr[i].id}</p>
                    <p>Email: <a href="mailto:${memberArr[i].email}">${memberArr[i].email}</a></p>
                    <p>${specialOption}: ${specialOptionAns}</p>
                </div>
            </div>
        </div>
        `

        memberEls += el;
    }

    generateHTML(memberEls);
}

module.exports = generateTeammemberElements;