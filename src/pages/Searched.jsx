import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {Link,useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
 
const Searched = () => {

  const [searchedRecipes,setSearchedRecipes] = useState([]);
  let params = useParams();
  const getSearched = async (name) =>{
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
    const recipes  = await data.json();
    setSearchedRecipes(recipes.results);
    };

    useEffect(() =>{
      getSearched(params.search);
  },[params.search]);

  return (
    <Grid  
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity:0}}
    transition={{duration: 0.5}}>
      {searchedRecipes.map((item) =>{
        return(
          <Card key={item.id}>
            <Link to={"/recipe/"+item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));
    grid-gap:5rem;
    @media only screen and (max-width: 650px) {
      grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));
      grid-gap:0.2rem;
      margin-left:4.5rem;
    }
`;
const Card = styled.div`
    justify-item:center;
    img{
        widht:100%;
        border-radius:2rem;
    }
    a{
        text-decoration:none;
    }
    h4{
        text-align:center;
        padding:1rem;
    }
    @media only screen and (max-width: 650px) {
      img{
        widht:50%;
        border-radius:3rem;
        margin-left:-1.5rem;
    }
    a{
        text-decoration:none;
    }
    h4{
        text-align:center;
        padding:0.5rem;
    }
    
    }
`;

export default Searched