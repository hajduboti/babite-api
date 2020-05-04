const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const params = {
    TableName: "channels",
    AttributesToGet: ['name', 'category', 'thumbnail']

  };
  try {
    const data = await documentClient.scan(params).promise();
    return { statusCode: 200, channels: JSON.stringify(data) }
  } catch (e) {
    return { error: 'Something went wrong', statusCode: 500 };
  }
};