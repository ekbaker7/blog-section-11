import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const MONGO_USERNAME = process.env.NEXT_PUBLIC_MONGO_USERNAME
  const MONGO_PASSWORD = process.env.NEXT_PUBLIC_MONGO_PASSWORD
  const MONGO_CLUSTER = process.env.NEXT_PUBLIC_MONGO_CLUSTER
  const DATABASE_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME
  const DATABASE_CONFIG = process.env.NEXT_PUBLIC_DATABASE_CONFIG

  const CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${DATABASE_NAME}?${DATABASE_CONFIG}`;

  const client = await MongoClient.connect(CONNECTION_STRING);

  return client;
}

export async function insertDocument(client, collection, entity) {
  const db = client.db();

  return db.collection(collection).insertOne(entity);
}
