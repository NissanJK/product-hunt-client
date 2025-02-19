import { Helmet } from "react-helmet";
import Banner from "./Home/Banner";
import FeaturedProducts from "./Home/FeaturedProducts";
import TrendingProducts from "./Home/TrendingProducts";
import AboutUs from "./Home/AboutUs";
import SalesPromotion from "./Home/SalesPromotion";
import Newsletter from "./Home/Newsletter";
import CustomerReviews from "./Home/CustomerReviews";
import FAQ from "./Home/FAQ";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TechNest | Home</title>
            </Helmet>
            <Banner />
            <AboutUs />
            <FeaturedProducts />
            <TrendingProducts />
            <SalesPromotion />
            <Newsletter />
            <CustomerReviews />
            <FAQ />
        </div>
    );
};

export default Home;