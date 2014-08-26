$(window.document).ready(function() {

  var socket = new Primus('//' + window.document.location.host)

  socket.on('error', function(error) { console.error(error) })

  var login = function() {
      socket.send('xmpp.login', {
        jid: 'alice@wonderland.lit',
        password: 'secr3t',
        host: '172.16.1.56'
      })
      socket.on('xmpp.connection', function(data) {
          console.log('Connected as', data.jid)
      })
  }

  socket.on('open', function() {
      console.log('Connected')
      login()
  })

  socket.on('timeout', function(reason) {
      console.error('Connection failed: ' + reason)
  })

  socket.on('end', function() {
      console.log('Socket connection closed')
      socket = null
  })

  socket.on('xmpp.error', function(error) {
      console.error('XMPP-FTW error', error)
  })

  socket.on('xmpp.error.client', function(error) {
      console.error('XMPP-FTW client error', error)
  })
})
