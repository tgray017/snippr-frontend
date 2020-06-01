export default function currentAudioReducer(state = {
  snipping: false,
  showGeneratePreview: false,
  audioDuration: 0,
  audioCurrentTime: 0,
  snipStartTime: 0
}, action) {
  switch (action.type) {
    case 'SET_AUDIO':
      return {
        ...state,
        audioId: action.payload.audioId,
        audioUrl: action.payload.audioUrl
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

    case 'STOP_SNIPPING':
      return {
        ...state,
        snipping: false,
        endTime: action.payload.endTime,
        showGeneratePreview: true
      }

    default:
      return state
  }
}
