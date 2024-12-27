import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { useNavigate } from "react-router-dom";

function Table() {
    const { subtotalCart, totalCart } = useContext(ShopContext);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col text-lg w-full border-t border-gray-400">
            {/* Resumo */}
            <div className="flex justify-between py-2 text-customBlue">
                <span>Valor dos Produtos:</span>
                <span>R$ {(subtotalCart).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-customBlue">
                <span>Frete:</span>
                <span>Grátis</span>
            </div>
            <div className="flex justify-between py-2 text-customBlue">
                <span>Descontos:</span>
                <span>R$ {(subtotalCart - totalCart).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-extra-bold py-2 text-customBlue">
                <span>Total da Compra:</span>
                <span>R$ {(totalCart).toFixed(2)}</span>
            </div>
        </div>
    );
}

export default Table;
