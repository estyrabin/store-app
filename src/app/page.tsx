// src/app/page.tsx
import Header from "./componets/Header/Header";
import Card from "./componets/Card/Card";
import { getDb } from "@/lib/mongo";

export default async function Home() {
  const db = await getDb();
  const products = await db.collection("products").find().toArray();

  return (
    <>
      <Header />
      <main className="main">
        <section className="grid">
          {products.map((item: any, i: number) => (
            <Card key={i} {...item} />
          ))}
        </section>
      </main>
    </>
  );
}