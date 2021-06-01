# WHAT IS THIS?
A simple program that will launch a windowless browser, navigate to www.gamertagavailability.com/ and check if certain names are available. It will then print the found names in a new .txt file within the same directory.

**GTFinder_4Letters.js**

Will cycle through every 4-letter word combination possible (26^4 = 456,976 different words). This is currently running on a single thread; therefore, this takes quite some time to complete.

**GTFinder_2LettersPlus.js**

This only cycles through 2 letters but allows the additional hard coded string to be placed in the search query. (24^2 = 576 different words). 
EXAMPLE: 
To search for a word that ends with ”ion”. You can enter in it to the search query and the results will be every 5-letter word that end with “ion”. _You can also have the additional hard coded string in the beginning or middle of the word._ 


# HOW TO USE
- Clone the Repo
- Open in VS Code or locate directory in the Terminal
- Run `npm install`
- ...
- ...coming soon


## DISCLAIMER:
This app is not affiliated with Microsoft, www.gamertagavailability.com or any of their partners. 
