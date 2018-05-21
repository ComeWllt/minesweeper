# Minesweeper

This is a minesweeper game, generated with [Create React App](https://github.com/facebook/create-react-app).

## Demo

A built [Demo](https://minesweeper-react-game.herokuapp.com) version is hosted on Heroku.

## Modules

Run `npm install` from the app directory to install modules.

## Development mode

Run `npm start` to get the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Architecture

Everything happens in the folder `src`.
- `App.js` is the root main Component, handling the board state.
- The folder `components` holds the components called by `App.js`.
- The sub-folder `TopHeaderComponents` holds the components called by `TopHeader.js`. 
- The folder `functions` holds the function `createBoard.js` to create a board, and the function `expandClickedArea` to reveal an area when the player clicks on an empty square. Both functions are called in `App.js`
- The folder `config` holds the levels settings.

## Performance

I used **PureComponents** and **shouldComponentUpdate** in order to optimize performance, in particular by preventing unnecessary updates of every square

## UI

The app uses [Semantic UI React](https://react.semantic-ui.com)
