/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: 'Enter a URL',
      name: 'URL',
    },
  ])
  /**
 * Generates a QR code image from a given URL and saves it to a file.
 * Also writes the URL to a text file.
 *
 * @param {Object} answers - An object containing user-provided answers.
 * @param {string} answers.URL - The URL to be converted into a QR code.
 */
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));  

    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
        console.log('Something went wrong');
    }
  });

  
 



