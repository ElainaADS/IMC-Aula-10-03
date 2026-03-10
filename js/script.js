/**
 * Configura a data limite do nascimento
 * @author Elaina Thomazini <elainathomazini@hotmail.com>
 * @since 2026-02-24
 * @version 1.0.0
 * @description Esta função busca o campo data pelo id e aplica o atributo max com o dia atual.
 */
function configuraDataLimite(){
    const limite = new Date().toISOString().split("T")[0]
    const inputNasc = document.getElementById('nascimento')
    if(inputNasc){
        inputNasc.setAttribute('max', limite)
    }
    //alert(limite)
}

//Inicialização
document.addEventListener('DOMContentLoaded', configuraDataLimite)

/** 
*Calcula o Indice de massa corporal (IMC)
*author Elaina Thomazini
* @since 2026-02-24
* @version 1.0.0
* @description Esta função calcula o IMC com base no peso e altura fornecidos pelo usuário
*@param {number} peso - O peso da pessoa em kg
*@param {number} altura - A altura da pessoa em metros
*@returns {number} O valor do IMC calculado
*/

function CalcularIMC (peso, altura){
    const IMC = peso / (altura *altura)
    return IMC

}
//console.log(CalcularIMC(79,1.70))

/** 
*Calcula a classificação do IMC
*author Elaina Thomazini
* @since 2026-02-24
* @version 1.0.0
* @description Esta função calcula a Classificação do IMC a partir do IMC informado
*@param {number} IMC - O valor do IMC
*@returns {string} A classificação do IMC. Ex: Peso Normal, Sobrepeso, etc.
*/
function obterClassificacaoIMC(IMC){
    let resultado = ""
    if (IMC < 18.5){
        resultado = "Abaixo do Peso" }
    else if (IMC < 25)  {
        resultado ="Peso Normal"  } 
    else if (IMC < 30){
        resultado = "Sobrepeso"  } 
    else {resultado = "Obesidade"}
    return resultado
}
//console.log(obterClassificacaoIMC(17.55))]

/**
 * Função que processa o calculo e exibe o usuario na UI
 * @param {Event} event - O evento de submissão do formulário
 */

function processaCalculo (event){
    if (event) event.preventDefault() // evita o recarregamento da pagina//captura os campos
    const nome = document . getElementById ('nome').value
    const nascimento = document . getElementById ('nascimento').value
    const peso = document .getElementById ('peso').value
    const altura = document . getElementById ('altura').value
    const divResultado = document . getElementById ('resultado')
    //validação basica
    if(!nome || !nascimento || isNaN (peso) || isNaN(altura)){
        alert('Por favor, preencha todos os campos corretamente')
        return
    }

    //efetuando os calculos com as funções criadas
    const imc = CalcularIMC (peso,altura)
    const classificacao = obterClassificacaoIMC (imc)
    const idade = calcularIdade(nascimento)

    //mostrando o resultado na div
    divResultado.style.display = 'block' // exibe a div novamente na UI
    divResultado.innerHTML = `
                             Resultado para <strong> ${nome}: </strong>: <br>
                             IMC: <strong> ${imc.toFixed(2)} </strong><br>
                             Idade: <strong> ${idade} </strong><br>
                             Status: <strong> ${classificacao}</strong>
                             `
    
              
                             
}
/**
 * Calcula a idade de uma pessoa a partir de seu nascimento
 * @param {string} nascimento - A data de nascimento no formato YYYY-MM-DD
 * @returns {number} a idade calculada em anos
 */
function calcularIdade (nascimento){
    const dataNasc = new Date (nascimento)
    const hoje = new Date ()
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())){
        idade-- //diminui um ano da idade pois ainda não chegou a data do aniversário
    }
    return idade
}

//Limpar o resultado
document.addEventListener('reset', () => {
    const divResultado = document.getElementById('resultado')
    //limpa o texto da div
    divResultado.innerHTML = ''
    //oculta o elemento
    divResultado.style.display = 'none'
})