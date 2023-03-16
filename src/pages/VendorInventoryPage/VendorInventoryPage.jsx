import React from "react";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import VendorIventoryCard from "../../components/VendorInventoryCard/VendorInventoryCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllInventory } from "../../redux/features/vendor/vendorSlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
export default function VendorInventoryPage() {
  const { shop_id } = useParams();
  const dispatch = useDispatch();

  const inventoryState = useSelector((state) => state.vendor);

  const getInventory = useCallback(async () => {
    dispatch(fetchAllInventory(shop_id)).unwrap();
  }, [shop_id]);

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <Box>
        <Button width="full" variant="ghost">
          CREATE NEW ITEM
        </Button>
      </Box>
      <SimpleGrid column="1" spacing={3} p="2">
        {inventoryState.data.inventory &&
          inventoryState.data.inventory.map((item) => (
            <VendorIventoryCard
              key={item.item_id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
            />
          ))}
      </SimpleGrid>
    </>
  );
}
