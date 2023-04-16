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
import {
  fetchCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ItemPage() {
  const [buttonclicked, setButtonClicked] = useState(false);
  const { shop_id } = useParams();
  const navigate = useNavigate();
  const shopState = useSelector((state) => state.shop);
  const cartData = useSelector((state) => state.cart);
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

  const getCartData = useCallback(async () => {
    dispatch(fetchCartItems()).unwrap();
  }, []);

  const authState = useSelector((state) => state.auth);

  const handleIncrementClick = useCallback(
    async (item_id, quantity) => {
      try {
        if (!Object.keys(authState.data).length) {
          return navigate("/login");
        }
        if (quantity === 1) {
          await dispatch(
            addCartItem({
              shop_id,
              item_id,
              quantity,
            })
          ).unwrap();
          return;
        }
        const cartItem = cartData.data.find(
          (cartItem) => cartItem.item_id === item_id
        );
        await dispatch(
          updateCartItem({
            cart_id: cartItem.cart_id,
            quantity,
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [shop_id]
  );

  const handleDecrementClick = useCallback(
    async (item_id, quantity) => {
      try {
        if (quantity === -1) {
          return;
        }
        const cartItem = cartData.data.find(
          (cartItem) => cartItem.item_id === item_id
        );
        if (quantity === 0) {
          await dispatch(
            deleteCartItem({
              cart_id: cartItem.cart_id,
            })
          ).unwrap();
          return;
        }

        await dispatch(
          updateCartItem({
            cart_id: cartItem.cart_id,
            quantity,
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [shop_id]
  );

  const init = async () => {
    try {
      // reload condition
      if (!shopState.data.shops.length && shop_id) {
        await getShopDetails(shop_id);
      }
      // always get the items
      getItems();
      if (Object.keys(authState.data).length) {
        getCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SimpleGrid p="2" columns={[2, 2, 4, 6, 8]} gap="10px">
      {inventory &&
        inventory?.map((item) => {
          const cartItem = cartData.data.find(
            (cartItem) => cartItem.item_id === item.item_id
          );
          return (
            <ItemCard
              key={item.item_id}
              name={item.name}
              image={item.image}
              price={item.price}
              onIncrementClick={() => {
                handleIncrementClick(
                  item.item_id,
                  (cartItem?.quantity || 0) + 1
                );
              }}
              onDecrementClick={() => {
                handleDecrementClick(
                  item.item_id,
                  (cartItem?.quantity || 0) - 1
                );
              }}
              quantity={cartItem?.quantity || 0}
              buttonclicked={buttonclicked}
              setButtonClicked={setButtonClicked}
            />
          );
        })}
    </SimpleGrid>
  );
}
