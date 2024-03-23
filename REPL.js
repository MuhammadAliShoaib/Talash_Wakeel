import { db } from './models/index.js'

db.Counter.create({
  _id: 'client',
  seq: 0,
}).then(() => process.exit())