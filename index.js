const express = require('express')
const fs = require("fs").promises
const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log("Conexion en http://localhost:3000/")
})

// Obtener Todos
app.get("/animes", (req, res) => {
  fs.readFile("anime.json", "utf-8")
  .then((data) => {
    const animes = JSON.parse(data)

    res.status(200).json(animes)
  })
  .catch((err) => {
    res.status(500).send("No se pudo procesar la peticion: " + err)
  })
})

// Obtener uno
app.get("/animes/:id", (req, res) => {
  const { id } = req.params
  fs.readFile("anime.json", "utf-8")
  .then((data) => {
    const animes = JSON.parse(data)

    if(!animes[id]){
      res.status(404).send("Anime No Encontrado")
    }else{
      res.status(200).json(animes[id])
    }
  })
  .catch((err) => {
    res.status(500).send("No se pudo procesar la peticion: " + err)
  })
})

// Crear uno
app.post("/animes", (req, res) => {
  const animeNuevo = req.body
  
  fs.readFile("anime.json", "utf-8")
  .then((data) => {
    const animes = JSON.parse(data)
    const animeKeys = Object.keys(animes)
    const newId = parseInt(animeKeys[animeKeys.length - 1]) + 1

    animes[newId] = animeNuevo

    fs.writeFile("anime.json", JSON.stringify(animes, null, 4))
    .then(() => {
      res.status(201).send("Anime Creado Exitosamente")
    })
    .catch((err) => {
      res.status(500).send("Error al crear el anime: " + err)
    })
  })
  .catch((err) => {
    res.status(500).send("No se pudo procesar la peticion: " + err)
  })
})

// Modificar uno
app.put("/animes/:id", (req, res) => {
  const {id} = req.params
  const animeNuevo = req.body
  
  fs.readFile("anime.json", "utf-8")
  .then((data) => {
    const animes = JSON.parse(data)

    if(!animes[id]){
      res.status(404).send("Anime no existe, no se modifico")
    }else{
      animes[id] = animeNuevo

      fs.writeFile("anime.json", JSON.stringify(animes, null, 4))
      .then(() => {
        res.status(201).send("Anime modificado Exitosamente")
      })
      .catch((err) => {
        res.status(500).send("Error al modificar el anime: " + err)
      })
    }
  })
  .catch((err) => {
    res.status(500).send("No se pudo procesar la peticion: " + err)
  })
})

// Eliminar uno
app.delete("/animes/:id", (req, res) => {
  const {id} = req.params
  
  fs.readFile("anime.json", "utf-8")
  .then((data) => {
    const animes = JSON.parse(data)

    if(!animes[id]){
      res.status(404).send("Anime no existe, no se elimino")
    }else{
      delete animes[id]
      fs.writeFile("anime.json", JSON.stringify(animes, null, 4))
      .then(() => {
        res.status(201).send("Anime Eliminado Exitosamente")
      })
      .catch((err) => {
        res.status(500).send("Error al eliminar el anime: " + err)
      })
    }
  })
  .catch((err) => {
    res.status(500).send("No se pudo procesar la peticion: " + err)
  })
})
