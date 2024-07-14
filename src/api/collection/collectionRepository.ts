import { ScanCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';

import { Collection, TABLE_NAME } from '@/api/collection/collectionModel';
import { docClient } from '@/common/helpers/database';

export const collectionRepository = {
  findAllAsync: async (): Promise<Collection[]> => {
    let items: Collection[] = [];
    let lastEvaluatedKey = undefined;

    do {
      const scanCommandInput: ScanCommandInput = {
        TableName: TABLE_NAME,
        ExclusiveStartKey: lastEvaluatedKey,
      };

      const result = await docClient.send(new ScanCommand(scanCommandInput));
      items = items.concat(result.Items as Collection[]);
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return items;
  },

  findByIdAsync: async (id: number): Promise<Collection | null> => {
    return null;
  },
};
