import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateEventRequest } from '../../requests/CreateEventRequest'
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from "../utils";
import { EventService } from '../../services/eventService';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateEventRequest = JSON.parse(event.body)

  const timestamp = new Date().toISOString();
  const eventId = uuidv4()
  const userId = getUserId(event)

  const newItem = {
    eventId,
    userId,
    createdAt: timestamp,
    ...newTodo
  }

  const service = new EventService();
  const result = await service.createItem(newItem)

  return {
    statusCode: 200,
    body: JSON.stringify({ item: result }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
}
