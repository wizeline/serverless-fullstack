import 'source-map-support/register'
import serverless from 'serverless-http'
import app from './app'
import '../../dynamodb-init'

export const handler = serverless(app, {
  request(request, event) {
    request.requestContext = event.requestContext
  },
})
