import axios from "axios"
import { useEffect, useState } from "react"
import { server } from "../main"
import { Button, Container,  RadioGroup,Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import { HStack } from "@chakra-ui/react"
import ErrorComp from "./ErrorComp";
import { CoinCard } from "./CoinCard";
import { wrap } from "framer-motion";



const Coin = () => {


const [coin, setCoin]= useState([]);
const [loading, setLoading ]= useState(true);
const [error, setError] = useState(false);
const [page, setPage ]= useState(1);
const [currency,setCurrency] = useState("inr");


const currencySymbol= currency ==="inr"?"₹":currency==="eur"?"€":"$";
const changePage= (page)=>{
    setPage(page);
    setLoading(true);
}

const btns = new Array(132).fill(1)

 useEffect(() => {

  const FetchCoins= async() => {
    try{
    const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
    setCoin(data);
    setLoading(false);
    }
    catch(error){
      setError(true);
      setLoading(false);
      
    }
  }
  FetchCoins();
 },[currency, page])


 if(error)
  return <ErrorComp message={"Error while fetching Coins..."} />

 return (
  <Container maxW={"container.xl"}>
      {loading ? (
          <Loader/>
      ) : (
          <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
              <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                  {coin.map((i) => (
                     <CoinCard
                     id={i.id}
                     key={i.id}
                     name={i.name}
                     price={i.current_price}
                      img={i.image}
                       symbol={i.symbol}
                         url={i.url}
                         currencySymbol={currencySymbol}/>
                  ))}
              </HStack>

              <HStack w={"full"} overflow={"auto"} p={"8"}>
               {btns.map((item, index) => (
              <Button key={index} bgColor="blackAlpha.900" color="white" 
              onClick={() => changePage(index+1)}>
               {index + 1}
               </Button>
                ))}
               </HStack>
          </>
      )}
  </Container>
);
}





export default Coin