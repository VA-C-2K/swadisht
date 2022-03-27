import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import {GiKnifeFork} from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <GiKnifeFork/>
        <Logo to={"/"}>Swadisht</Logo>
      </Nav>
        <Search/>
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration:none;
  font-size:1.7rem;
  font-weight:400;
  font-family: 'Amita', cursive;
  @media only screen and (max-width: 512px) {
    font-size:2rem;
    margin-bottom:0.5rem;
    margin-left:0.5rem;
    font-weight:900;
}

`;
const Nav = styled.div`
  padding:2rem 0rem;
  display:flex;
  justify-content:flex-start;
  align-item:center;

  svg{
    font-size:2.7rem;
    @media only screen and (max-width: 512px) {
      font-size:3rem;
  }
`;

export default App;
