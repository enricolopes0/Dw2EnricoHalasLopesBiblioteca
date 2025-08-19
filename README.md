# Sistema de Biblioteca

Um sistema web completo para gerenciamento de biblioteca, desenvolvido com Python FastAPI no backend e HTML/CSS/JavaScript puro no frontend.

## Tecnologias Utilizadas

### Backend
- Python 3.8+
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

### Frontend
- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript (ES6+)

## Estrutura do Projeto

```
biblioteca/
│
├── backend/
│   ├── requirements.txt
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── routes.py
│
└── frontend/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Como Executar

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Crie um ambiente virtual:
```bash
python -m venv venv
```

3. Ative o ambiente virtual:
```bash
# Windows
venv\Scripts\activate
```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

5. Execute o servidor:
```bash
uvicorn main:app --reload
```

O backend estará rodando em `http://localhost:8000`

### Frontend

1. Abra o arquivo `index.html` em seu navegador
   - Para desenvolvimento local, você pode usar a extensão "Live Server" do VS Code

## Funcionalidades

- Cadastro de livros
- Listagem de livros
- Exclusão de livros
- Interface responsiva
- API RESTful

## Documentação da API

Com o servidor rodando, acesse:
- Documentação Swagger UI: `http://localhost:8000/docs`
- Documentação ReDoc: `http://localhost:8000/redoc`

## Desenvolvimento

Este projeto foi desenvolvido como parte de um exercício técnico, utilizando:
- VS Code como IDE
- GitHub Copilot para assistência no desenvolvimento
- Git para controle de versão
- Thunder Client/Insomnia para testes da API
