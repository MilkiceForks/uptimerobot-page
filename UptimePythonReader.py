import json
import boto3
import base64
import os

def lambda_handler(event, context):
    dynamodb = boto3.client('dynamodb')
    item = dynamodb.get_item(TableName=os.environ['TABLE_NAME'], Key={'id':{'S':os.environ['KEY_NAME']}})
    html = item['Item']['html']['S']
    if not html:
        return {
            'isBase64Encoded': "false",
            'statusCode': 500,
            'headers':{
                'Content-Type': 'text/html; charset=utf-8'
            },
            'body': 'Error!'
        }
    return {
        'isBase64Encoded': "false",
        'statusCode': 200,
        'headers':{
            'Content-Type': 'text/html; charset=utf-8'
        },
        'body': base64.b64decode(html).decode()
    }

