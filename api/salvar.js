import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const basePath = path.join(process.cwd(), "data");

    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

    const { tipo } = req.body;

    if (tipo === "salvarCartao") {
      const { arquivo, conteudo } = req.body;
      fs.writeFileSync(path.join(basePath, arquivo), conteudo, "utf8");
      return res.status(200).json({ ok: true });
    }

    if (tipo === "novoCartao") {
      const { id, nome } = req.body;
      const cartoesPath = path.join(basePath, "cartoes.json");

      let lista = { cartoes: [] };
      if (fs.existsSync(cartoesPath)) lista = JSON.parse(fs.readFileSync(cartoesPath, "utf8"));

      lista.cartoes.push({ id, nome, arquivo: `${id}.json` });
      fs.writeFileSync(cartoesPath, JSON.stringify(lista, null, 2), "utf8");

      fs.writeFileSync(
        path.join(basePath, `${id}.json`),
        JSON.stringify({ backgroundImage: "", backgroundOpacity: 1, logo: "", botoes: [], servicos: [] }, null, 2),
        "utf8"
      );

      return res.status(200).json({ ok: true });
    }

    if (tipo === "excluirCartao") {
      const { id } = req.body;
      const cartoesPath = path.join(basePath, "cartoes.json");
      const lista = JSON.parse(fs.readFileSync(cartoesPath, "utf8"));
      const novos = lista.cartoes.filter(x => x.id !== id);

      fs.writeFileSync(cartoesPath, JSON.stringify({ cartoes: novos }, null, 2));

      const arquivo = path.join(basePath, `${id}.json`);
      if (fs.existsSync(arquivo)) fs.unlinkSync(arquivo);

      return res.status(200).json({ ok: true });
    }

    res.status(400).send("Tipo inválido");
  } catch (e) {
    res.status(500).json({ erro: "Erro interno" });
  }
}
