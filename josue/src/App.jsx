import { useEffect, useMemo, useState } from "react";
import products from "./data/products.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import SwipeHint from "./components/SwipeHint.jsx";
import ProductCarousel from "./components/ProductCarousel.jsx";
import QuickAccess from "./components/QuickAccess.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import { getHomeHash, getProductHash, parseRouteHash } from "./utils/routes.js";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [route, setRoute] = useState(() => parseRouteHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseRouteHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const selectedProduct =
    route.type === "product" ? products.find((p) => p.id === route.id) : null;

  const openProduct = (id) => {
    window.location.hash = getProductHash(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    window.location.hash = getHomeHash();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const relatedProducts = selectedProduct
    ? products.filter(
        (product) => product.category === selectedProduct.category && product.id !== selectedProduct.id
      )
    : [];

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-white text-ink">
        <Header />
        <ProductDetail
          product={selectedProduct}
          relatedProducts={relatedProducts.slice(0, 3)}
          onBack={goHome}
          onOpenProduct={openProduct}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />

      <Hero
        products={products}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <SwipeHint />

      <ProductCarousel
        products={filteredProducts}
        activeCategory={activeCategory}
        onOpenProduct={openProduct}
      />

      <QuickAccess
        products={products}
        onSelect={(id) => openProduct(id)}
      />

      <Footer />
    </div>
  );
}
