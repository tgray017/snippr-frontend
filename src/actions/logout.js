import { sessionService } from 'redux-react-session';

export const logout = () => {
  return () => {
    sessionService.deleteSession()
    sessionService.deleteUser()
  }
}
