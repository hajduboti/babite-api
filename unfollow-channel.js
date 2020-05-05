const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
let ret = {};

exports.handler = (event, context, callback) => {
  const { userID, unfollow_channel_name } = JSON.parse(event.body);

  const params = {
    TableName: "users",
    Key: { userUUID:  userID },
    UpdateExpression : "DELETE followed_channels :unfollowed_channel_name",
    ExpressionAttributeValues : { 
        ":unfollowed_channel_name" :  documentClient.createSet(unfollow_channel_name)
    }
  }

  documentClient.update(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
      ret.ddbUpdate = err;
      callback(null, {success: false, message: ["ddb operation failed"], payload: ret});
    }
    else{
      console.log(data);
      ret.ddbUpdate = data;
      callback(null, {success: true, message: ["ddb operation succeeded"], payload: ret});
    }
  })

};
