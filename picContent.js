
const picFolder = './public/pic';
const fs = require('fs');

//function that return the files as a string
fs.readdir(picFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});

//function that return the files as an arrey
function getPicNames() {
    return new Promise((resolve, reject) => {
        fs.readdir(picFolder, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
            
        });
    });
}

getPicNames().then(files => console.log(files)).catch(err => console.error(err));
getPicNames().then(files => console.log(files[1])).catch(err => console.error(err));