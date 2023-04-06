import chalk from 'chalk';
import fs from 'fs';

function extraiLink (texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const resultado =  [...texto.matchAll(regex)];
    const resultadoMapeado = resultado.map(resultado => ({[resultado[1]] : resultado[2]}));
    return resultadoMapeado.length !== 0 ? resultadoMapeado : 'Não há links no texto informado.';
}

function trataErro (err) {
    throw new Error (console.log(chalk.bgRed(err.code, 'Favor verificar se o arquivo está corretamente inserido.')));
}

async function pegaArquivo (caminhoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);
        return extraiLink(texto);
    } catch (err) {
        trataErro(err);
    }
}

export default pegaArquivo;
// pegaArquivo('./arquivos/');