import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { tipo } = req.body;

  if (tipo === "salvarCartao") {
    const { arquivo, conteudo } = req.body;

    fs.writeFileSync(
      path.join(process.cwd(), "data", arquivo),
      conteudo
    );

    return res.status(200).json({ ok: true });
  }

  if (tipo === "novoCartao") {
    const { id, nome } = req.body;

    const cartoesPath = path.join(process.cwd(), "data", "cartoes.json");
    const lista = JSON.parse(fs.readFileSync(cartoesPath));

    lista.cartoes.push({
      id,
      nome,
      arquivo: `${id}.json`
    });

    fs.writeFileSync(cartoesPath, JSON.stringify(lista, null, 2));

    fs.writeFileSync(
      path.join(process.cwd(), "data", `${id}.json`),
      JSON.stringify({
        backgroundImage: "",
        backgroundOpacity: 1,
        logo: "",
        botoes: [],
        servicos: []
      }, null, 2)
    );

    return res.status(200).json({ ok: true });
  }

  res.status(400).send("Requisição inválida");
}
