# Ligar os eventos compartilhados (Firebase) — passo a passo

Hoje o código da nuvem já está no site, porém **desligado** (o site funciona
normal, com os eventos salvos só no navegador). Para ligar e fazer todos os
visitantes verem os mesmos eventos, siga os passos abaixo **uma única vez**.

## 1. Criar o projeto no Firebase (grátis, sem cartão)

1. Acesse https://console.firebase.google.com (logado na sua conta Google).
2. **Criar projeto** → nome `flowtickets` → pode desativar o Google Analytics → Criar.

## 2. Criar o banco (Firestore)

1. Menu esquerdo: **Build → Firestore Database → Criar banco de dados**.
2. Modo **produção** → região **`southamerica-east1`** (São Paulo) → Ativar.
3. Aba **Regras (Rules)** → apague tudo → cole o conteúdo do arquivo
   **`firestore.rules`** (nesta pasta) → **Publicar**.

## 3. Criar o login do painel (Authentication)

1. Menu: **Build → Authentication → Começar**.
2. **Email/Senha → Ativar → Salvar**.
3. Aba **Users → Adicionar usuário** → coloque **seu e-mail e uma senha**.
   (Esse será o login do `admin.html`.)

## 4. Pegar a configuração e colar no código

1. Ícone **⚙ (engrenagem) → Configurações do projeto**.
2. Role até **Seus aplicativos** → clique no ícone **`</>`** (Web) → apelido
   `site` → **Registrar app**.
3. Copie os valores do `firebaseConfig` mostrado.
4. Abra **`flow-cloud.js`** e preencha o objeto `FLOW_FIREBASE_CONFIG` com esses
   valores (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).
5. Publique a mudança:
   ```bash
   git add -A && git commit -m "Ativar nuvem Firebase" && git push
   ```

Pronto. A partir daí:
- **Visitantes** veem os eventos vindos da nuvem.
- **Painel admin** pede login; ao salvar um evento, publica pra todos.

## Observação de segurança

As regras liberam escrita para qualquer usuário logado. Como só você cria
usuários (pelo Console) e o painel não tem tela de cadastro, isso é suficiente
para este site. Se quiser travar ainda mais (só um usuário específico), dá para
fixar o UID nas regras depois — é só pedir.
