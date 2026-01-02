# ⚛️ VISO BASS REACT

Aplicação web para monitoramento de dados da API VISO BASS.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 📸 Screenshots

### 🏠 Dashboard Principal

![Dashboard](./docs/screenshots/dark/dashboard_novo.png)

**Visão geral das métricas e gráficos principais**

### 📱 Interface Responsiva

<div align="center">
  <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
    <div style="text-align: center;">
      <img src="./docs/screenshots/mobile01.png" width="350" alt="Login Page">
      <!-- <p><em>Tela de Login</em></p> -->
    </div>
    <div style="text-align: center;">
      <img src="./docs/screenshots/mobile02.png" width="350" alt="Dashboard">
      <!-- <p><em>Dashboard</em></p> -->
    </div>
    <!-- <div style="text-align: center;">
      <img src="screenshots/settings.png" width="180" alt="Settings">
      <p><em>Configurações</em></p>
    </div> -->
  </div>
</div>

<!-- <div>

![Mobile images 01](./docs/screenshots/mobile01.png)
![Mobile images 02](./docs/screenshots/mobile02.png)

</div> -->

**Layout adaptado para dispositivos móveis**

## 🚀 Tecnologias

- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Grazziano/viso-bass-web.git
cd viso-bass-web
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env`:

```env
VITE_API_URL=url_da_api
```

4. Inicie o projeto:

```bash
npm run dev
```

## 🎯 Funcionalidades

- Dashboard com métricas gerais
- Gráficos interativos de histórico
- Monitoramento de dispositivos
- Controle de acesso (Admin / Usuário)
- Interface responsiva
<!-- - Sistema de alertas -->
- Tema claro/escuro

## 📁 Estrutura

```
src/
├── components/    # Componentes React
├── pages/         # Páginas da aplicação
├── services/      # Conexão com a API
├── types/         # Tipos TypeScript
└── styles/        # Estilos globais
```

## 🔌 API

A aplicação consome os endpoints da API VISO-BASS:

- `GET /object` - Lista objetos
- `GET /class` - Lista classes
- `GET /interaction` - Lista interações
- ...

[Link do repositório da API](https://github.com/Grazziano/VISO-BASS)

## 🛠️ Scripts

```bash
npm run dev        # Inicia servidor local
npm run build      # Cria build para produção
npm run lint       # Verifica código
npm run preview    # Previa build
```

## 👤 Usuário para Teste

Para fins de demonstração e testes, você pode utilizar as seguintes credenciais:

**Usuário de Demonstração:**

- **Email:** `demo@visobass.com`
- **Senha:** `Demo@123`

<!-- **Observações:**

- Este é um usuário de teste com permissões limitadas
- Os dados exibidos são de demonstração e não refletem informações reais em produção
- Recomendamos criar sua própria conta para uso personalizado

**Para criar uma nova conta:**

1. Clique em "Registrar" na página de login
2. Preencha os dados solicitados
3. Confirme seu email através do link enviado -->

## 📄 Licença

MIT

---

</> Feito com React + TypeScript + Tailwind
