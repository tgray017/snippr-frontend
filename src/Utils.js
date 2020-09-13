export const alertify = (message) => {
  let messages = []
  if (typeof message === "string") {
    messages.push(message)
  } else {
    message.forEach(m => messages.push(m))
  }
  return messages
}
