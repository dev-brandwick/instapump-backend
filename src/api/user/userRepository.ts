import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

import { TABLE_NAME, User } from '@/api/user/userModel';
import { docClient } from '@/common/helpers/database';

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
};
