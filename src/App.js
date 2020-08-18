import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import SignUpContainer from './containers/SignUpContainer'
import LogInContainer from './containers/LogInContainer'
import LogOutContainer from './containers/LogOutContainer'
import SearchContainer from './containers/SearchContainer'
import AlertContainer from './containers/AlertContainer'
import SearchPodcastsContainer from './containers/SearchPodcastsContainer'
import PodcastContainer from './containers/PodcastContainer'
import LibraryContainer from './containers/LibraryContainer'
import Home from './components/Home'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <AlertContainer />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LogInContainer} />
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/logout" component={LogOutContainer} />
          <Route exact path="/search" component={SearchPodcastsContainer} />
          <Route exact path="/library" component={LibraryContainer} />
          <Route path="/podcasts/:podcastId" component={PodcastContainer} />
        </div>
      </Router>
    )
  }
}

export default App
