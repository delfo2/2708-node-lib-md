function extraiLink(arrLink) {
    return arrLink.map((array) => Object.values(array).join());
}

async function checaURL (listaURLs) {
    const status = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const urlLink = await fetch(url, { method: 'HEAD'});
                return urlLink.status;
            } catch (err) {
                return manejaErro(err);
            }
        })
    )
    return status;
}

function manejaErro (err) {
    if(err.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado.'
    } else {
        return 'Algo deu errado ao checar o link.'
    }
}

export default async function validaLinks (links) {
    const unpackedLink = extraiLink(links);
    const statusLink = await checaURL(unpackedLink);
    
    return links.map((obj, i) => ({
        ...obj,
        status: statusLink[i]
    }));
}
