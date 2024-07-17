import { AttributeValue } from '@aws-sdk/client-dynamodb';

export const formatDynamoDBRecord = (user: any): Record<string, AttributeValue> => {
  const formatted: Record<string, AttributeValue> = {};
  Object.keys(user).forEach((key) => {
    const value = user[key];
    if (typeof value === 'string') {
      formatted[key] = { S: value };
    } else if (typeof value === 'number') {
      formatted[key] = { N: value.toString() };
    } else if (typeof value === 'boolean') {
      formatted[key] = { BOOL: value };
    } else if (value instanceof Date) {
      formatted[key] = { S: value.toISOString() };
    } else if (value === null || value === undefined) {
      // Handle null or undefined if necessary
    } else {
      // Handle other types as needed
    }
  });
  return formatted;
};
