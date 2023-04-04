import chalk from 'chalk';
import fs from 'fs';

function pegaArquivo (caminhoArquivo) {
    fs.readFile(caminhoArquivo, 'utf-8', (_, res) => {
        console.log(chalk.inverse(res));
    })
}

pegaArquivo('./arquivos/texto.md');