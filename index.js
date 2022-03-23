// Stwórz serwer http. Niech nasłuchuje na porcie 3000,
// zwraca ile razy wszedłeś na http://localhost:3000. Najpierw wyświetl
// 1, potem 2 itd...

const {createServer}= require ('http');
const {readFile,writeFile}= require('fs').promises;


const server= createServer();

server.on('request', async (req, res)=>{
    if ( req.url=== '/' && req.method=== 'GET'){

        let counter= Number(await readFile('./index.txt','utf8'));
        counter++;
        await writeFile('./index.txt', `${counter}`);

        res.writeHead(200, {
            'content-type':'text/plain',
        });
        res.end(`${counter}`);
    } else {
        res.writeHead(404, {
            'content-type':'text/html',
        });
        res.end('<h1>Not found! </h1>');
    }

});

server.listen(3000,'localhost');