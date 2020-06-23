// Define the elements of the system.
// This often ends up being the "first page"
// of internal project docs.
export default net => {
  return {
    name: 'team',
    description: 'Team: A Group Communication Platform',
    version: '1.0.0',

    commands: [{
      name: 'user',
      description: 'Login and access account details.',
      commands: [{
        name: 'authenticate',
        description: 'Retrieve an access token.',
        handler (meta) {
          net({
            method: 'get',
            url: 'http://localhost:8888/token',
            auth: {
              username: meta.flag('username'),
              password: meta.flag('password')
            }
          }).then(r => console.log('Received: ' + r.data)).catch(console.error)
        }
      }, {
        name: 'info',
        description: 'Retrieve the details for the current user.',
        flags: {
          username: {
            alias: 'u',
            description: 'Username'
          },
          password: {
            alias: 'p',
            description: 'Password/secret'
          }
        },
        handler (meta) {
          if (!meta.flag('username') || !meta.flag('password')) {
            return console.log('Please provide a username/password combo.')
          }

          net({
            method: 'get',
            url: 'http://localhost:8888/token?cb' + (new Date()).getTime(),
            auth: {
              username: meta.flag('username'),
              password: meta.flag('password')
            }
          }).then(r => {
            net({
              method: 'get',
              url: 'http://localhost:8888/user',
              headers: {
                authorization: `Bearer ${r.data}`
              }
            }).then(response => console.log(response.data)).catch(console.error)
          }).catch(console.error)
        }
      }]
    }, {
      name: 'directory',
      description: 'Interact with the directory feature.'
    }, {
      name: 'wall',
      description: 'Interact with the discussion feature.'
    }, {
      name: 'notification',
      description: 'Send notifications.'
    }]
  }
}
