import { ListaPadrao } from "../../componentes/listas/ListasPadrao";

const ListagemProdutos = ({ dados, children }) => {
  const formatarMoedas = (atual) => {
    var f = atual.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return f;
  };
  return (
    <div>
      {children}

      
    </div>
  );
};

export default ListagemProdutos;
