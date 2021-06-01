import { launch } from 'puppeteer';
import { appendFileSync } from 'fs';

const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

(async () => {
    // Creating the brower
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto('https://www.gamertagavailability.com/');

    var counter = 0;
    // Loop that cycles through every single letter compination of every 4 letter word (26^4 = 456,976 options)
    for (var i = 0; i < 26; i++) {
        for (var j = 0; j < 26; j++) {
            for (var k = 0; k < 26; k++) {
                for (var l = 0; l < 26; l++) {
                    counter++;
                    // Entering a text into the textbox on the web page
                    await page.type('#mytag', array[i] + array[j] + array[k] + array[l]);

                    // Clicking the button that will lead to the next page
                    await Promise.all([
                        page.waitForNavigation(),
                        page.click('#doitnow')
                    ]);

                    // Checking certain IDs are on the new page.
                    // This says if the name is available or not.
                    const yes = await page.$x('//*[@id="yres"]');
                    if (yes == undefined) {
                        // Nothing
                    } else {
                        const no = await page.$x('//*[@id="nres"]');
                        if (no === undefined) {
                            appendFileSync('PossibleNames.txt', array[i] + array[j] + array[k] + array[l] + "\n");
                        } else {
                            console.log('Error');
                        }
                    };

                    //returning to the main page
                    await Promise.all([
                        page.waitForNavigation(),
                        page.goto('https://www.gamertagavailability.com/')
                    ]);
                }
            }
        }
    }
    appendFilesSync('Tried: ' + counter + 'Words');
    await browser.close();
})();