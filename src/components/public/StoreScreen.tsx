"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/config/types";
import { TierGate } from "@/components/tier/TierGate";
import { FeatureUnavailableNote } from "@/components/layout/FeatureUnavailableNote";
import { useMockData } from "@/lib/store/MockDataProvider";

const KIT_LABELS = ["Home kit", "Away kit", "Third kit"] as const;

function productName(product: Product) {
  return product.name.replace(/^2026\s+/, "");
}

export function StoreScreen() {
  const { products } = useMockData();
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const featured = products[0];

  const openProduct = (product: Product) => {
    setSelectedSize(null);
    setSelected(product);
  };

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  return <TierGate feature="store" fallback={<FeatureUnavailableNote title="Team store"/>}>
    <div className="store-page">
      <section className="store-campaign">
        <div className="store-campaign-copy">
          <span className="eyebrow">Official 2026 collection</span>
          <h1>Made for the match.<br/><em>Worn for Columbus.</em></h1>
          <p>Three first-team colors. One Lions badge. Built for every side of matchday in the Capital City.</p>
        </div>

        {featured && <button className="store-featured-product" onClick={() => openProduct(featured)} aria-label={`View ${productName(featured)} details`}>
          <span className="store-featured-label">Featured · {KIT_LABELS[0]}</span>
          <span className="store-featured-image"><Image src={featured.image} alt={featured.name} fill preload sizes="(max-width: 800px) 94vw, 48vw"/></span>
          <span className="store-featured-footer"><strong>{productName(featured)}</strong><b>${featured.price}</b></span>
        </button>}
      </section>

      <section className="store-catalog" aria-labelledby="store-collection-title">
        <header className="store-catalog-head">
          <div><span className="eyebrow">First-team kits</span><h2 id="store-collection-title">Choose your colors.</h2></div>
          <p>{products.length} official jerseys · 2026 season</p>
        </header>

        <div className="store-product-grid">
          {products.map((product, index) => <button key={product.id} className="store-product-card" data-kit={index + 1} onClick={() => openProduct(product)}>
            <span className="store-product-type">{KIT_LABELS[index] ?? "Official merchandise"}</span>
            <span className="store-product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 88vw, 32vw"/></span>
            <span className="store-product-info"><span><small>Official 2026 jersey</small><strong>{productName(product)}</strong></span><b>${product.price}</b></span>
          </button>)}
        </div>

        <div className="store-service-strip" aria-label="Store information">
          <p><small>Sizes</small><strong>Adult S—XL</strong></p>
          <p><small>Collection</small><strong>Official Lions FC</strong></p>
          <p><small>Checkout</small><strong>Club-owned on launch</strong></p>
        </div>
      </section>

      {selected && <div className="store-modal-layer" onMouseDown={() => setSelected(null)}>
        <section className="store-product-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="store-product-title">
          <button ref={closeButtonRef} className="store-modal-close" onClick={() => setSelected(null)} aria-label="Close product details">×</button>
          <div className="store-modal-media"><Image src={selected.image} alt={selected.name} fill sizes="(max-width: 760px) 100vw, 52vw"/></div>
          <div className="store-modal-copy">
            <span className="eyebrow">Official first-team collection</span>
            <h2 id="store-product-title">{productName(selected)}</h2>
            <p className="store-modal-price">${selected.price}</p>
            <p className="store-modal-description">The 2026 Lions jersey, finished in club colors and built to carry Columbus wherever matchday goes.</p>
            {selected.sizes && <div className="store-sizes"><span>Select size</span><div>{selected.sizes.map((size) => <button type="button" key={size} data-selected={selectedSize === size} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>}
            <button className="disabled-checkout" disabled>Checkout available on the live site</button>
            <small>Concept preview — no purchase is processed.</small>
          </div>
        </section>
      </div>}
    </div>
  </TierGate>;
}
