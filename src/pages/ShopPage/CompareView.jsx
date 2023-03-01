import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import CompareViewItem from "../../components/CompareViewItem/CompareViewItem";
export default function CompareView() {
  return (
    <>
      {/* <SimpleGrid column={[2, 2, 4, 6, 8]} gap="10px"> */}
      <SimpleGrid
        display="flex"
        column={[2, 2, 4, 6, 8]}
        overflowX="scroll"
        gap="4px"
      >
        <CompareViewItem />
        <CompareViewItem />
        <CompareViewItem />
        <CompareViewItem />
        <CompareViewItem />
        <CompareViewItem />
        <CompareViewItem />
        <CompareViewItem />
      </SimpleGrid>
    </>
  );
}
