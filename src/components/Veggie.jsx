import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);
  const [screenSize ,setScreenSize] =useState(null);
  const [perpg ,setPerpg] =useState(0);

    useEffect(() => {
      getVeggie();
    }, []);
    
    const getVeggie = async () => {
        const check = localStorage.getItem('veggie');
    
        if (check){
          setVeggie(JSON.parse(check));
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem("veggie",JSON.stringify(data.recipes));
            setVeggie(data.recipes);
            console.log(data.recipes);
        }
    }

    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);

      window.addEventListener('resize',handleResize);

      handleResize();
      return () => window.removeEventListener('resize',handleResize);
    }, []);
    useEffect(() => {
      if(screenSize < 650){
          setPerpg(1);
      }
      else{
          setPerpg(3);
      }
    }, [screenSize])
    console.log(perpg)
  return (
    <div>

      <Wrapper >
        <h3>Our Vegetarian Picks</h3>
        <Splide options={{
           perPage:perpg,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "1.3rem",
        }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card >
                <Link to={"/recipe/"+recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Link>
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>

      </Wrapper>

    </div>
  )
}

const Wrapper = styled.div`
    margin: 2rem 0rem;
     @media only screen and (max-width: 650px) {
        margin: -1rem -10rem 2rem -2.5rem;
        padding:-2rem;
        h3{
            margin-bottom:1rem;
        }
    }
`;
const Card = styled.div`
    min-height:12rem;
    border-radius:1.5rem; 
    overflow:hidden;
    position:realtive;
    @media only screen and (max-width: 650px) {
      padding:0.6rem;
    }
    img{
        border-radius:1.5rem;
        position:absoulte;
        left:0;
        width:100%;
        height:100%;
        object-fit:cover;
        @media only screen and (max-width: 650px) {
          margin-right:0.25rem;
      }
    }
    p{
        position:absolute;
        margin-top:15px;
        color:white;
        width:100%;
        text-align:center;
        font-weight:600;
        font-size:1rem;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        @media only screen and (max-width: 650px) {
          margin-top:5px;
          font-weight:600;
          font-size:0.9rem;
      }
    }
`;
const Gradient = styled.div`
    z-index:3;
    position:absolute;
    widht:100%;
    height:100%;
    background:liner-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8));
`;


export default Veggie