import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { sessionReducer, sessionService } from 'redux-react-session'
import podcastsReducer from './reducers/podcastsReducer'
import currentAudioReducer from './reducers/currentAudioReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = {
  session: sessionReducer,
  podcasts: podcastsReducer,
  currentAudio: currentAudioReducer
}
const reducer = combineReducers(reducers)

let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

sessionService.initSessionService(store)
.then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
