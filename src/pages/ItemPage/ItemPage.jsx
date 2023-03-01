import React from "react";
import { useParams } from "react-router-dom";
export default function ItemPage() {
  const { shop_id } = useParams();
  console.log(shop_id);
  return <div>ItemPage</div>;
}
