const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { channel_name } = JSON.parse(event.body);
  
  const params = {
    TableName: "channels",
    Key: {"name": channel_name}
  }
   try {
    const data = await documentClient.delete(params).promise()
    return { response: 'Channel deleted successfully', statusCode: 200 }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify(e) }
  }
};
