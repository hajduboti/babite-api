const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
let ret = {};

exports.handler = (event, context, callback) => {
  const { userID, follow_channel_name } = JSON.parse(event.body);
  
  const params = {
    TableName: "users",
    Key: { "userUUID": userID },
    UpdateExpression : "set #fc = list_append(#fc, :followed_channels) ",
    ExpressionAttributeNames : { 
      "#fc" : "followed_channels"
    },
    ExpressionAttributeValues : { 
        ":followed_channels" : [follow_channel_name],
    }
  }
  
  documentClient.update(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
      ret.ddbUpdate = err;
      callback(null, {success: false, message: ["ddb upsert failed"], payload: ret});
    } 
    else{
      console.log(data);
      ret.ddbUpdate = data;
      callback(null, {success: true, message: ["ddb upsert succeeded"], payload: ret});
 
    } 
  })

};
