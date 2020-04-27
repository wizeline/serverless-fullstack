import DynamoDB from 'aws-sdk/clients/dynamodb'
import dynamo from 'dynamodb'

const dynamoDbConfig = {
  // region: 'us-east-1',
  convertEmptyValues: true,
}
const dynamoDb = new DynamoDB.DocumentClient(dynamoDbConfig)
dynamo.documentClient(dynamoDb)

// dynamo.AWS.config.loadFromPath('credentials.json')
// dynamo.AWS.config.update({
//   region: 'us-east-1',
// })
