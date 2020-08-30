export const alertify = (message) => {
  let messages = []
  if (typeof message === "string") {
    messages.push(message)
  } else {
    for (const key in message) {
      let messageStart = (key[0].toUpperCase() + key.substring(1)).replace('_', ' ')
      let messageEnd = `${message[key]}`.toLowerCase()
      let newMessage = messageStart + ' ' + messageEnd;
      messages.push(newMessage)
    }
  }
  return messages
}
