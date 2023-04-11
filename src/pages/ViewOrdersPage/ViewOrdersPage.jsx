import React from "react";
import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@chakra-ui/react";

import { getAllOrders } from "../../redux/features/orders/ordersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import OrderStatusCard from "../../components/OrderStatusCard/OrderStatusCard";
import { updateOrderStatus } from "../../redux/features/vendor/vendorSlice";

export default function VendorOrderPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const getCustOrders = useCallback(async () => {
    dispatch(getAllOrders());
  }, []);

  const updateStatus = useCallback(
    async (args) => dispatch(updateOrderStatus(args)).unwrap(),
    []
  );
  useEffect(() => {
    getCustOrders();
  }, []);

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

  async function handleUpdateChange(order_id, event) {
    const { value } = event.target;
    const parametes = {
      // shopId: shop_id,
      orderId: order_id,
      status: value,
    };
    console.log(parametes);
    if (value === "option1") {
      parametes.status = "pending";
      const response = await updateStatus(parametes);
      console.log(response);
    }
    if (value === "option2") {
      parametes.status = "confirmed";
      const response = await updateStatus(parametes);
      console.log(response);
    }
    if (value === "option3") {
      parametes.status = "in_transit";
      const response = await updateStatus(parametes);
      console.log(response);
    }
    if (value === "option4") {
      parametes.status = "delivery";
      const response = await updateStatus(parametes);
      console.log(response);
    }
  }

  console.log("all my orders are stored", orders);
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
            ACTIVE ORDERS
          </Tab>
          <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
            DELIVERED
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
              {orders.active_orders?.length
                ? orders.active_orders.map((order) => (
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
                      vendor_disable={
                        order.order_status !== "in_transit" ? true : false
                      }
                      customer_disable={true}
                      showItems={order}
                    />
                  ))
                : null}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
              {orders.delivered_orders?.length
                ? orders.delivered_orders.map((order) => (
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
