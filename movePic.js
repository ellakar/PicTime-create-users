const fs = require('fs');
const path = require('path');

// Define source and destination folders
const sourceFolder = path.resolve(__dirname, 'public', 'pic');
const destinationFolder = path.resolve(__dirname, 'public', 'sorted');


// Ensure the destination folder exists
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true });
}
// Function to move one file
function moveOnePicture() {
  // Read the source folder
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      return console.error('Error reading source folder:', err);
    }

    // Filter for image files (you can adjust the regex for specific formats if needed)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

   

    // Get the first image in the folder
    const fileToMove = imageFiles[0];
    const source = path.join(sourceFolder, fileToMove);
    const destination = path.join(destinationFolder, fileToMove);

    // Move the file
    fs.rename(source, destination, (err) => {
      if (err) {
        console.error(`Error moving file ${fileToMove}:`, err);
      } else {
        console.log(`Successfully moved file: ${fileToMove}`);
      }
    });
  });
}

// Call the function
moveOnePicture();
