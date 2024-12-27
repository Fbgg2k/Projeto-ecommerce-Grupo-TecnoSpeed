function formatacaoDinheiro(valor){
    const valorFormatado = valor.toLocaleString('pt-br',{style:'currency',currency:'BRL'})
    return valorFormatado
}
export default formatacaoDinheiro