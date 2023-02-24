import React from "react";
import { render, screen } from "@testing-library/react";
import GroceryCard from "./ShopCard";

describe("GroceryCard", () => {
  const props = {
    shop_name: "ARPIT GROCERY SHOP",
    distance: "2km from home station",
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  };

  it("renders the grocery card with the given props", () => {
    render(<GroceryCard {...props} />);
    expect(
      screen.getByAltText("Green double couch with wooden legs")
    ).toBeInTheDocument();
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(
      screen.getByText(`DISTANCE : ${props.distance}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Rating : ${props.rating}`)).toBeInTheDocument();
    expect(screen.getByText("VISIT SHOP")).toBeInTheDocument();
  });

  it("calls the onClick handler when the button is clicked", () => {
    const onClick = jest.fn();
    render(<GroceryCard {...props} onClick={onClick} />);
    const visitButton = screen.getByText("VISIT SHOP");
    visitButton.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
