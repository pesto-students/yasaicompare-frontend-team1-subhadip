import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@chakra-ui/react";

import { fetchAllOrders } from "../../redux/features/vendor/vendorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import OrderStatusCard from "../../components/OrderStatusCard/OrderStatusCard";

export default function VendorOrderPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.vendor.data.orders);
  const { shop_id } = useParams();

  const getPendingVendorOrders = useCallback(
    async () =>
      dispatch(fetchAllOrders({ shopId: shop_id, status: "pending" })).unwrap(),
    [shop_id]
  );

  const getDraftVendorOrders = useCallback(
    async () =>
      dispatch(fetchAllOrders({ shopId: shop_id, status: "draft" })).unwrap(),
    [shop_id]
  );

  const getDeliveredVendorOrders = useCallback(
    async () =>
      dispatch(
        fetchAllOrders({ shopId: shop_id, status: "delievered" })
      ).unwrap(),
    [shop_id]
  );

  useEffect(() => {
    getPendingVendorOrders();
    getDeliveredVendorOrders();
    getDraftVendorOrders();
  }, []);

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
            Draft
          </Tab>
          <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
            Pending
          </Tab>
          <Tab fontSize={"xs"} fontWeight={"bold"} flex="1">
            Delievered
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
              {orders?.draft?.length
                ? orders.draft.map((order) => (
                    <OrderStatusCard
                      key={order.order_id}
                      orderId={order.order_id}
                      orderDate={order.createdAt}
                      status={order.order_status}
                      totalAmount={order.amount}
                    />
                  ))
                : null}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
              {orders?.pending?.length
                ? orders.pending.map((order) => (
                    <OrderStatusCard
                      key={order.order_id}
                      orderId={order.order_id}
                      orderDate={order.createdAt}
                      status={order.order_status}
                      totalAmount={order.amount}
                    />
                  ))
                : null}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
              {orders?.delievered?.length
                ? orders.delievered.map((order) => (
                    <OrderStatusCard
                      key={order.order_id}
                      orderId={order.order_id}
                      orderDate={order.createdAt}
                      status={order.order_status}
                      totalAmount={order.amount}
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
