import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AutenticacaoConext";

export default function RotasPrivadasToten({ children, redirectTo }) {
    const { logado } = useAuth();
    return logado ? children : <Navigate to={redirectTo} />;
}
