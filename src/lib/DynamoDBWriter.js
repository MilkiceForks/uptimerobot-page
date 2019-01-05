import AWS from "aws-sdk";
import uuid from "uuid";

var documentClient = new AWS.DynamoDB.DocumentClient();

exports.writeData = function (sta_data) {
  sta_data.id = process.env.KEY_NAME;
  var params = {
    Item: sta_data,
    TableName: process.env.TABLE_NAME
  };
  documentClient.put(params, function (err, data) {
    console.log(err);
  });
};
