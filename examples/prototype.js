// Define the elements of the system.
// This often ends up being the "first page"
// of internal project docs.
export default {
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
        console.warn('Not implemented yet.')
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
