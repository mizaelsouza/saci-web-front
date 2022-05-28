import { faEdit, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Children } from "react";
import { CantainerLista, Icons, ListaSemDados } from "../Styles/EstiloComum";

export function ListaPadrao({ dados, children, onAlteracao }) {
  return (
    <>
      {dados.length <= 0 ? (
        <ListaSemDados>Lista Sem Informação</ListaSemDados>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  );
}
