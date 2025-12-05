# ⚛️ VISO BASS REACT

Aplicação web para monitoramento de dados da API VISO BASS.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 🚀 Tecnologias

- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Grazziano/VISO-BASS-REACT.git
cd viso-bass
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
- Interface responsiva
<!-- - Sistema de alertas
- Tema claro/escuro -->

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

## 📄 Licença

MIT

---

</> Feito com React + TypeScript + Tailwind
