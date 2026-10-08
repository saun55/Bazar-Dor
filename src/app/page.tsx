import Banner from "./component/Banner";
import AllProduct from "./component/allProduct/page";
import TodayPriceDecrease from "./component/HomeCard/TodayPriceDecrease";
import TodayPriceIncrease from "./component/HomeCard/TodayPriceIncrease";


export default function Home() {
  return (
<>
   
    <Banner/>
    <TodayPriceIncrease/>
    <TodayPriceDecrease/>
    <AllProduct/>
    </>
  );
}
