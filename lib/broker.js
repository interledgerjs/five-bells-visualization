'use strict'

function Broker (log) {
  this.log = log('broker')
  this.broadcaster = null
  this.messages = []
}

Broker.prototype.setBroadcaster = function setBroadcaster (broadcaster) {
  const self = this

  this.broadcaster = broadcaster

  this.broadcaster.on('connection', function (socket) {
    self.log.info('socket client connected')
    socket.emit('clear')
    self.messages.forEach(function (message) {
      socket.emit('event', message)
    })
  })
}

Broker.prototype.emit = function (event) {
  this.messages.push(event)
  if (this.broadcaster) {
    this.broadcaster.emit('event', event)
  }
}

module.exports = Broker
