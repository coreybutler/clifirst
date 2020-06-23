import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const file = fs.readFileSync(path.join(__dirname, '../.htpasswd')).toString()
const credentials = new Map()

file.split('\n').forEach(keypair => {
  const pair = keypair.split(':')
  if (pair[0] && pair[1]) {
    credentials.set(pair[0], pair[1])
  }
})

export default (user, pwd) => credentials.get(user) === pwd
