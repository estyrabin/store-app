const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function getDb(dbName = "shop") {
  const c = await clientPromise;
  return c.db(dbName);
}