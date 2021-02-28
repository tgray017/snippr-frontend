export default function currentAudioReducer(state = {
  playing: false,
  showing: false,
  expanded: true,
  snipping: false,
  snipStatus: 'NOT_STARTED',
  loading: false,
  snipStartTime: null,
  snipStopTime: null
}, action) {
  switch (action.type) {
    case 'SET_AUDIO':
      return {
        ...state,
        audioId: action.payload.audioId,
        audioUrl: action.payload.audioUrl,
        audioLength: action.payload.audioLength,
        title: action.payload.title,
        description: action.payload.description,
        audioType: action.payload.audioType,
        startTime: action.payload.startTime,
        stopTime: action.payload.stopTime,
        podcastName: action.payload.podcastName,
        podcastId: action.payload.podcastId
      }

    case 'SET_SNIP_START_TIME':
      return {
        ...state,
        snipStartTime: action.payload.snipStartTime
      }

    case 'SET_SNIP_STOP_TIME':
      return {
        ...state,
        snipStopTime: action.payload.snipStopTime
      }

    case 'DISCARD_SNIP':
      return {
        ...state,
        snipping: false,
        snipStatus: 'NOT_STARTED',
        snipStartTime: null,
        snipStopTime: null
      }

    case 'START_SNIPPING':
      return {
        ...state,
        snipping: true,
        snipStatus: 'START_TIME_SET'
      }

    case 'STOP_SNIPPING':
      return {
        ...state,
        snipping: true,
        snipStatus: 'STOP_TIME_SET'
      }

    case 'SHOW_AUDIO_CONTAINER':
      return {
        ...state,
        showing: true
      }

    case 'PLAY':
      return {
        ...state,
        playing: true
      }

    case 'PAUSE':
      return {
        ...state,
        playing: false
      }

    case 'EXPAND':
      return {
        ...state,
        expanded: true
      }

    case 'COLLAPSE':
      return {
        ...state,
        expanded: false
      }

    case 'UPDATE_AUDIO_DURATION':
      return {
        ...state,
        audioLength: action.payload.audioLength
      }

    case 'START_LOADING':
      return {
        ...state,
        loading: true
      }

    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
