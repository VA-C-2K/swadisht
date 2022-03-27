import {FaPizzaSlice ,FaHamburger} from 'react-icons/fa';
import {GiNoodles,GiChopsticks,GiChickenOven} from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import indian from '../img/indian.png';
import chinese from '../img/chinese.png';

const Category = () => {
  return (
    <List>
        <SLink to={'/cuisine/Indian'}>
           <img src={indian} alt="indian"/>
            <h4>Indian</h4>
        </SLink> 
        <SLink to={'/cuisine/Italian'}>
           <FaPizzaSlice />
            <h4>Italian</h4>
        </SLink> 
        <SLink to={'/cuisine/American'} >
            <FaHamburger />
            <h4>American</h4>
        </SLink>
        <SLink to={'/cuisine/Thai'}>
            <GiNoodles />
            <h4>Thai</h4>
        </SLink>
        <SLink  to={'/cuisine/Japanese'}>
            <GiChopsticks />
            <h4>Japanese</h4>
        </SLink>
    </List>
  )
}

const List = styled.div`
    display:flex;
    justify-content:center;
    margin:2rem 0rem;
    @media only screen and (max-width: 512px) {
        margin:1.5rem -7rem 1.5rem 0rem;
    }
`;

const SLink = styled(NavLink)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:50%;
    margin-right:2rem;
    text-decoration:none;
    background:linear-gradient(35deg,#494949,#313131);
    width:6rem;
    height:6rem;
    cursor:pointer;
    transform:scale(0.8);
    @media only screen and (max-width: 512px) {
        width:4rem;
        height:4rem;
        margin:1rem 0.5rem 0.3rem 0rem;
        transform:scale(0.9);
        border-radius:50%;
    }

    h4{
        color:white;
        font-size:1rem;
        @media only screen and (max-width: 512px) {
            font-size:0.75rem;
            padding:1rem;
            margin:-0.8rem 0.1rem;
        }
    }
    svg{
        color:white;
        font-size:1.8rem;
        @media only screen and (max-width: 512px) {
            font-size:1.2rem;
        }
    }
    img{
        height:40%;
        width:50%;
        @media only screen and (max-width: 512px) {
            height:30%;
            width:40%;
        }
    }
    &.active { 
        background:linear-gradient(to right,#f27121,#e94057);
        
        svg{
            color:white;
        }
        h4{
            color:white;
        }
    }

`; 

export default Category
