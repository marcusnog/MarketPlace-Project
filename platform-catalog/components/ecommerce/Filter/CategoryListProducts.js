import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import { useHomeDataContext } from "../../../hooks/HomeDataProvider";
import { useRouter } from "next/router";
import Loader from "../Loader";

const CategoryProduct3 = ({setToggled}) => {
    const { categories } = useHomeDataContext();
    const router = useRouter();
    
    const findProductsByCategory = (category, label) => {
        router.push({
            pathname: "/products",
            query: {
                Category: category,
                label
            },
        });
        setToggled(false)

    };

        return ( <ul> { 
                    categories !== undefined ? categories?.map(category => <li key={category.value} onClick={() => findProductsByCategory(category.value, category.label)}> {category?.label} </li>)
                    : <Loader />
                    }  
                </ul>
        )
};

export default connect(null, { updateProductCategory })(CategoryProduct3);
