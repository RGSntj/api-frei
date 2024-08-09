import express from 'express';

const servidor = express();

servidor.use(express.json());

servidor.post("/acai/total", (req, resp) => {
  const qtdP = req.body.qtdP;
  const qtdM = req.body.qtdM;
  const qtdG = req.body.qtdG;

  const desconto = Number(req.query.desconto);
  let precoTotal = (qtdP * 13.5) + (qtdM * 15) + (qtdG * 17.5);

  // let totalFinal = 0;
  
  if (desconto > 0){
    const desc = precoTotal * desconto / 100;
    let totalFinal = precoTotal - desc;

    resp.send({
      total: `O preço total foi de ${totalFinal}`
    })
  }

  resp.send({
    total: `O preço total foi de ${precoTotal}`
  })
})

servidor.get("/nota/media/:n1/:n2/:n3", (req,resp) =>{
  let nota1 = Number(req.params.n1);
  let nota2 = Number(req.params.n2);
  let nota3 = Number(req.params.n3);
  let nota = (nota1 + nota2 + nota3)/3
  resp.send({
    nota:nota
  })
})

servidor.post("/livro", (req, resp) => {
  try {
    const { livro, paginas, tempoPorPagina } = req.body;

    if (!Number(paginas)){
      throw new Error("Páginas tem que ser número !")
    }

    if (!Number(tempoPorPagina)){
      throw new Error("Tempo por paginas tem que ser número !") 
    }

    const horasLidas = paginas * tempoPorPagina / 3600;

    resp.send({
      horaCompleta: `Você irá ler o livro ${livro} em ${horasLidas.toFixed(0)} horas`
    })
  } catch (error) {
    return resp.status(400).send({
      error: error.message
    })
  }
});
// Amarelo, Azul, Vermelho
servidor.get("/cores", (req, resp) => {
  const combinacaoCor = {
    "azul:amarelo": "verde",
    "amarelo:vermelho": "laranja",
    "vermelho:azul": "roxo"
  }

  const coresPrimarias = ["amarelo", "vermelho", "azul"]
  
  try {
    const corUm = req.query.cor1;
    const corDois = req.query.cor2;

    if (!coresPrimarias.includes(corUm) || !coresPrimarias.includes(corDois)) {
      throw new Error("Uma das cores não são primarias.")
    }

    const corCombinada = `${corUm}:${corDois}`;

    // console.log(corCombinada);

    const resultado = combinacaoCor[corCombinada];

    // console.log(resultado);

    return resp.send({
      corResultante: resultado
    })
  } catch (error) {
    return resp.status(400).send({
      error: error.message
    })
  }
})

servidor.listen(3000, () => console.log("Servidor rodando"));