import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBarContainer from './containers/shared/NavBarContainer'
import AlertContainer from './containers/shared/AlertContainer'
import SignUpContainer from './containers/user/SignUpContainer'
import LogInContainer from './containers/user/LogInContainer'
import LogOutContainer from './containers/user/LogOutContainer'
import SearchPodcastsContainer from './containers/search/SearchPodcastsContainer'
import PodcastContainer from './containers/search/PodcastContainer'
import LibraryContainer from './containers/library/LibraryContainer'
import AudioContainer from './containers/audio/AudioContainer'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div id="snippr-container">
          <div id="snippr-body">
            <NavBarContainer />
            <AlertContainer />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LogInContainer} />
            <Route exact path="/signup" component={SignUpContainer} />
            <Route exact path="/logout" component={LogOutContainer} />
            <Route exact path="/search" component={SearchPodcastsContainer} />
            <Route exact path="/library" component={LibraryContainer} />
            <Route path="/podcasts/:podcastId" component={PodcastContainer} />
          </div>
          <div id="snippr-audio">
            <AudioContainer />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
