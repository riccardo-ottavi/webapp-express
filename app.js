//inizializzazione server
const express = require('express')
const app = express()
const port = 3000

// importiamo modulo router 
const movieRouter = require("./routers/movies")

//importo middleware notFound
const notFound = require("./middlewares/notFound")

//importo middleware errorServer
const errorServer = require("./middlewares/errorServer")

// usiamo il middleware static di express (per rendere disponibile i file statici)
app.use(express.static('public'));

//body parser
app.use(express.json());

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