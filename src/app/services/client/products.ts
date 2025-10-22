export async function getProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}
