export default function currentAudioReducer(state = {
  snipping: false,
  showGeneratePreview: false,
  audioDuration: 0,
  audioCurrentTime: 0
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
