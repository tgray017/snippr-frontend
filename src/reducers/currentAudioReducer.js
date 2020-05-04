export default function currentAudioReducer(state = {
  snipping: false,
  showGeneratePreview: false
}, action) {
  switch (action.type) {
    case 'SET_AUDIO':
      return {
        ...state,
        audioUrl: action.payload.audioUrl,
        snipping: false,
        startTime: null,
        endTime: null,
        showGeneratePreview: false
      }

    case 'START_SNIPPING':
      return {
        ...state,
        snipping: true,
        startTime: action.payload.startTime
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
