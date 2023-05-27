const http = require("http")
const fs = require("fs")

function readFileJson(fileJson, callback) {
  fs.readFileSync(fileJson, "utf-8", (error, data)=>{
    if (error) {
      callback(error, null)
      return
    }

    try {
      const productData = JSON.parse(data)

      //verificar se os dados do array é uma lista
      if (!Array.isArray(productData)) {
        const error = new Error("Os dados do arquivo não são uma lista.")
        callback(error, null)
        return
      }

      callback(null, productData)
    } catch (error) {
      callback(error, null)
    }
  })
}


const server =http.createServer((request, response)=>{

  //roteamento
  switch (request.method) {
    case "GET":
      readFileJson('data/data.json', (error, data)=>{
        if (error) {
          console.error("Erro ao ler os dados do arquivo.", error)
          return
        }
        response.writeHead(200, {
          'Content-Type': 'application/json, charset=utf-8'
        })
        response.end(JSON.stringify(data))
        console.log(`Lista de produtos: ${data}`)
      })
      break;
    case "POST":
    console.log("post")
    break;
  }
})

const port = 3331
server.listen(port, ()=>{console.log(`Servidor rodando na porta ${port}`)})