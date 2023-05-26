const http = require("http")
const fs = require("fs")

const server =http.createServer((request, response)=>{
  //roteamento
  switch (request.method) {
    case "GET":
      
      break;
    case "POST":
    
    break;
  }
})

const port =3333
server.listen(port, ()=>{console.log(`Servidor rodando na porta ${port}`)})