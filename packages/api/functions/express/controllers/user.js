import shortId from 'shortid'
import User from '../../../models/User'

export function createUser({
  name,
}) {
  return User.create({
    id: shortId.generate(),
    name,
  })
}

export function scanUsers() {
  return new Promise((resolve) => {
    return User.scan().exec((error, data) => resolve(data))
  })
}
