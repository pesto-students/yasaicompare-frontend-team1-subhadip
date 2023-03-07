import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetItemsByShopId } from "../../redux/features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ItemCard from "../../components/ItemCard/ItemCard";
export default function ItemPage() {
  const getItemsState = useSelector((state) => state.shop.data);
  const { shop_id } = useParams();
  const dispatch = useDispatch();
  const getItems = useCallback(() => {
    dispatch(GetItemsByShopId(shop_id));
  }, [shop_id]);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <SimpleGrid p='2'columns={[2, 2, 4, 6, 8]} gap="10px">
      {getItemsState.inventory &&
        getItemsState.inventory.map((item) => (
          <ItemCard
            key={item.item_id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
    </SimpleGrid>
  );
}
