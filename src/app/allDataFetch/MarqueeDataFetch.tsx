import baseUrl from "@/service/baseUrl";
import NotFound from "../not-found";

const MarqueeDataFetch = async() => {
try{
  const res = await fetch(`${baseUrl}/products`)
  const data = await res.json();
  if(!data.success){
    NotFound()
  }
return data

}catch(error){
  console.error("আপনার ডেটা লোড করতে ব্যর্থ হয়েছে",error);
  
}
};

export default MarqueeDataFetch;