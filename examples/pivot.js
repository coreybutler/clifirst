// Define the elements of the system.
// This often ends up being the "first page"
// of internal project docs.
export default net => {
  return {
    name: 'team',
    description: 'Team: A Group Communication Platform',
    version: '1.0.1',

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
              username: 'dev',
              password: 'opensesame'
            }
          }).then(r => console.log('Received: ' + r.data)).catch(console.error)
        }
      }, {
        name: 'info',
        description: 'Retrieve the details for the current user.',
        handler (meta) {
          net({
            method: 'get',
            url: 'http://localhost:8888/token',
            auth: {
              username: 'dev',
              password: 'opensesame'
            }
          }).then(response => {
            const token = response.data
            net({
              method: 'get',
              url: 'http://localhost:8888/user',
              headers: {
                authorization: `Bearer ${token}`
              }
            }).then(response => {
              console.log(response.data)
              console.log('Emit an event, trigger an action, etc.')
            }).catch(console.error)
          }).catch(console.error)
        }
      }]
    }, {
      name: 'directory',
      description: 'Interact with the directory feature.'
    }, {
      name: 'discussion',
      description: 'Interact with the discussion feature.'
    }, {
      name: 'notification',
      description: 'Send notifications.'
    }, {
      name: 'quote',
      description: 'A contrived demo to show how different runtimes can implement different responses.',
      handler (meta) {
        net({
          method: 'GET',
          url: 'https://quotes.rest/qod?language=en'
        }).then(response => {
          const { quote, author } = response.data.contents.quotes.pop()

          if (globalThis.window?.navigator) {
            // Browser runtime
            document.body.innerHTML = `
              <div class="quote">
                <blockquote>${quote}</blockquote>
                <div class="author">${author}</div>
              </div>`
          } else {
            // Node.js/other runtime
            meta.command.shell.clear()
            console.log(`\n"${quote}"`)
            console.log(`\n- ${author}\n`)
          }
        }).catch(console.error)
      }
    }]
  }
}
