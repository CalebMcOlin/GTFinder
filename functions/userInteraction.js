import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

export function menu() {
    console.log();
    console.log('-----MENU-----');
    console.log('1) Start');
    console.log('2) How to use');
    console.log('3) Credits');
    console.log('--------------');
    const response = prompt('');

    switch (response.trim()) {
        case '1':
            getUserInput();
            break;
        case '2':
            info();
            break;
        case '3':
            credits();
            break;
        default:
            console.log('Sorry, that was not an option.');
            menu();
    }
}

/** 
 * Retrieves, validates and returns the users input.
 * 
 * @returns the users imput
 */
function getUserInput() {
    console.log('-------------------------START-------------------------');
    console.log('Please enter the desired template with the given blanks.');
    
    // Getting the input while removing proceding, trailing and mutiple white spaces
    let input = prompt('-> ').trim().replace(/\s+/g, ' ');
    console.log('-------------------------------------------------------');

    // Check if starts with a number
    let first = input.charAt(0);
    if (typeof (first) === 'number') {
        console.log('Can\'t start with a number.');
        getUserInput();
    };

    // Check if special characters are used.
    let forbidden = RegExp(/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\.]/g);
    if (forbidden.test(input)) {
        console.log('No special characters allowed.');
        getUserInput();
    };

    // Check if exceeded length requirement 
    if (input.length > 15) {
        console.log('Can\'t be longer than 15 characters.');
        getUserInput();
    };

    // Check number of random positions (underscores)
    if ((input.split('_').length - 1) > 2) {
        console.log('A max of two random characters are allowed.');
        getUserInput();
    } else if ((input.split('_').length - 1) === 0) {
        console.log('You entered a Gamertag with no random characters');
        console.log('Checking your single Gamertag now.');
    };

    //Passes all the checks
    return input;
}

function credits() {
    console.log('-------CREDITS-------')
    console.log('Made by Caleb McOlin');
    console.log('---------------------')
    console.log("(Press 'Enter' to return to the main menu)");
    prompt();
    menu();
}

function info() {
    console.log('--------------HOW TO USE--------------');
    console.log('You are allowed two random characters.');
    console.log('Place a "_" for each random charater.');
    console.log('Example:');
    console.log('Typing "H_a_ion" will cycle through every option that starts with "H", had "a" in the middle and ends with "ion"');
    console.log('--------------------------------------');
    console.log("(Press 'Enter' to return to the main menu)");
    prompt();
    menu();
}
