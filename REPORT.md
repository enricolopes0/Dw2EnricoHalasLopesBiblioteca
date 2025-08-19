# Relatório Técnico: Sistema de Biblioteca

## Visão Geral
Este relatório documenta o desenvolvimento de um sistema web de biblioteca, implementado como parte de um projeto individual. O sistema permite o gerenciamento básico de livros, com funcionalidades de cadastro, listagem e remoção.

## Tecnologias Utilizadas

### Frontend
- **HTML5**: Estruturação da página web
- **CSS3**: Estilização utilizando Grid e Flexbox para layout responsivo
- **JavaScript**: Implementação da interatividade e comunicação com a API
  - ES6+ features utilizadas:
    - Async/Await para requisições assíncronas
    - Template literals para manipulação de strings
    - Arrow functions
    - Destructuring assignment

### Backend
- **Python 3.8+**
- **FastAPI**: Framework web para construção da API
- **SQLAlchemy**: ORM para interação com o banco de dados
- **SQLite**: Banco de dados relacional
- **Pydantic**: Validação de dados e serialização
- **Uvicorn**: Servidor ASGI para execução da aplicação

## Arquitetura do Sistema

### Estrutura do Projeto
```
biblioteca/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── database.py
│   ├── seed.py
│   └── requirements.txt
├── README.md
└── REPORT.md
```

### Padrões de Projeto Utilizados
1. **MVC (Model-View-Controller)**
   - Model: Implementado através dos modelos SQLAlchemy
   - View: Frontend em HTML/CSS/JS
   - Controller: Rotas FastAPI

2. **RESTful API**
   - Endpoints seguindo convenções REST
   - Métodos HTTP apropriados (GET, POST, DELETE)
   - Respostas JSON padronizadas

## Funcionalidades Implementadas
1. Cadastro de livros
2. Listagem de livros
3. Remoção de livros
4. Validação de dados
5. Feedback visual para o usuário
6. Interface responsiva

## Desafios e Soluções

### 1. CORS
- **Desafio**: Permitir requisições do frontend para o backend
- **Solução**: Implementação de middleware CORS no FastAPI

### 2. Responsividade
- **Desafio**: Layout adaptável a diferentes tamanhos de tela
- **Solução**: Uso de CSS Grid e Flexbox

### 3. Estado da Aplicação
- **Desafio**: Manter lista de livros atualizada
- **Solução**: Recarregamento automático após operações

## Melhorias Futuras
1. Implementação de autenticação
2. Sistema de empréstimos
3. Busca e filtros
4. Categorização de livros
5. Testes automatizados
6. Cache de dados no frontend

## Conclusão
O projeto atende aos requisitos básicos de um sistema de biblioteca, demonstrando a aplicação prática de conceitos modernos de desenvolvimento web. A arquitetura escolhida permite fácil manutenção e extensão do sistema.
