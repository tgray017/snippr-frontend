import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'

export default class Home extends Component {

  render() {
    return (
      <Container className="mt-5 mb-5">
        <header className="mb-4">
          <h2>Welcome to Snippr!</h2>
        </header>
        <main className='text-body'>
          <p className="mb-0">
            Snippr allows users to take an episode of whatever podcast they choose, split it up into smaller audio clips, or "snippets", and either download those clips or add them to their library. To get started, simply click <a href="/search">search</a> in the navigation bar above and search for whatever podcast you like. Here's a quick mini tutorial:
          </p>

          <p>
            <br/>
            <video
              width='600'
              src={require('../assets/images/snippr-tutorial.mov')}
              autoPlay
              controls
            >
            </video>
          </p>

          <p>
            This project was inspired by my mom, Katie O'Toole, a professor of journalism at Penn State's College of Communications, who teaches a course in podcasting and expressed the need to send small clips of podcast episodes to her students in order to highlight the dos and don'ts of podcasting. She has a podcast herself, <a href="podcasts/af679e331dad496f8c3ee0b93c42a618">Dead Centre</a>, about the stories, people, and events that make up the rich history of Centre County, Pennsylvania. Check it out!
          </p>

          <p>
            Snippr is a frontend React application backed by a Rails API. In addition to this same-origin API, Snippr also communicates with the third party <a href="https://www.listennotes.com/api/">ListenNotes API</a> in order to fetch podcasts and episodes.
          </p>
        </main>
        <footer className='text-secondary'>
          © 2020 Thomas Gray
        </footer>
      </Container>
    )
  }
}
