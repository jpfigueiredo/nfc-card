NFC Card Premium - Projeto pronto para deploy (Firebase + Vercel)

Estrutura do projeto já preparada. Instruções rápidas:

1) No Firebase console:
   - Crie um projeto
   - Ative Firestore (modo Native)
   - Ative Storage

2) Atualize firebase-config.js com suas credenciais (o arquivo já vem preenchido com as que você forneceu).

3) No Firebase (temporário para testes) coloque regras publicas (apenas para teste):
   Firestore: allow read, write: if true;
   Storage: allow read, write: if true;
   (Atenção: alterar para regras seguras depois)

4) Deploy: faça commit no seu repositório GitHub e importe no Vercel, ou faça upload e deploy.

5) Acesse o painel admin:
   /admin/admin_login.html  (Senha: A1B2C3D4)

6) Crie cartões, faça upload de imagens direto no painel e abra a versão pública:
   /?id=SEU_ID&public=1

Arquivos incluidos: index.html, firebase-config.js, /admin/*, /api/salvar.js (backup)
