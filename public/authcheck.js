const socket = io({
    transports: ['websocket']
  }, {
    forceNew: true
  });

  socket.on('reconnect_attempt', () => {
    socket.io.opts.transports = ['polling', 'websocket'];
  });

  var urlParams = new URLSearchParams(window.location.search);
  key = urlParams.getAll('key') || null;

  socket.emit('sessionkey', {
    sesskey: key
  });
  socket.on('ressessionkey', (arg) => {
        if (arg.wrong == true) {
          alert("NO NO NO haha")
          window.location.href = "index.html";

        } else {
          alert('Welcome Back');
        }
      });
