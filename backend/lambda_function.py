import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("CloudResumeVisitors")


def lambda_handler(event, context):
    try:
        response = table.update_item(
            Key={
                "id": "visitors"
            },
            UpdateExpression="ADD #count :increase",
            ExpressionAttributeNames={
                "#count": "count"
            },
            ExpressionAttributeValues={
                ":increase": 1
            },
            ReturnValues="UPDATED_NEW"
        )

        visitor_count = int(
            response["Attributes"]["count"]
        )

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "count": visitor_count
            })
        }

    except Exception as error:
        print(f"Error: {error}")

        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Unable to update visitor count"
            })
        }