import { Shell, Command } from 'https://cdn.pika.dev/@author.io/browser-shell@^1.6.3'
import config from './common/plan.js'
// import config from './common/prototype.js'
// import config from './common/develop.js'
// import config from './common/pivot.js'
// import config from './common/maintain.js'
import axios from 'https://cdn.pika.dev/axios@^0.19.2'

// const CLI = new Shell(config)
const CLI = new Shell(config(axios))

globalThis.team = function () {
  CLI.exec(...arguments).catch(console.error)
}
