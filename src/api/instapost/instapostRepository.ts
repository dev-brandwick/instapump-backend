import { ScanCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';

import { Instapost, TABLE_NAME } from '@/api/instapost/instapostModel';
import { docClient } from '@/common/helpers/database';

export const instapostRepository = {
  findAllAsync: async (): Promise<Instapost[]> => {
    let items: Instapost[] = [];
    let lastEvaluatedKey = undefined;

    do {
      const scanCommandInput: ScanCommandInput = {
        TableName: TABLE_NAME,
        ExclusiveStartKey: lastEvaluatedKey,
      };

      const result = await docClient.send(new ScanCommand(scanCommandInput));
      items = items.concat(result.Items as Instapost[]);
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return items;
  },

  findByIdAsync: async (id: number): Promise<Instapost | null> => {
    return null;
  },
};
