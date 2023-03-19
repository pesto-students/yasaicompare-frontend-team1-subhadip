import React from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  FormLabel,
  Input,
  FormControl,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import VendorIventoryCard from "../../components/VendorInventoryCard/VendorInventoryCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllInventory,
  addItemToInventory,
} from "../../redux/features/vendor/vendorSlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
export default function VendorInventoryPage() {
  const { shop_id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inventoryState = useSelector((state) => state.vendor);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const getInventory = useCallback(async () => {
    dispatch(fetchAllInventory(shop_id)).unwrap();
  }, [shop_id]);

  useEffect(() => {
    getInventory();
  }, []);

  function getCurrentLocation() {}
  const handleSubmitShopDetails = () => {};
  return (
    <>
      <Box>
        <Button width="full" variant="ghost" onClick={onOpen}>
          CREATE NEW ITEM
        </Button>
      </Box>

      {/* This is the for  */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="extrabold">CREATE ITEM</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Item Name</FormLabel>
              <Input
                value={item}
                placeholder="Enter your Item Name"
                onChange={(e) => setItem(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                value={image}
                type="file"
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                value={price}
                placeholder="Enter your Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                value={quantity}
                placeholder="Enter your Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button width="full" onClick={handleSubmitShopDetails}>
              SUBMIT ITEM DETAILS
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box>
        <Button width="full" variant="ghost">
          CREATE NEW ITEM
        </Button>
      </Box>
      <SimpleGrid column="1" spacing={3} p="2">
        {inventoryState.data.inventory.inventory &&
          inventoryState.data.inventory.inventory.map((item) => (
            <VendorIventoryCard
              key={item.item_id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              available={item.in_stock}
            />
          ))}
      </SimpleGrid>
    </>
  );
}
