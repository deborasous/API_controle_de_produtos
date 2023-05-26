const http = require("http")
const fs = require("fs")

const server =http.createServer((request, response)=>{
  response.statusCode= 200
  response.setHeader("Content-type", "text/plain")
  response.end("Funcionando")
})

const port =3333
server.listen(port, ()=>{console.log(`Servidor rodando na porta ${port}`)})