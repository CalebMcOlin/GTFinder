import { findValidNames, } from './headlessBrowser.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

console.clear();
console.log("Welcome, Thanks for giving GTFinder a try.");
menu();

/**
 * The main navigation menu for the users to use
 */
export function menu() {
    console.log('-----MENU-----');
    console.log('1) Start');
    console.log('2) How to use');
    console.log('3) Credits');
    console.log('--------------');
    const response = prompt('');

    switch (response.trim()) {
        case '1':
            console.clear();
            getInput();
            break;
        case '2':
            console.clear();
            info();
            break;
        case '3':
            console.clear();
            credits();
            break;
        default:
            console.clear();
            console.log('Sorry, that was not an option.');
            menu();
    };
}

/** 
 * Retrieve data from user and ensures all excess whitespaces are removed before.
 * If the input passes the validation it will be sent to the headlessBrowser.
 */
function getInput() {
    console.log('-------------------------START-------------------------');
    console.log('Please enter the desired template with the given blanks.');
    // Getting the input while removing proceding, trailing and mutiple white spaces
    let input = prompt('-> ').trim().replace(/\s+/g, ' ');
    console.log('-------------------------------------------------------');
    if (validateInupt(input)) {
        findValidNames(input);
    } else {
        getInput(); // Recursive loop that gets "unwounded" at the end
    };
}


/**
 * Checks in the given input passes the various checks to be a valid Xbox gamertag
 * 
 * @param {imput} input 
 * @returns if the input passes all the checks
 */
function validateInupt(input) {

    // Check if starts with a number
    let firstChar = +input.charAt(0);
    if (!isNaN(firstChar)) {
        console.clear();
        console.log('Can\'t start with a number.');
        return false;
    };

    // Check if special characters are used.
    let forbidden = RegExp(/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\.]/g);
    if (forbidden.test(input)) {
        console.clear();
        console.log('No special characters allowed.');
        return false;
    };

    // Check if exceeded length requirement 
    if (input.length > 15) {
        console.clear();
        console.log('Can\'t be longer than 15 characters.');
        return false;
    };

    // Check number of random positions (underscores)
    if ((input.split('_').length - 1) > 2) {
        console.clear();
        console.log('A max of two random characters are allowed.');
        return false;
    } else if ((input.split('_').length - 1) === 0) {
        console.log('You entered a Gamertag with no random characters');
        console.log('Checking your single Gamertag now.');
        return true;
    };
    // All checked passed
    console.log('Checking all possibilities now');
    return true;
}

/**
 * Displays the credis of the project
 */
function credits() {
    console.log('-------CREDITS-------')
    console.log('Made by: Caleb McOlin');
    console.log('E-mail : Caleb.McOlin@gmail.com');
    console.log('GitHub : https://github.com/CalebMcOlin');
    console.log('Linkin : https://www.linkedin.com/in/calebmcolin/');
    console.log('---------------------')
    console.log("(Press 'Enter' to return to the main menu)");
    prompt();
    console.clear();
    menu();
}

/**
 * Displays how to use the project
 */
function info() {
    console.log('--------------HOW TO USE--------------');
    console.log('You are allowed two random characters.');
    console.log('Place a "_" for each random charater.');
    console.log('Example:  "Hello __ed"');
    console.log('--------------------------------------');
    console.log("(Press 'Enter' to return to the main menu)");
    prompt();
    console.clear();
    menu();
}
