import React, { useEffect } from 'react'
import { Navigate   } from 'react-router-dom';
import { AsyncStorage } from 'AsyncStorage';
import { useAuth } from '../../context/AutenticacaoConext';

export default function RotasPrivadas({children, redirectTo}){
       
    const {logado} = useAuth()
    return logado ? children : <Navigate to={redirectTo} />

}