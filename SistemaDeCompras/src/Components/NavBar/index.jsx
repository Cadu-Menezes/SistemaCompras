import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";

const Nav = styled.nav`
    background-color: #333;
    max-width: 100%;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    ${(props) => props.style}

    @media(min-width: ${(props) => props.breakpoints.small}){
        flex-direction: row;
        max-width: 100%;
    }
`;

const Logo = styled.img`
    height: 100px; 
    ${(props) => props.style}
`;

const Menu = styled.ul`
    list-style: none;
    display: flex;
    padding-left: 0;
    flex-direction: column;
    width: 100%;
    align-items: center;
    ${(props) => props.style}
   
    @media(min-width: ${(props) => props.breakpoints.small}){
        flex-direction: row;
        justify-content: flex-end;
        width: 70%;
    }
`;

const MenuItem = styled.li`
    font-size: 1rem;
    text-transform: uppercase;
    padding: 2%;
    ${(props) => props.style}
`;


const linkDefault = {
    color: 'white',
    textDecoration: 'none',
}

const NavBar = (props) => {

    return <> 
        <Nav breakpoints={props.breakpoints} >
            <Logo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYW1Q7NQ7qq8U_HPCxh3SFHKBK-RJC0mKh6Q&s" alt="Logo" />
            <Menu breakpoints={props.breakpoints}>
                <MenuItem><Link style={{...linkDefault}} to="/">Inicio</Link></MenuItem>
                <MenuItem><Link style={{...linkDefault}} to="/produtos">Produtos</Link></MenuItem>
                <MenuItem><Link style={{...linkDefault}} to="/fornecedores">Fornecedores</Link></MenuItem>
                <MenuItem><Link style={{...linkDefault}} to="/contatos">Contato</Link></MenuItem>
                <MenuItem><Link style={{...linkDefault}} to="/cotacao">Cotacao</Link></MenuItem>
            </Menu>
            <Avatar src="https://tm.ibxk.com.br/2024/02/27/27184211661338.jpg?ims=1200x675" alt="Avatar do usuário" size={40} />
        </Nav>
    </>
};

export default NavBar;