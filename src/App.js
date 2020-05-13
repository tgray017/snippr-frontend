import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import SignUpContainer from './containers/SignUpContainer'
import LogInContainer from './containers/LogInContainer'
import LogOutContainer from './containers/LogOutContainer'
import SearchContainer from './containers/SearchContainer'
import SearchPodcastsContainer from './containers/SearchPodcastsContainer'
import Home from './components/Home'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'


/* ElasticSearch Dependencies */
/*
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-hx861apmhfiqm5s44vqbgykc",
  engineName: "snippr",
  hostIdentifier: "localhost:3002"
});

const configurationOptions = {
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      // 1. Search by name of video game.
      name: {}
    },
    // 2. Results: name of the video game, its genre, publisher, scores, and platform.
    result_fields: {
      name: {
        // A snippet means that matching search terms will be highlighted via <em> tags.
        snippet: {
          size: 75, // Limit the snippet to 75 characters.
          fallback: true // Fallback to a "raw" result.
        }
      },
      genre: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      publisher: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      critic_score: {
        // Scores are numeric, so we won't attempt to snippet these, we'll just use the raw
        // value.
        raw: {}
      },
      user_score: {
        raw: {}
      },
      platform: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      image_url: {
        raw: {}
      }
    }
  }
};

*/

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LogInContainer} />
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/logout" component={LogOutContainer} />
          <Route exact path="/search" component={SearchPodcastsContainer} />
        </div>
      </Router>
    )
  }
}

export default App
