import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import { logout } from '../../Utils/AuthUtils'; 

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
};

const DropdownMenu = styled.div`
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #333;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    display: ${props => (props.show ? 'block' : 'none')};
    width: 120px;
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 10px;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #444;
    }
`;

const NavBar = ({ breakpoints, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Função para verificar o papel do usuário no localStorage
    const ProfileUser = () => {
        const role = localStorage.getItem('perfil'); 
        console.log("Role: ", role);
        return role 
    };

    const handleAvatarClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
        try {
            await logout(); 
            setIsAuthenticated(false); // Atualiza o estado de autenticação no App.js
            navigate('/login', { replace: true }); // Redireciona para a tela de login
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <Nav breakpoints={breakpoints}>
            <Logo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYW1Q7NQ7qq8U_HPCxh3SFHKBK-RJC0mKh6Q&s" alt="Logo" />
            <Menu breakpoints={breakpoints}>
                <MenuItem><Link style={linkDefault} to="/">Inicio</Link></MenuItem>
                <MenuItem><Link style={linkDefault} to="/produtos">Produtos</Link></MenuItem>
                <MenuItem><Link style={linkDefault} to="/fornecedores">Fornecedores</Link></MenuItem>
                <MenuItem><Link style={linkDefault} to="/contatos">Contatos</Link></MenuItem>
                <MenuItem><Link style={linkDefault} to="/cotacao">Cotações</Link></MenuItem>
                {ProfileUser() != "colaborador" && (
                    <MenuItem><Link style={linkDefault} to="/requisicao">Requisições</Link></MenuItem>
                )}
                {ProfileUser() != "colaborador" && (
                    <MenuItem><Link style={linkDefault} to="/usuarios">Usuarios</Link></MenuItem>
                )}
                
            </Menu>
            <div style={{ position: 'relative' }}>
                <Avatar 
                    src="https://tm.ibxk.com.br/2024/02/27/27184211661338.jpg?ims=1200x675" 
                    alt="Avatar do usuário" 
                    size={40} 
                    onClick={handleAvatarClick} 
                    style={{ cursor: 'pointer' }} 
                />
                <DropdownMenu show={showDropdown}>
                    <DropdownItem onClick={() => { /* Navegar para Perfil */ }}>Perfil</DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
            </div>
        </Nav>
    );
};

export default NavBar;