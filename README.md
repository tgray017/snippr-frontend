This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## TODOs

### Responsive thumbnail in podcast card--how can those be fixed width and height?
### Pagination component doesn't always work as expected when it reaches the end of the results
### Pagination click updates offset before nextOffset
### NavBar, Podcast component, and Episodes Container should all be sized relative to the viewport height (VH) together. e.g. Navbar style = 10 VH, Podcast = 30 VH, and Episodes Container = 60 VH -- how to make child compents size responsively?
### AlertContainer not fading properly--either get rid of the junk or make it work
### Are all of my dispatches being handled by the store?
### Add instructions for registering w/ API and installing ffmpeg to this readme
### Add validations to Rails API
### Remove unneccessary code
### Alerts definitely aren't working -- look at how actions are handling errors
### Show buffering status
### Handle when audio source can't load
### Download as native file/mime type -- can get from ffmpeg with some regex. Look at http://localhost:3001/podcasts/b02b5295f894443789a4358bb9569c1f to test (download as mp4)
### Move renderStartSnipKnob and renderStopSnipKnob to their own react components -- this will allow you to attach event listeners after componentDidMount so that you can stop propagation (https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events/24421834). Can't do this now because they aren't being rendered when componentDidMount is called.
### Logo doesn't render properly when logged out
### Use bootstrap forms for logging in/signing up
### Sign up with bad password confirmation doesn't alert users
### Created new user and that left me at the signup page
