import React,{useState,useLayoutEffect} from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
 
const Recipe = () => {
  
  const [details,setDetails] = useState({});
  const [activeTab,setActiveTab] = useState("instructions");
  const [screenSize ,setScreenSize] =useState(null);
  let params = useParams();
  const fetchDetails = async (name) =>{
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData  = await data.json();
    setDetails(detailData);
    };

    useLayoutEffect(() =>{
      fetchDetails();
    },[params.name]);

    useLayoutEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);

      window.addEventListener('resize',handleResize);

      handleResize();
      return () => window.removeEventListener('resize',handleResize);
  }, []);

  return (
    <DetailWrapper
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity:0}}
    transition={{duration: 0.5}}
    className={screenSize < 512 ? 'd' :''}>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title}/>
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' :''} onClick={() => setActiveTab("instructions")}>Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' :''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
       {activeTab === 'instructions' && (
        <div>
          <h3 dangerouslySetInnerHTML={{__html:details.summary}}></h3>
          <h4 dangerouslySetInnerHTML={{__html:details.instructions}}></h4>
        </div>
       )}
       {activeTab === 'ingredients' && (
        <ul>
          {details.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
       )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled(motion.div)`
  justify-content:center;
  margin-top:2.5rem;
  margin-bottom:2.5rem;
  margin-left:0.5rem;
  margin-right:0.5rem;
  display:flex;
    
  .active{
    background:linear-gradient(35deg,#494949,#313131);
    color:white;
  }
  @media only screen and (max-width: 650px) {
  margin-top:1rem;
  margin-bottom:1rem;
  margin-left:0rem;
  margin-right:-10rem;
  display:block;
  }
  @media only screen and (max-width: 650px) {
  img{
    margin-left:0.8rem;
    padding-right:-1rem;
    height:250px;
    width:350px;
    border-radius:1rem;
  }
  }
  @media only screen and (max-width: 650px) {
    h2{
      margin-bottom:1rem;
      margin-right:10rem;
    }
    }
  h2{
    margin-bottom:2rem;
    margin-right:12rem;
  }
    }
  h3{
    @media only screen and (max-width: 650px) {
      h3{
        margin-right:1rem;
      }
      }
    font-weight:50;
    margin-top:0.5rem;
    font-size:1rem;
    line-height:1.4rem;
  }
    }
  h4{
    font-weight:600;
    margin-top:1rem;
    font-size:1rem;
    line-height:1.4rem;
  }
  @media only screen and (max-width: 650px) {
    li{
      font-size:0.8rem;
      line-height:2rem;
    }
    }
  li{
    font-size:0.8rem;
    line-height:2.5rem;
  }
  @media only screen and (max-width: 650px) {
    ul{
      margin-top:1rem;
    }
    }
  ul{
    margin-top:2rem;
  }
`;

const Button = styled.button`
  padding:0.5rem 1rem;
  color:#313131;
  background:white;
  border:2px solid black;
  margin:1rem;
  font-weight:600;
  position:relative;
  display:relative;
  border-radius:0.5rem;
  @media only screen and (max-width: 650px) {
    margin:1rem 2.2rem;
    }
`;
const Info = styled.div`
  margin-left:8rem;
  @media only screen and (max-width: 650px) {
    margin-left:0.2rem;
    margin-right:0.2rem;
    }
`;

export default Recipe