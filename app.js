//inizializzazione server
const express = require('express')
const app = express()
const cors = require("cors");
const port = 3000

// importiamo modulo router 
const movieRouter = require("./routers/movies")

//importo middleware notFound
const notFound = require("./middlewares/notFound")

//importo middleware errorServer
const errorServer = require("./middlewares/errorServer")

//import middleware gestione path immagini
const imagePath = require("./middlewares/imagePath")

app.use(cors({
origin: 'http://localhost:5173' 
}));

// usiamo il middleware static di express (per rendere disponibile i file statici)
app.use(express.static('public'));

//body parser
app.use(express.json());

//registro middleware gestione paths
app.use(imagePath);

// rotte 
app.use("/movies", movieRouter);

// impostiamo la rotta di home
app.get("/", (req, res) => {
    console.log("hai richiesto la rotta di index");
    res.send('<h1>Ecco la home della API del nostro blog</h1>')
})

//registro il middleware per tutte le rotte 
app.use(notFound)
app.use(errorServer)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})