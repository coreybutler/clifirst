// Define the elements of the system.
// This often ends up being the "first page"
// of internal project docs.
export default http => {
  return {
    name: 'team',
    description: 'Team: A Group Communication Platform',
    version: '1.0.0',

    commands: [{
      name: 'user',
      description: 'Login and access account details.',
      commands: [{
        name: 'authenticate',
        alias: 'a',
        description: 'Retrieve an access token.',
        handler (meta) {
          http({
            method: 'get',
            url: 'http://localhost:8888/token',
            auth: {
              username: 'dev',
              password: 'opensesame'
            }
          }).then(r => console.log('Received: ' + r.data)).catch(console.error)
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
