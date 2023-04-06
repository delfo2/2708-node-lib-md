import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";
import validaLinks from "./validaLink.js";

const caminho = process.argv;

async function mostrarResultado (valida, resultado, id = '') {
    if(valida) {
        console.log(
            chalk.inverse('Lista de links validados:'),
            chalk.black.bgGreen(id),
            await validaLinks(resultado)
        );
    } else {
        console.log(
            chalk.inverse('Lista de Links: '),
            chalk.black.bgGreen(id),
            resultado
        );
    }
}

async function processaTexto (local) {
    const caminhoUser = local[2];
    const valida = local[3] === '--valida';

    try {
        fs.lstatSync(caminhoUser);
    } catch (erro) {
        if(erro.code === 'ENOENT') {
            console.log('Diretório ou arquivo não existe.');
            return;
        }
    }
    
    if (fs.lstatSync(caminhoUser).isFile()) {
        const resultado = await pegaArquivo(caminhoUser);
        mostrarResultado(valida, resultado);
    }
    else if (fs.lstatSync(caminhoUser).isDirectory()) {
        const arquivos = fs.readdirSync(caminhoUser);
        arquivos.forEach(async (arquivo) => {
            const lista = await pegaArquivo(`${caminhoUser}/${arquivo}`);
            mostrarResultado(valida, lista, arquivo);
        })
    }
}

processaTexto(caminho);