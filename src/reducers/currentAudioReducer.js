export default function currentAudioReducer(state = {
  playing: false,
  snipping: false,
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

    case 'SET_AUDIO_DURATION':
      return {
        ...state,
        audioDuration: action.payload.audioDuration
      }

    case 'SET_AUDIO_CURRENT_TIME':
      return {
        ...state,
        audioCurrentTime: action.payload.audioCurrentTime
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
        snipStartTime: null,
        snipStopTime: null
      }

    case 'START_SNIPPING':
      return {
        ...state,
        snipping: true
      }

    case 'STOP_SNIPPING':
      return {
        ...state,
        snipping: false,
        snipStartTime: null,
        snipStopTime: null
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

    default:
      return state
  }
}
