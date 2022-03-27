import styled from 'styled-components';
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Search = () => {
    const [input,setInput] = useState('');
    const [maxFat,setMaxFat] = useState(25);
    const navigate = useNavigate();
    const submitHandler = (e) =>{
        e.preventDefault();
        navigate('/searched/'+input);
        
    };
  return (
    <FormStyle 
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity:0}}
    transition={{duration: 0.5}}
    onSubmit={submitHandler}>
        <div>
        <FaSearch/>
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
        </div>
    </FormStyle>
    )
}
const FormStyle = styled(motion.form)`
    margin:0.1rem 1rem -1rem -3rem;
    @media only screen and (max-width: 512px) {
        margin: -1.5rem -1rem -0.9rem -4rem;
    }
    div{
        justify-content:center;
        align-items:center;
        position:relative;
        display:flex;
        @media only screen and (max-width: 512px) {
            width:150%;
        }
        
    }
    input{
        margin-left:1rem;
        border:none;
        background:linear-gradient(35deg,#494949,#313131);
        font-size:1.5rem;
        color:white;
        padding:0.6rem 2rem;
        border:none;
        border-radius:0.8rem;
        outline:none;
        width:60%;
        @media only screen and (max-width: 512px) {
            width:200%;
            margin-left:2rem;
        }
    }
    svg{
        position:absolute;
        top:50%;
        left:20%;
        transform:translate(100%,-50%);
        color:white;
        @media only screen and (max-width: 512px) {
            left:8%;
        }
    }
`;

export default Search