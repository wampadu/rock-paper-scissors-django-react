# ***Emoji Rock Paper Scissors✌️✊✋***

This is a project example of the game "Rock Paper Scissors" built with React.js & Django.

The game includes the following options:
 - Live-game play mode using websockets
 - Play against the computer

## Live Demo

Demo - Click to Play - https://emoji-rock-paper-scissors.herokuapp.com

<img width="920" alt="image" src="https://user-images.githubusercontent.com/50532644/206914648-6fb23abb-b64a-42fd-975b-41d0b845e770.png">

<img width="920" alt="image" src="https://user-images.githubusercontent.com/50532644/206914716-1789ce9d-34d8-40bf-b9e9-90c53cc537e9.png">

<img width="953" alt="image" src="https://user-images.githubusercontent.com/50532644/206915147-5dd1044a-6ee2-4a63-ba5b-81df203fc989.png">


## How to run this project

Clone this repo and install it on your local machince

In the root folder, open your command line terminal. 
Follow the following command 

**Frontend**
To get this project up and running start by having Node.Js installed on your computer and terminal opened at the projects root directory. Then go to the frontend folder with 

`cd frontend`

Install the project node modules and frontend project dependencies with

2. `npm install`

Now you can run the project's frontend with the following command

3. `npm start`

Open [http://localhost:3000](http://localhost:3000) 

**Backend**
Go back to the project root directory.

`cd backend`

Make sure you have Python installed on your computer. It's advised you create a virtual environment to store your projects dependencies separately. You can install virtualenv with

```
pip install virtualenv
```

Run the following command in the base directory of this project

```
virtualenv venv
```

That will create a new folder `venv` in your project directory. Next activate it with this command on mac/linux:

```
source env/bin/active
```

Then install the project dependencies with

```
pip install -r requirements.txt
```

Now you can run the backend with this command

```
python manage.py runserver
```

After the backend and frontend have been set up. You can open the project at [http://localhost:3000](http://localhost:3000) and play the game as normal.


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
