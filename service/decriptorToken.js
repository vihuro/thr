
const Decriptor = (token) => {
    const tokenDescription = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString());

    return tokenDescription;

}

export default Decriptor;