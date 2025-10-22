"use client";

import { useEffect, useState } from "react";
import Header from "./componets/Header/Header";
import Card from "./componets/Card/Card";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching /api/products:", err);
        if (!cancelled) setError("שגיאה בטעינת מוצרים");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <p className="text-center mt-10">טוען מוצרים...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

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
