import React, { useRef } from "react";
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
  Img,
  Select,
  useToast,
} from "@chakra-ui/react";
import VendorIventoryCard from "../../components/VendorInventoryCard/VendorInventoryCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllInventory,
  addItemToInventory,
  uploadImage,
  inventoryItemUpdate,
} from "../../redux/features/vendor/vendorSlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
export default function VendorInventoryPage() {
  const options = [
    { value: "Kg", label: "Kilogram" },
    { value: "grm", label: "grams" },
    { value: "litre", label: "litre" },
    { value: "Ml", label: "Millilitre" },
    { value: "oz", label: "Ounce" },
  ];
  const { shop_id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inventoryState = useSelector((state) => state.vendor);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image_link, setImage_link] = useState("");
  const [image_id, setImage_id] = useState("");
  const [edit, setEdit] = useState(true);
  const inventory_id = useRef("");
  const unit = useRef("Kg");
  const toast = useToast();
  const getInventory = useCallback(async () => {
    dispatch(fetchAllInventory(shop_id)).unwrap();
  }, [shop_id]);

  const addItem = useCallback(async (args) => {
    dispatch(addItemToInventory(args)).unwrap();
  }, []);

  const uploadVendorImage = useCallback(
    async (args) => dispatch(uploadImage(args)).unwrap(),
    []
  );

  const updateInventoryItem = useCallback(
    async (args) => dispatch(inventoryItemUpdate(args)).unwrap(),
    []
  );
  useEffect(() => {
    getInventory();
  }, []);

  const handleImageChange = async (e) => {
    const data = new FormData();
    data.append("item", e.target.files[0]);
    const image = await uploadVendorImage(data);
    setImage_link(image.response.url);
    setImage_id(image.response.fileId);
  };
  const handleSubmitItemDetails = async () => {
    onClose();
    const data = {
      shop_id: shop_id,
      name: item,
      category_id: "1127",
      price: price,
      quantity: quantity,
      in_stock: true,
      image: image_link,
      unit: unit.current,
    };
    await addItem(data);
  };

  function handleChange(event) {
    unit.current = event.target.value;
  }

  async function handleEditItemDetails() {
    onClose();

    const data = {
      shop_id: shop_id,
      item_id: inventory_id.current.item_id,
      name: item,
      category_id: "1127",
      price: price,
      quantity: quantity,
      unit: unit.current,
      image: inventory_id.current.image,
    };

    const updatedresponse = await updateInventoryItem(data);
    if (updatedresponse.message === "Inventory updated Successfully") {
      setEdit(true);
      toast({
        title: `Item updated successfully.`,
        position: "top",
        isClosable: true,
        status: "success",
      });
    }
  }
  function handleEditItems(id) {
    onOpen();
    setEdit(false);
    const item = inventoryState.data.inventory.inventory.find(
      (item) => item.item_id === id
    );
    inventory_id.current = {
      item_id: item.item_id,
      image: item.image,
    };
    setItem(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setImage_link(item.image);
    setImage_id(item.image_id);
  }

  async function handleSwitchChange(event, item) {
    const data = {
      shop_id: shop_id,
      item_id: item.item_id,
      ...item,
      in_stock: event.target.checked,
    };
    const response = await updateInventoryItem(data);
    if (response.message === "Inventory updated Successfully") {
      setEdit(true);
      toast({
        title: `Item updated successfully.`,
        position: "top",
        isClosable: true,
        status: "success",
      });
    }
  }
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
          {edit ? (
            <ModalHeader fontWeight="extrabold">CREATE ITEM</ModalHeader>
          ) : (
            <ModalHeader fontWeight="extrabold">EDIT ITEM</ModalHeader>
          )}

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
              {image_link ? (
                <Img src={image_link} />
              ) : (
                <Input type="file" name="image" onChange={handleImageChange} />
              )}
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
              <FormLabel>Unit</FormLabel>
              <Select onChange={handleChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
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
            {edit ? (
              <Button width="full" onClick={handleSubmitItemDetails}>
                SUBMIT ITEM DETAILS
              </Button>
            ) : (
              <Button width="full" onClick={handleEditItemDetails}>
                EDIT ITEM DETAILS
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              unit={item.unit}
              onSwitchChange={(event) => handleSwitchChange(event, item)}
              editButton={() => handleEditItems(item.item_id)}
            />
          ))}
      </SimpleGrid>
    </>
  );
}
