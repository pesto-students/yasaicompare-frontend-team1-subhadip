import React from "react";
import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@chakra-ui/react";

import { fetchAllOrders } from "../../redux/features/vendor/vendorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import OrderStatusCard from "../../components/OrderStatusCard/OrderStatusCard";
import { updateOrderStatus } from "../../redux/features/vendor/vendorSlice";

export default function VendorOrderPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.vendor.data.orders);
  const { shop_id } = useParams();

  const getVendorOrders = useCallback(
    async () => dispatch(fetchAllOrders({ shopId: shop_id })).unwrap(),
    [shop_id]
  );

  const updateStatus = useCallback(
    async (args) => dispatch(updateOrderStatus(args)).unwrap(),
    []
  );
  useEffect(() => {
    getVendorOrders();
  }, []);

  async function handleUpdateChange(order_id, event) {
    const { value } = event.target;
    const parametes = {
      shopId: shop_id,
      orderId: order_id,
      status: value,
    };
    if (!(value === "pending" || value === "delivered")) {
      const response = await updateStatus(parametes);
      console.log(response);
    }
  }

  function ColorMode(status) {
    if (status === "draft") {
      return "orange";
    } else if (status === "pending") {
      return "red";
    } else if (status === "confirmed") {
      return "yellow";
    } else if (status === "in_transit") {
      return "blue";
    } else if (status === "delivered") {
      return "green";
    }
    return "gray";
  }

  console.log(orders.order_status);
  return (
    <>
      <Tabs pb="70px">
        <TabList
          justifyContent={"space-between"}
          position={"sticky"}
          top="60px"
          zIndex={999}
          bg="white"
        >
          <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
            ORDER STATUS
          </Tab>
          <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
            DELIVERY STATUS
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
              {orders?.order_status?.length
                ? orders.order_status.map((order) => (
                    <OrderStatusCard
                      key={order.order_id}
                      orderId={order.order_id}
                      orderDate={order.createdAt}
                      status={order.order_status}
                      totalAmount={order.amount}
                      handleChange={(event) => {
                        handleUpdateChange(order.order_id, event);
                      }}
                      color_id={ColorMode(order.order_status)}
                      vendor_disable={true}
                      customer_disable={false}
                      showItems={order}
                    />
                  ))
                : null}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
              {orders?.delivery_status?.length
                ? orders.delivery_status.map((order) => (
                    <OrderStatusCard
                      key={order.order_id}
                      orderId={order.order_id}
                      orderDate={order.createdAt}
                      status={order.order_status}
                      totalAmount={order.amount}
                      handleChange={(event) => {
                        handleUpdateChange(order.order_id, event);
                      }}
                      color_id={ColorMode(order.order_status)}
                      vendor_disable={true}
                      customer_disable={true}
                      showItems={order}
                    />
                  ))
                : null}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
