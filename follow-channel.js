const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB;
let ret = {};

exports.handler = (event, context, callback) => {
  const { userID, follow_channel_name } = JSON.parse(event.body);

  const params = {
    TableName: "users",
    Key: { userUUID: { S : userID } },
    UpdateExpression : "ADD followed_channels :followed_channel_name",
    ExpressionAttributeValues : {
        ":followed_channel_name" : {
          "SS" : [follow_channel_name]
        }
    }
  }

  ddb.updateItem(params, function(err, data) {
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
