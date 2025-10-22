// src/lib/mongo.ts
import { MongoClient, Db, MongoClientOptions } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

const options: MongoClientOptions = {
  tls: true,
  tlsAllowInvalidCertificates: true, 
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(dbName: string = "shop"): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;