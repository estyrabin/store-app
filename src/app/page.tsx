"use client";

import { useEffect, useState } from "react";  
import Header from "./componets/Header/Header";
import Card from "./componets/Card/Card";
import { getProducts } from "./services/client/products";


export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("שגיאה בטעינת מוצרים");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>טוען מוצרים...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <main className="main">
        <section className="grid">
          {products.map((item, i) => (
            <Card key={item._id ?? i} {...item} />
          ))}
        </section>
      </main>
    </>
  );
}