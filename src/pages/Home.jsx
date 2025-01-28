import { Helmet } from "react-helmet";
import Banner from "./Home/Banner";
import FeaturedProducts from "./Home/FeaturedProducts";
import TrendingProducts from "./Home/TrendingProducts";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TechNest | Home</title>
            </Helmet>
            <Banner />
            <FeaturedProducts />
            <TrendingProducts />
        </div>
    );
};

export default Home;