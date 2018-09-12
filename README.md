************************
README
By: Brandon Gordon
************************

*************************
INSTALLATION - Webclient
*************************
For the webclient, we must have npm installed since this is a REACT application.
**If using Visual Studio, you can skip to "Visual Studio" section**

1. Once you have cloned the repo, open a command prompt in the \FancyCars-Webclient Directory: 
(ie. C:\Users\bgordon\....\FancyCars-Weclient>)
2. On the command line, type: npm install
--> All the necessary packages/npm should be installed
**Before moving onto step 3, read 'CONFIGURATION - Webclient' section**
3. If successful, run: npm start

***Visual Studio***
1. If your Task Runner Explorer detects the package.json in the Webclient Project, double-click npm install.
--> All the necessary packages/npm should be installed
**Before moving onto step 2, read 'CONFIGURATION - Webclient' section**
2. If successful, double-click npm start
--> Webclient should start on http://localhost:3000

**************************
CONFIGURATION - Webclient
**************************
**Note: Since the API call will be on the local network, there needs to be a manual config in the source code**
1. Open command prompt and type "ipconfig" and copy the IPv4 Address (ie. 10.201.49.24)
2. In FancyCars-Webclient/src/api/databaseConstants.ts, please paste those digits into the URL strings after the http:// and before the :8000 
--> ie. 'http://XX.XXX.XX.XXX:8000/fancycars/cars' ; X's representing your your local IPaddress

-------------------------------------------------------------------------------------------------------------------------------------------

**************************
INSTALLATION - DJANGO API
**************************
For the api, we will be setting up Python, the Environment, and Django.

For Python portion: http://timmyreilly.azurewebsites.net/python-pip-virtualenv-installation-on-windows/
**All the command line steps are done with WINDOWS command prompt**

1. Install Python 3.6: https://www.python.org/downloads/release/python-360/
2. Setup the environment variables accordingly. Essentially, we want to add Python36\ and Python36\Scripts into the PATH/Path environment variables.
3. Install pip. Pip should be installed automatically and functional after python 3.6 is installed and step 2 is completed. Test by typing in 'pip help'.
4. Install virtualenv. Type on the command line of command prompt (if windows): pip install virtualenv
5. Install virtualenvwrapper-win. On the command line of command prompt: pip install virtualenvwrapper-win 
--> This will allow us to access the environment

Initializing API Package.json
**If using Visual Studio, you can skip to "Visual Studio" section**
1. Using the command prompt, type on the command line: "npm install"
--> If there are issues with the package.json, type on the command line: "npm init". You will be prompted with several lines. Continue to press "Enter" on your keyboard until you are back to the command line prompt
2. If successful, type on the command line: "npm start"
--> API should be running now

**Visual Studio***
1. If the FancyCars-API is available in the Task Runner Explorer, double-click on "install"
--> The environemnt and dependencies will be created/installed
2. If successfully installed, double-click on "start"
--> The API should be running on 


**********************
CONFIGURATION - API
**********************
**Note: Since the API call will be on the local network, there needs to be a manual config in the source code**
1. Open command prompt and type "ipconfig" and copy the IPv4 Address (ie. 10.201.49.24)
2. In FancyCars-API/package.json, edit the "scripts": { "start": } value. Replace the IPaddress with your current one
--> ie. "start:" "workon Dev-Env && python manage.py runserver XX.XXX.XX.XX:8000"; X's representing your local IPaddress
