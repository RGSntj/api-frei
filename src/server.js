import express from 'express';

const servidor = express();

servidor.use(express.json());

servidor.get("/calculadora/somar/:n1/:n2", (req, res) => {
  const n1 = Number(req.params.n1);
  const n2 = Number(req.params.n2);

  const total = n1 + n2;

  return res.send({
    soma: total
  })
})

servidor.listen(3000, () => console.log("Servidor rodando 🔥🔥"));