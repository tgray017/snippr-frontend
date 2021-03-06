# Snippr
## Description
Frontend for the Snippr app. Snippr allows users to take an episode of whatever podcast they choose, split it up into smaller audio clips, or "snippets", and either download those clips or add them to their library. Snippr is a frontend React application with a [Rails API backend](https://github.com/tgray017/snippr-backend) that stores users' podcast episodes and snippets. In addition to this same-origin API, Snippr also communicates with the third party ListenNotes API in order to fetch podcasts and episodes.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
1. Register for your own ListenNotes API key by following the instructions at https://www.listennotes.com/api/. You'll need this to fetch podcasts and episodes.
2. Fork and clone this repo down to your local machine.
3. In the project directory, run `npm install` to install dependencies.
4. To start the development server, run `npm start`.

## TODOs
1. Move API calls server-side
2. Make titles/descriptions editable in the library
3. Update password / forgot password options
4. Add more options for OAuth (Twitter, Google etc...)
5. Add advanced search capabilities
6. Show buffering status in audio bar
7. Responsive thumbnail in podcast card--how can those be fixed width and height?
10. AlertContainer not fading properly--either get rid of the junk or make it work
12. Move renderStartSnipKnob and renderStopSnipKnob to their own react components -- this will allow you to attach event listeners after componentDidMount so that you can stop propagation (https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events/24421834). Can't do this now because they aren't being rendered when componentDidMount is called.
13. Move alertify to setAlert
14. Add tests
