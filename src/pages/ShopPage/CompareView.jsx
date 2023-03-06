import React from "react";
import CompareViewItem from "../../components/CompareViewItem/CompareViewItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../../redux/features/shop/shopSlice";
import { useEffect, useCallback } from "react";
import _ from "lodash";

export default function CompareView() {
  const shopState = useSelector((state) => state.shop);

  const dispatch = useDispatch();

  const getShops = useCallback(async () => dispatch(fetchShops()).unwrap(), []);

  const init = async () => {
    try {
      await getShops();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <CompareViewItem />
      <CompareViewItem />
      <CompareViewItem />
      <CompareViewItem />
      <CompareViewItem />
      <CompareViewItem />
      <CompareViewItem />
      <CompareViewItem />
    </>
  );
}
