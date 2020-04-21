import dynamo from 'dynamodb'
import Joi from '@hapi/joi'

const User = dynamo.define('User', {
  hashKey: 'id',

  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,

  schema: {
    id: Joi.string(),
    // name: Joi.string(),
  },
  tableName: 'User',
})

export default User
