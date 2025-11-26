import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const basePath = path.join(process.cwd(), "data");

    // Garantir que a pasta /data existe
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const { tipo } = req.body;

    // ==================================================
    // SALVAR CARTÃO
    // ==================================================
    if (tipo === "salvarCartao") {
      const { arquivo, conteudo } = req.body;

      fs.writeFileSync(
        path.join(basePath, arquivo),
        conteudo,
        "utf8"
      );

      return res.status(200).json({ ok: true });
    }

    // ==================================================
    // CRIAR NOVO CARTÃO
    // ==================================================
    if (tipo === "novoCartao") {
      const { id, nome } = req.body;

      const cartoesPath = path.join(basePath, "cartoes.json");

      let lista = { cartoes: [] };

      // Se o arquivo existir, carrega
      if (fs.existsSync(cartoesPath)) {
        lista = JSON.parse(fs.readFileSync(cartoesPath, "utf8"));
      }

      // Inserir novo cartão
      lista.cartoes.push({
        id,
        nome,
        arquivo: `${id}.json`
      });

      fs.writeFileSync(cartoesPath, JSON.stringify(lista, null, 2), "utf8");

      // Criar arquivo do cartão
      fs.writeFileSync(
        path.join(basePath, `${id}.json`),
        JSON.stringify(
          {
            backgroundImage: "",
            backgroundOpacity: 1,
            logo: "",
            botoes: [],
            servicos: []
          },
          null,
          2
        ),
        "utf8"
      );

      return res.status(200).json({ ok: true });
    }

    // ==================================================
    // REMOVER CARTÃO
    // ==================================================
    if (tipo === "excluirCartao") {
      const { id } = req.body;

      const cartoesPath = path.join(basePath, "cartoes.json");

      if (!fs.existsSync(cartoesPath))
        return res.status(400).json({ erro: "cartoes.json não existe" });

      const lista = JSON.parse(fs.readFileSync(cartoesPath, "utf8"));

      const atualizados = lista.cartoes.filter(c => c.id !== id);

      fs.writeFileSync(
        cartoesPath,
        JSON.stringify({ cartoes: atualizados }, null, 2),
        "utf8"
      );

      // Remover arquivo do cartão
      const arquivoCartao = path.join(basePath, `${id}.json`);
      if (fs.existsSync(arquivoCartao)) fs.unlinkSync(arquivoCartao);

      return res.status(200).json({ ok: true });
    }

    res.status(400).send("Requisição inválida");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
}
