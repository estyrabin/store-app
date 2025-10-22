// src/app/page.tsx
import Header from "./componets/Header/Header";
import Card from "./componets/Card/Card";
import { getDb } from "@/lib/mongo";

export const dynamic = "force-dynamic"; 

export default async function Home() {
  const db = await getDb();
  const products = await db.collection("products").find().toArray();

  return (
    <>
      <Header />
      <main className="max-w-[1152px] mx-auto px-8 pb-8">
        <section className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {products.map((item: any, i: number) => (
            <Card key={i} {...item} />
          ))}
        </section>
      </main>
    </>
  );
}
