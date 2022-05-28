import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../componentes/context/AutenticacaoConext.js";

import {
    Container,
    ContainerSelect,
    ListaVazia,
} from "../../../componentes/Styles/EstiloMidia.js";
import { getListarMidia } from "../../../servicos/loginDAO/MidiaDigitalDAO.js";

import { ListaProdutos } from "./ListaDeProdutos";
import ReactFullscreeen from "react-easyfullscreen";
import imgDefault from "../../../assets/padrao/CARRINHO.jpg";

function MidiaView() {
    const [urlFundo, setUrlFundo] = useState('')
    const [midiaEscolhida, setMidiaEscolhida] = useState(false);
    const [midias, setMidias] = useState(0);
    const [config, setConfig] = useState([]);

    const {id}  = useParams()

    useEffect(() => {
        carregaConfiguracaoDefault();
         onVerificarIdMidia()
    }, []);

    const onVerificarIdMidia = () => {
        if(id){
            setMidias(id)
            setMidiaEscolhida(true);
        }
    }

    const carregaConfiguracaoDefault = async () => {
        const result = await getListarMidia();
        const { midia } = result.data;
        setConfig(midia);
    };

    const onEscolherMidia = (midia) => {
        const url = config.filter(itens => itens.id === parseInt(midia)).map(itens => itens.fundo_url)
       
        if (
            midias === 0 ||
            midias === undefined ||
            midias === "" ||
            midias === "Nenhuma"
        )
            return;
        setUrlFundo(url[0])
        setMidiaEscolhida(true);
    };




    return (
                <Container
                    url={urlFundo ? urlFundo : imgDefault}                    
                >                  
                
                    {!midiaEscolhida && (
                        <ListaVazia>                            
                            <ContainerSelect
                                className="form-control"
                                onChange={(e) => setMidias(e.target.value)}
                            >                                
                                <option>Nenhuma</option>
                                {config.map((itens, index) => (
                                    <option value={itens.id} key={index}>
                                        {itens.descricao}
                                    </option>
                                ))}
                            </ContainerSelect>
                            <div className="row g-3">
                                <div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => onEscolherMidia(midias)}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </ListaVazia>
                    )}

                    {midiaEscolhida &&
                     <ListaProdutos midia={midias} />
                     }
                     
                </Container>
          
    );
}

export default MidiaView;
