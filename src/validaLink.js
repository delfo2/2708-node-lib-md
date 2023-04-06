function extraiLink(arrLink) {
    return arrLink.map((array) => Object.values(array).join());
}

async function checaURL (listaURLs) {
    const status = await Promise.all(
        listaURLs.map(async (url) => {
            const urlLink = await fetch(url);
            return urlLink.status;
        })
    )
    return status;
}

export default async function validaLinks (links) {
    const unpackedLink = extraiLink(links);
    const statusLink = await checaURL(unpackedLink);
    return statusLink;
}

//[gatinho salsicha](http://gatinhosalsicha.com.br/)