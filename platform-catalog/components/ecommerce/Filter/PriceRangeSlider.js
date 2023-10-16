import { useState } from "react";
import { useRouter } from "next/router";
import InputRange from "react-input-range";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";

const PriceRangeSlider = ({ updateProductFilters }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState({ value: { min: 0, max: 10000 } });
  const [priceText, setPriceText] = useState({value: {min: "", max: ""} });

  const selectPrice = (price) => {
    setPrice({ value: price });
    updateProductFilters({ minValue: price.min, maxValue: price.max });
    // setLoading(true);

    // // Perform some time-consuming operation
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
    router.push({
      pathname: "/products",
      query: {
        minValue: price.min,
        maxValue: price.max,
      },
    });
  };

  return (
    <>
  
      <InputRange
        formatLabel={(value) => `$${value}`}
        maxValue={10000}
        minValue={0}
        value={price.value}
        onChange={(value) => selectPrice(value)}
      />
    </>
  );
};

export default connect(null, { updateProductFilters })(PriceRangeSlider);
