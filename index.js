const http = require("http")
const fs = require("fs")
const { error } = require("console")

function readFileJson(fileJson, callback) {
  fs.readFile(fileJson, "utf-8", (error, data)=>{
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

function saveDataJson(datas, callback) {
  fs.readFile('data/data.json', 'utf-8',(error, data)=>{
    if (error) {
      callback(error)
      return
    }

    /**
     * Se a leitura do arquivo for bem sucedida o bloco try é acionado convertendo o json em objeto e salvando na variável, e adiciona os novos dados ao array. O writeFile vai converter objeto em json e salvar no arquivo.
     */
    try {
      const productData = JSON.parse(data)
      productData.push(datas)

      fs.writeFile("data/data.json", JSON.stringify(productData), 'utf-8', (error)=>{
        if (error) {
          callback(error)
          return
        }
        callback(null)
      })

    } catch (error) {
      callback(error)
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