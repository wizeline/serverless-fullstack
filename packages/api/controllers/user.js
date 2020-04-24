import shortId from 'shortid'
import User from '../models/User'

export function createUser({
  id = shortId.generate(),
  name,
}) {
  return User.create({
    id,
    name,
  })
}

export function getUser({ id }) {
  return new Promise((resolve) => User.get({ id }, (error, data) => resolve(data)))
}

export function scanUsers() {
  return new Promise((resolve, reject) => User.scan().exec((error, data) => {
    console.error(error)
    if (error) reject(error)
    resolve(data)
  }))
}
