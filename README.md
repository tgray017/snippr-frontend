This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## TODOs

## MVP
### Figure out what to do with the Home page
### Add instructions for install to this README
### Add instructions for registering w/ API and installing ffmpeg to this readme
### Move API key server-side


## Improve
### Make titles/descriptions editable in the library
### Responsive thumbnail in podcast card--how can those be fixed width and height?
### Pagination click updates offset before nextOffset
### NavBar, Podcast component, and Episodes Container should all be sized relative to the viewport height (VH) together. e.g. Navbar style = 10 VH, Podcast = 30 VH, and Episodes Container = 60 VH -- how to make child compents size responsively?
### AlertContainer not fading properly--either get rid of the junk or make it work
### Are all of my dispatches being handled by the store?
### Update password / forgot password options
### Remove unneccessary code
### Show buffering status
### Handle when audio source can't load
### Move renderStartSnipKnob and renderStopSnipKnob to their own react components -- this will allow you to attach event listeners after componentDidMount so that you can stop propagation (https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events/24421834). Can't do this now because they aren't being rendered when componentDidMount is called.
### Move alertify to setAlert
### Add advanced search capabilities
### Add tests
