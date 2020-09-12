# Snippr
## Description
Frontend for the Snippr app. Snippr allows users to take an episode of whatever podcast they choose, split it up into smaller audio clips, or "snippets", and either download those clips or add them to their library. This is a frontend React application with a Rails API backend that stores users' podcast episodes and snippets. In addition to this same-origin API, Snippr also communicates with the third party ListenNotes API in order to fetch podcasts and episodes.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TODOs
1. Move API key server-side
2. Make titles/descriptions editable in the library
3. Update password / forgot password options
4. Integrate with Oauth
5. Add advanced search capabilities
6. Show buffering status in audio bar
7. Responsive thumbnail in podcast card--how can those be fixed width and height?
8. Pagination click updates offset before nextOffset
9. NavBar, Podcast component, and Episodes Container should all be sized relative to the viewport height (VH) together. e.g. Navbar style = 10 VH, Podcast = 30 VH, and Episodes Container = 60 VH -- how to make child components size responsively?
10. AlertContainer not fading properly--either get rid of the junk or make it work
11. Handle when audio source can't load
12. Move renderStartSnipKnob and renderStopSnipKnob to their own react components -- this will allow you to attach event listeners after componentDidMount so that you can stop propagation (https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events/24421834). Can't do this now because they aren't being rendered when componentDidMount is called.
13. Move alertify to setAlert
14. Add tests
15. Allow downloading a snip from the library
