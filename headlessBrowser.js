import puppeteer from 'puppeteer';
import { appendFileSync } from 'fs';
import { menu } from './main.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

const letterArray = [' ', '', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

/**
 * Find all possible Gamertag options given the input by the user
 * 
 * @param {input} input 
 */
export function findValidNames(input) {
  let replaceNum = input.split('_').length - 1; // Getting number of characters to replace
  let nameSet = new Set(); // Set that holds all valid options for the name
  let firstChange; // What the input is after the first underscore is changed
  let secondChange; // What the input is after the second underscore is changed

  // Zero chatacters to replace
  if (replaceNum === 0) {
    nameSet.add(input);
  }
  // Replacing 1 or 2 characters
  else {
    for (let i in letterArray) {
      firstChange = input.replace('_', letterArray[i].trim());
      for (let k in letterArray) {
        secondChange = firstChange.replace('_', letterArray[k]).trim();
        // Ensureing the first letter is not a number
        let firstChar = +secondChange.charAt(0);
        if (isNaN(firstChar)) {
          nameSet.add(secondChange);
        };
      };
    };
  };
  findAvalibleNames(nameSet, input);
};

/**
 * 
 * @param {nameSet} nameSet 
 */
async function findAvalibleNames(nameSet, input) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.gamertagavailability.com/');

  appendFileSync(`AvailableNames-${input}.txt`, "These are a list of names that seem to be available... \n");

  let counter = 0;
  let nameAmount = nameSet.size;
  for (let name of nameSet) {
    // Entering a text into the textbox on the web page
    await page.type('#mytag', name);

    // Clicking the button that will lead to the next page
    await Promise.all([
      page.waitForNavigation(),
      page.click('#doitnow')
    ]);

    // Checking if the "yres" id is on the new page
    const yes = await page.$x('//*[@id="yres"]');
    if (yes.length > 0) {
      appendFileSync(`AvailableNames-${input}.txt`, name + "\n");
    };

    // Returning to the main page
    await Promise.all([
      page.waitForNavigation(),
      page.goto('https://www.gamertagavailability.com/')
    ]);
    counter++;
    process.stdout.write(`\r[${counter} of ${nameAmount}]`);
  };
  await browser.close();
  console.log(`\nChecked all ${counter} name(s).`)
  console.log(`Please open the "AvailableName-${input}.txt" for your options.`);
  console.log("(Press 'Enter' to return to the main menu)");
  prompt();
  console.clear();
  menu();
};
