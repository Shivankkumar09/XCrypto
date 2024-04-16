import axios from "axios"
import { useEffect, useState } from "react"
import { server } from "../main"
import { Container, Heading, Text,Image, VStack } from "@chakra-ui/react";
import Loader from "./Loader";
import { HStack } from "@chakra-ui/react"
import { wrap } from "framer-motion";
import ErrorComp from "./ErrorComp";



const Exchanges = () => {


const [exchanges, setExchanges]= useState([]);
const [loading, setLoading ]= useState(true);
const [error, setError] = useState(false);

 useEffect(() => {

  const FetchExchanges= async() => {
    try{
    const {data} = await axios.get(`${server}/exchanges`);
    setExchanges(data);
    setLoading(false);
    }
    catch(error){
      setError(true);
      setLoading(false);
      
    }
  }
  FetchExchanges();
 },[])


 if(error)
  return <ErrorComp message={"Error while fetching Exchanges..."} />

 return (
  <Container maxW={"container.xl"}>
      {loading ? (
          <Loader/>
      ) : (
          <>
              <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                  {exchanges.map((i) => (
                     <Exchangecard 
                     key={i.id}
                     name={i.name}
                      img={i.image}
                       rank={i.trust_score_rank}
                         url={i.url}/>
                  ))}
              </HStack>
          </>
      )}
  </Container>
);
}

const Exchangecard= ({name, img, rank ,url})=>(
  <a href={url} target="blank">
<VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"}  
    _hover={{
      transform: "scale(1.1)",
    }}>
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"}  alt={"Exchanges"} />
   
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
) 



export default Exchanges