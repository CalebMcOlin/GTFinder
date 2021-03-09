const puppeteer = require('puppeteer');
const fs = require('fs');

const array = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

(async () => {
    // Creating the brower
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.gamertagavailability.com/');
  
    var counter = 0;
    // Loop that cycles through every single letter combination of 4-5 letter words that end with "tek"
    for(var i = 0; i < 27; i++){
        for(var j = 1; j < 27; j++){// doesn't include the empty space (array[0]) in the second spot
            
            // Entering a text into the textbox on the web page
            await page.type('#mytag', array[i]+array[j]) + 'xxx';

            // Clicking the button that will lead to the next page
            await Promise.all([
                page.waitForNavigation(),
                page.click('#doitnow')
            ]);

            // Checking certain IDs are on the new page.
            // This says if the name is available or not.
            const [yes] = await page.$x('//*[@id="yres"]');
            if(yes == undefined){
                // Nothing
            }else{
                const [no] = await page.$x('//*[@id="nres"]'); 
                if(no === undefined){
                    fs.appendFileSync('NamesEndWithXxx.txt', + array[i]+array[j] + 'xxx');
                }else{
                    console.log('Error');
                }
            }
            
            // Tracking the progress
            counter++;
            if(array[j] == 'z'){
                console.log('Starting: '+ array[i+1] + 's');
            }

            //returning to the main page
            await Promise.all([
                page.waitForNavigation(),
                page.goto('https://www.gamertagavailability.com/')
            ]);
        }  
    }
    fs.appendFileSync('NamesBegin-lay.txt', 'Tried: ' + counter + 'Words');
    await browser.close();
})();