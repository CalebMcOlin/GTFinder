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