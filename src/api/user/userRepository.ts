import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME, User } from '@/api/user/userModel';
import { docClient } from '@/common/helpers/database';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { formatDynamoDBRecord } from '@/common/utils/dynamoDbFormatter';

export const userRepository = {
  findAllAsync: async (): Promise<User[] | null> => {
    return null;
  },

  findByIdAsync: async (id: string): Promise<User> => {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        userId: id,
      },
    });

    const response = await docClient.send(command);
    return response.Item as User;
  },

  createAsync: async (user: User): Promise<User> => {
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: formatDynamoDBRecord(user),
    });

    try {
      await docClient.send(command);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
