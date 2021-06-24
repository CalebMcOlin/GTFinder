# WHAT IS THIS?
A Node.js terminal based application that automates the process of searching for an Xbox Gamertag.
The app will launch a windowless browser, navigate to www.gamertagavailability.com/ and check if certain names are available. It will then scrape the webpage and write the available names in a .txt file within a custom directory. Once all the searches are done, the user can view these .txts to find the name they like the most.

# HOW TO USE
- Have Node.js installed
- Open Terminal (Bash/Powershell/Command Prompt)
- Clone Repo `git clone https://github.com/CalebMcOlin/GTFinder.git`
- Navigate to directory `cd GTFinder`
- Install modules `npm install`
- Run application `npm start`
- Follow the instructios displayed in the Terminal
- Press 'Ctrl + C' to exit the app at any time.

## PACKAGES USED
- [fs](https://nodejs.org/api/fs.html)
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [prompt-sync](https://www.npmjs.com/package/prompt-sync)

## DISCLAIMER
This app is not affiliated with Microsoft, www.gamertagavailability.com or any of their partners. 
