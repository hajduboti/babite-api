const AWS = require("aws-sdk");
const crypto = require("crypto");
const documentClient = new AWS.DynamoDB.DocumentClient();
const generateUUID = () => crypto.randomBytes(16).toString('hex');

exports.handler = async event => {
  const params = {
    TableName: "users_test",
    Item: { 
      userUUID: generateUUID(),
      username: event.userName,
      email: event.request.userAttributes.email,
    }
  }
  try {
    const data = await documentClient.put(params).promise()
    return { response: 'User created successfully', statusCode: 200 }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify(e)
  }
  }
}