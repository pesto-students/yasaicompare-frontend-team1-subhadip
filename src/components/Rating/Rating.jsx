import { Stack } from "@chakra-ui/react";
import { StarIcon } from "../Icons";
import PropTypes from "prop-types";

export const Rating = (props = { rating: 0, total: 5 }) => {
  const levels = Array.from(Array(props.total));

  return (
    <Stack direction={"row"}>
      {levels.map((item, index) => {
        if (index < props.rating) {
          return <StarIcon key={index} color={"green.500"} />;
        } else {
          return <StarIcon key={index} color={"gray.300"} />;
        }
      })}
    </Stack>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  total: PropTypes.number,
};

export default Rating;
