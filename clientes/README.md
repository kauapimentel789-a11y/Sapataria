# Clientes

Cada pasta tem o `config.js` de uma loja (nome, logo, unidades, Supabase).
O `config.js` da raiz é o da Sapataria Pimentel e é o padrão.

Para publicar outro cliente, crie um projeto na Vercel ligado a este repositório com:

- Build Command: `cp clientes/NOME/config.js config.js`
- Output Directory: `.`

## Clientes atuais

- Raiz (`config.js`): Sapataria Pimentel
- `clientes/cidral`: Sapataria Cidral (projeto `sapataria-cidral` na Vercel)
