import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";
import CheckBox from "./Checkbox";

const VendorFilter = ({ updateProductFilters }) => {
  const [sizes, setSizeCheckbox] = useState([
    { value: "NestFood" },
    { value: "ponto" },
    { value: "starKist" },
    { value: "aldi" },
    { value: "adidas" },
    { value: "Costco" },
    { value: "Harris" },
    { value: "iSnack" },
    { value: "Burbe" },
  ]);
  
  const [price, setPrice] = useState({ value: { min: "", max: "" } });
  const router = useRouter();

  const inputPrice = (price) => {
    setPrice({ value: price });
    updateProductFilters({ minValue: "", maxValue: "" });

    router.push({
      pathname: "/products",
      query: {
        minValue: price.min,
        maxValue: price.max,
      },
    });
  };

  const Router = useRouter();
  const searchTerm = Router.query.search;

  const [selectedVendor, setVendor] = useState([]);

  useEffect(() => {
    const filters = {
      vendor: selectedVendor,
    };

    updateProductFilters(filters);
  }, [sizes, searchTerm]);

  const handleCheckBox = (
    event,
    filters,
    updatefilters,
    selectFilter,
    text
  ) => {
    const value = event.target.value;
    const updateSizes = filters;

    updateSizes.forEach((item) => {
      if (item.value === value) {
        if (item.checked) {
          item.checked = false;
          const newsize = text.filter((item) => item !== value);
          selectFilter([...newsize]);
        } else {
          item.checked = true;
          const newsize = text.includes(value) ? text : [...text, value];
          selectFilter([...newsize]);
        }
      }
    });

    updatefilters([...updateSizes]);
  };

  return (
    <>
      <div hidden className="custome-checkbox">
        <CheckBox
          heading="Select Size"
          filters={sizes}
          handleCheckBox={(e) => {
            handleCheckBox(
              e,
              sizes,
              setSizeCheckbox,
              setVendor,
              selectedVendor
            );
          }}
        />
      </div>
      <div className="row">
            <div className="col-md-6 pe-0">
                    <input
                        type="text"
                        placeholder="$ Mínimo"
                        value={price.min}
                        className="form-control rounded border-secondary"
                        onChange={(value) => inputPrice(value)}
                    />
            </div>
            <div className="col-md-6 pe-0">
                    <input
                        type="text"
                        placeholder="$ Máximo"
                        value={price.max}
                        className="form-control rounded border-secondary"
                        onChange={(value) => inputPrice(value)}
                    />
            </div>
      </div>
    </>
  );
};

// const mapStateToProps = (state) => ({
//     products: state.products.items
// });

// const mapDidpatchToProps = {
//     updateProductFilters
// };

export default connect(null, { updateProductFilters })(VendorFilter);
