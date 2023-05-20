import { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';

import api from '../lib/api.js';
import { Token } from '../interfaces/User.js';
import { useNavigate } from 'react-router-dom';





interface PropsLoginUser{
    email: string;
    password: string;
}
interface PropsUser{
    name: string;
    email: string;
    password: string;
}

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [use, setUse] = useState<Token|null>();

    const navigate = useNavigate()

    useEffect(() => {
        const tokenAcesso = localStorage.getItem('token');
        console.log(tokenAcesso? 'login': 'logout');
        if (tokenAcesso ) {
            const token = JSON.parse(tokenAcesso)
            const tokenUser = decodeToken<Token>(token);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
            setUse(tokenUser);
            navigate('/home');
        }
        setLoading(false);
    }, []);

    async function handleLogin(dataLogin:PropsLoginUser) {
        console.log(dataLogin)
        try {
            const response = await api.post('/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
            },
              email: dataLogin.email,
              password: dataLogin.password
            });
        
            const tokenUser = decodeToken<Token>(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
            setUse(tokenUser);
            setAuthenticated(true);
            navigate('/home');
          } catch (error) {
            throw new Error("email or password are incorrect.");
          }
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = '';
        window.location.href="/"
    }

   
    async function handleRegisterUser(data:PropsUser) {
        try {
            const response = await api.post('/users', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
            },
              name: data.name,  
              email: data.email,
              password: data.password
            });
        
            const tokenUser = decodeToken<Token>(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
            setUse(tokenUser);
            setAuthenticated(true);
          } catch (error:any) {
            throw new Error(error.message);
          }
    }

    return { authenticated, loading, handleLogin, handleLogout, setAuthenticated, use, handleRegisterUser};
}