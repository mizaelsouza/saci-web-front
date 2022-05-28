import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import styled from "styled-components";

const InfoProdutos = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  margin: 5px;
  max-width: 99%;
`;
const DetalhesProdutos = styled.div`
  width: 17%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  position: relative;

  div {
    margin-top: 0;

    a {
      margin-top: 0;
      text-decoration: none;
    }
  }
`;
const Titulo = styled.div`
  color: #212529;
  font-weight: 400;
  opacity: 0.8;
  h3 {
    position: relative;
    bottom: 0;
    margin-top: 15px;
  }
  span {
    position: absolute;
    margin: 0px;
    font-size: 12px;
  }
`;

const Btn_Novo = styled.div`
  right: 0px;
  position: absolute;
`;

export default function HeaderCadastro({
  descricao,
  status,
  onStatus,
  onNovo,
  nome,
  ativarStatus = false,
  ativarBotao = false,
}) {
  return (
    <InfoProdutos>
      <Titulo>
        <span>Cadastro de</span>
        <h3>{nome}</h3>
      </Titulo>
      <DetalhesProdutos>
        {ativarStatus && (
          <div>
            <BootstrapSwitchButton
              onlabel="Ativo"
              offlabel="Inativo"
              width={100}
              checked={status}
              size="xs"
              onChange={onStatus}
            />
          </div>
        )}
        {ativarBotao && (
          <Btn_Novo onClick={onNovo}>
            <a href="#">{descricao ? descricao : "Novo"}</a>
          </Btn_Novo>
        )}
      </DetalhesProdutos>
    </InfoProdutos>
  );
}
