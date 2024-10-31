import http from 'http';
import { helloWorld } from './hello-world';
import { helloDude } from './application';
import { getSystemInformation } from './application';

//const greet = helloWorld();
//console.log(greet);


const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/v1/sysinfo') {
        const sysinfo = getSystemInformation();
        // on récupère la variable depuis application.ts
        console.log('Server créé');
        // on affiche dans la console pour contrôler
        res.writeHead(200, {'Content-Type' : 'application/json'});
        // on affiche sur la page web
        res.end(JSON.stringify(sysinfo));
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('Erreur 404');
    }
})


server.listen(PORT, () => {
    console.log('Serveur en écoute sur http://localhost/api/v1/sysinfo');
})
