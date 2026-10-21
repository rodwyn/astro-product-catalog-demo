import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
};

type ApiResponse = {
  products: Product[];
};

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=30");
        const data: ApiResponse = await res.json();
        setProducts(data.products);
      } catch {
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];
    return ["all", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "1.5rem",
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            minWidth: "240px",
            flex: "1"
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "10px",
            border: "1px solid #d1d5db"
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Todas las categorías" : cat}
            </option>
          ))}
        </select>
      </div>

      <p style={{ marginTop: "1rem" }}>
        Mostrando <strong>{filteredProducts.length}</strong> productos
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginTop: "1rem"
        }}
      >
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "1rem",
              background: "#fafafa"
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "contain",
                background: "white",
                borderRadius: "10px"
              }}
            />
            <h3 style={{ marginBottom: "0.25rem" }}>{product.title}</h3>
            <p style={{ margin: 0, color: "#6b7280" }}>{product.category}</p>
            <p style={{ fontWeight: "bold" }}>${product.price}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
