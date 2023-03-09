import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchItemsByShopId,
  fetchShopsById,
  addToCart,
} from "../../redux/features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ItemCard from "../../components/ItemCard/ItemCard";

export default function ItemPage() {
  const [counter, setCounter] = useState(0);
  const [buttonclicked, setButtonClicked] = useState(false);
  const { shop_id } = useParams();
  const shopState = useSelector((state) => state.shop);
  const inventory =
    shopState.data.shops.find((shop) => shop.shop_id === shop_id)?.inventory ||
    [];
  const dispatch = useDispatch();

  const getShopDetails = useCallback(async () => {
    dispatch(fetchShopsById(shop_id)).unwrap();
  }, [shop_id]);

  const getItems = useCallback(async () => {
    dispatch(fetchItemsByShopId(shop_id)).unwrap();
  }, [shop_id]);

  const init = async () => {
    try {
      // reload condition
      if (!shopState.data.shops.length && shop_id) {
        await getShopDetails(shop_id);
      }
      // always get the items
      getItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  function handleincrement(item_id) {
    console.log("increment");
    setCounter(counter + 1);
    console.log(item_id);
  }
  function handledecrement(item_id) {
    if (counter > 1) {
      setCounter(counter - 1);
      setButtonClicked(false);
    }
  }

  return (
    <SimpleGrid p="2" columns={[2, 2, 4, 6, 8]} gap="10px">
      {inventory &&
        inventory?.map((item) => (
          <ItemCard
            key={item.item_id}
            name={item.name}
            image={item.image}
            price={item.price}
            increment={() => {
              handleincrement(item.item_id, counter);
            }}
            decrement={() => {
              handledecrement(item.item_id, counter);
            }}
            counter={counter}
            buttonclicked={buttonclicked}
            setButtonClicked={setButtonClicked}
          />
        ))}
    </SimpleGrid>
  );
}
