#!/usr/bin/env node
import { Shell, Command } from '@author.io/node-shell'
import config from './common/plan.js'
// import config from './common/prototype.js'
// import config from './common/develop.js'
// import config from './common/pivot.js'
// import config from './common/maintain.js'
import axios from 'axios'

const CLI = new Shell(config(axios))

const cmd = process.argv.slice(2).join(' ').trim()
CLI.exec(cmd).catch(console.log)
