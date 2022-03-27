import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

const Popular = () => {
    const [popular, setPopular] = useState([]);
    const [screenSize ,setScreenSize] =useState(null);
    const [perpg ,setPerpg] =useState(0);
   

    useEffect(() => {
        getPopular();
    }, []);
    
    const getPopular = async () => {
        const check = localStorage.getItem('popular');
    
        if (check){
            setPopular(JSON.parse(check));
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15`);
            const data = await api.json();
            localStorage.setItem("popular",JSON.stringify(data.recipes));
            setPopular(data.recipes);
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
            setPerpg(4);
        }
    }, [screenSize])


    return (
        <div>
         
            <Wrapper >
                <h3>Popular Picks</h3>
                <Splide options={{
                    perPage:perpg,
                    arrows:false,
                    pagination:false,
                    drag:"free",
                    gap:"2rem",
                }}>
                    {popular.map((recipe) => {
                       return(
                       <SplideSlide key={recipe.id}>
                            <Card >
                                <Link to={"/recipe/"+recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                </Link>
                            <Gradient/>
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
    margin: 1.5rem 0rem -2rem 0rem;
    @media only screen and (max-width: 650px) {
        margin: 0.7rem -8rem -2rem -1.5rem;
        padding:-1rem;
        h3{
            margin-bottom:1rem;
        }
    }
`;
const Card = styled.div`
    min-height:15rem;
    border-radius:1rem; 
    overflow:hidden;
    position:realtive;
    @media only screen and (max-width: 650px) {
        padding:0rem;
    }
    
    img{
        border-radius:1rem;
        position:absoulte;
        left:0;
        width:100%;
        height:100%;
        object-fit:cover;
        @media only screen and (max-width: 650px) {
            margin-left:0.6rem;
        }
    }
    p{
        position:absolute;
        color:white;
        width:100%;
        text-align:center;
        font-weight:600;
        font-size:0.8rem;
        height:75%;
        display:flex;
        justify-content:center;
        align-items:center;
        @media only screen and (max-width: 650px) {
            margin-top:5px;
            font-weight:600;
            font-size:0.7rem;
            color:white;
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

export default Popular;