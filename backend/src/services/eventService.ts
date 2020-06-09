import 'source-map-support/register'
import * as AWS from 'aws-sdk';
//import * as AWSXRay from 'aws-xray-sdk'
import { EventItem } from '../models/EventItem';
import { UpdateEventRequest } from '../requests/UpdateEventRequest';

export class EventService {

    eventsTable: string;
    globalIndexEvent: string;
    XAWS: any;
    docClient: any;
    localIndex: string
    constructor() {
        console.log('inside event service - ctor');

        this.XAWS = AWS
        //this.XAWS = AWSXRay.captureAWS(AWS)
        this.docClient = this.createDynamoDBClient()
        this.eventsTable = process.env.EVENT_TABLE
        this.globalIndexEvent = process.env.EVENT_GLOBAL_INDEX
        this.localIndex = process.env.EVENT_LOCAL_INDEX
    }

    async getItems(userId: string): Promise<EventItem> {
        console.log('inside event service - getItem');

        const result = await this.docClient.query({
            TableName: this.eventsTable,
            IndexName: this.globalIndexEvent,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false
        }).promise();

        return result.Items as EventItem;
    }

    async createItem(eventItem: EventItem): Promise<EventItem> {
        console.log('inside event service - createItem');
        await this.docClient.put({
            TableName: this.eventsTable,
            Item: eventItem
        }).promise();
        return eventItem;
    }

    async updateItem(userId: string, eventId: string, updateEvent: UpdateEventRequest) {
        await this.docClient.update({
            TableName: this.eventsTable,
            Key: {
                eventId: eventId,
                userId: userId
            },
            ExpressionAttributeValues: {
                ':date': updateEvent.date,
                ':value': updateEvent.value,
            },
            ExpressionAttributeNames: {
                "#attrDate": "date",
                "#attrValue": "value",
            },
            UpdateExpression: 'SET #attrDate=:date, #attrValue=:value',
            ReturnValues: 'ALL_NEW'
        }).promise();
    }

    async deleteItem(userId: string, eventId: string) {
        await this.docClient.delete({
            TableName: this.eventsTable,
            IndexName: this.localIndex,
            Key: {
                eventId: eventId,
                userId: userId
            }
        }).promise();
    }

    private createDynamoDBClient() {
        console.log(process.env);

        if (process.env.IS_OFFLINE) {
            console.log('creating dynamodb instance');
            return new this.XAWS.DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            })
        }
        return new this.XAWS.DynamoDB.DocumentClient()
    }
}