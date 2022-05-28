import React, { useEffect, useState } from "react";
import { useAuth } from "../../../componentes/context/AutenticacaoConext.js";
import {
    ContainerLista,
    ContainerListaImg_Titulo,
    ContainerListaProduto,
    ConteudoImagem,
    ConteudoLista,
    ConteudoListaIMG,
    ImagemGrande,
    ImagemPequena,
    ListaVazia,
    PrefixoMoeda,
} from "../../../componentes/Styles/EstiloMidia.js";
import {
    getListarMidiaProdutosView,
    getListarProdutosEmOfertaView,
} from "../../../servicos/loginDAO/MidiaDigitalDAO.js";
import ReactFullscreeen from "react-easyfullscreen";
import { ListaOferta } from "./ListaOferta";
import semFoto from "./../../../assets/padrao/semfoto.png";
import {
    MidiaContainerFontes,
    MidiaFonteDescricao,
    MidiaFontePreco,
} from "../../../componentes/Styles/EstiloMidiaFontes.js";

export function ListaProdutos(props) {
    const [oferta, setOferta] = useState(false);
    const [ativarDualLista, setAtivarDualLista] = useState(false);

    const [dadosListaProdutos, setDadosListaProdutos] = useState([]);
    const [dadosListaProdutos1, setDadosListaProdutos1] = useState([]);
    const [dadosListaOferta, setDadosListaOferta] = useState([]);

    const [produtoEmOferta, setProdutoEmOferta] = useState({
        descricao: "",
        preco: "",
        url: "",
    });

    const [totPaginas, setTotPaginas] = useState(1);
    const [page, setPage] = useState(1);

    const [totPaginasOferta, setTotPaginasOferta] = useState(1);
    const [pageOferta, setPageOferta] = useState(1);

    const { idMidia } = useAuth();

    useEffect(() => {
        carregarListaPadrao();
        const intervalListaOferta = setInterval(() => {
            if (page <= totPaginas) {
                setPage((page) => page + 1);
            } else {
                setPage(1);
            }
        }, 10000);

        return () => {
            clearInterval(intervalListaOferta);
        };
    }, [page]);

    useEffect(() => {
        carregarListaOferta();

        const intervalListaOferta = setInterval(() => {
            if (pageOferta <= totPaginasOferta) {
                setPageOferta((pageOferta) => pageOferta + 1);
            } else {
                setPageOferta(1);
            }
        }, 10000);

        return () => {
            clearInterval(intervalListaOferta);
        };
    }, [pageOferta]);

    const carregarListaPadrao = async () => {
        if (page > totPaginas) {
            setPage(1);
            const result = await getListarMidiaProdutosView(1, props.midia);
            const { Paginas, midiaProdutos } = result.data;
            setTotPaginas(Paginas);
            setDadosListaProdutos(midiaProdutos);

            //console.log(midiaProdutos)
        } else {
            const result = await getListarMidiaProdutosView(page, props.midia);
            const { Paginas, midiaProdutos } = result.data;
            setTotPaginas(Paginas);
            setDadosListaProdutos(midiaProdutos);
        }

        //  setDadosListaProdutos1(pp);
    };

    const carregarListaOferta = async () => {
        const resultOferta = await getListarProdutosEmOfertaView(pageOferta);
        const { Paginas, Oferta } = resultOferta.data;
        setTotPaginasOferta(Paginas);

        //setDadosListaProdutos(midiaProdutos);
        if (Oferta.length <= 0) {
            setOferta(false);
            return;
        }

        if (Oferta.length > 0) {
            setOferta(true);
            Oferta.map((itens) => {
                setProdutoEmOferta({
                    descricao: itens.descricao,
                    preco: itens.preco,
                    url: itens.url,
                });
            });
        }
    };

    const verificaTamanhoDescricao = (tamanho, qtdCaracter = 40) => {
        let novo = "";
        if (tamanho.length > qtdCaracter) {
            novo = `${String(tamanho).slice(0, qtdCaracter)}`;
        } else {
            novo = tamanho;
        }
        return novo;
    };

    const formatarMoedas = (atual) => {
        var precoFormatado = atual.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });

        return precoFormatado;
    };
    return (
        <ReactFullscreeen>
            {({ onToggle }) => (
                <>
                    {dadosListaProdutos.length <= 0 ? (
                        <ListaVazia onClick={onToggle}>
                            <h1>Midia sem informação</h1>
                        </ListaVazia>
                    ) : (
                        <ContainerLista onClick={onToggle}>
                            {!oferta && (
                                <ConteudoLista width={!oferta ? 100 : 55}>
                                    {dadosListaProdutos.map((itens, index) => (
                                        <ContainerListaProduto
                                            height={15}
                                            key={index}
                                        >
                                            <ImagemPequena
                                                src={
                                                    itens.url
                                                        ? itens.url
                                                        : semFoto
                                                }
                                            />
                                            <MidiaContainerFontes>
                                                <MidiaFonteDescricao>
                                                    {verificaTamanhoDescricao(
                                                        itens.produto,
                                                    )}
                                                </MidiaFonteDescricao>
                                                <MidiaFontePreco>
                                                    {/*
                                                    <PrefixoMoeda>
                                                        R$
                                                    </PrefixoMoeda>
                                                    */}
                                                    {formatarMoedas(
                                                        itens.preco,
                                                    )}
                                                </MidiaFontePreco>
                                            </MidiaContainerFontes>
                                        </ContainerListaProduto>
                                    ))}
                                </ConteudoLista>
                            )}

                            {oferta && (
                                <>
                                    <ConteudoLista width={oferta ? 55 : 100}>
                                        {dadosListaProdutos.map(
                                            (itens, index) => (
                                                <ContainerListaProduto
                                                    height={15}
                                                    key={index}
                                                >
                                                    <ImagemPequena
                                                        src={
                                                            itens.url
                                                                ? itens.url
                                                                : semFoto
                                                        }
                                                    />
                                                    <MidiaContainerFontes>
                                                        <MidiaFonteDescricao
                                                            size={35}
                                                        >
                                                            {verificaTamanhoDescricao(
                                                                itens.produto,
                                                            )}
                                                        </MidiaFonteDescricao>
                                                        <MidiaFontePreco
                                                            size={45}
                                                        >
                                                            {formatarMoedas(
                                                                itens.preco,
                                                            )}
                                                        </MidiaFontePreco>
                                                    </MidiaContainerFontes>
                                                </ContainerListaProduto>
                                            ),
                                        )}
                                    </ConteudoLista>

                                    <ListaOferta
                                        descricao={verificaTamanhoDescricao(
                                            produtoEmOferta.descricao,
                                            19,
                                        )}
                                        preco={produtoEmOferta.preco}
                                        url={produtoEmOferta.url}
                                    />
                                </>
                            )}
                        </ContainerLista>
                    )}
                </>
            )}
        </ReactFullscreeen>
    );
}
