import { Helmet } from "react-helmet"
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider"
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts"
import MainSlider from "../MainSlider/MainSlider"



export default function Home() {


  return <>
    <Helmet>
      <title>Fresh Cart</title>
    </Helmet>
    <MainSlider />
    <CategoriesSlider />
    <FeaturedProducts />
  </>
}
