"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/config/types";
import { TierGate } from "@/components/tier/TierGate";
import { FeatureUnavailableNote } from "@/components/layout/FeatureUnavailableNote";
import { useMockData } from "@/lib/store/MockDataProvider";

export function StoreScreen() {
  const { products } = useMockData(); const [selected, setSelected] = useState<Product | null>(null);
  return <TierGate feature="store" fallback={<FeatureUnavailableNote title="Team store"/>}><div className="interior store-page"><header className="interior-hero"><span className="eyebrow">Official club goods</span><h1>Carry the club.<br/><em>Beyond matchday.</em></h1></header><section className="product-grid">{products.map((product) => <button key={product.id} className="product-card" onClick={() => setSelected(product)}><div><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 90vw, 32vw"/></div><p><strong>{product.name}</strong><span>${product.price}</span></p><small>{product.category}</small></button>)}</section>{selected && <div className="drawer-backdrop" onMouseDown={() => setSelected(null)}><aside className="product-drawer" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selected.name}><button className="drawer-close" onClick={() => setSelected(null)}>×</button><div><Image src={selected.image} alt={selected.name} fill sizes="500px"/></div><span className="eyebrow">Official merchandise</span><h2>{selected.name}</h2><p className="price">${selected.price}</p>{selected.sizes && <div className="sizes">{selected.sizes.map((size) => <span key={size}>{size}</span>)}</div>}<button className="disabled-checkout" disabled>Checkout available on the live site</button><small>Concept preview — no purchase is processed.</small></aside></div>}</div></TierGate>;
}
