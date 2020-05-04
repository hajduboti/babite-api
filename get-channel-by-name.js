const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
    const { pathParameters: { name } } = event;
    const params = { 
        TableName: "channels", 
        Key: { name },         
        AttributesToGet: ['name', 'description', 'category', 'mature', 'programme', 'thumbnail']
    }
    try {
        const data = await documentClient.get(params).promise() 
        return { statusCode: 200, body: JSON.stringify(data.Item) } 
    } catch (e) {
        return {error: 'Something went wrong', statusCode: 500 }
    }
  }