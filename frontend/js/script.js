const API_URL = 'http://localhost:8000';

// Função para carregar os livros
async function carregarLivros() {
    try {
        const response = await fetch(`${API_URL}/livros/`);
        const livros = await response.json();
        exibirLivros(livros);
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

// Função para exibir os livros na página
function exibirLivros(livros) {
    const listaDiv = document.getElementById('livros-lista');
    listaDiv.innerHTML = '';

    livros.forEach(livro => {
        const livroCard = document.createElement('div');
        livroCard.className = 'livro-card';
        livroCard.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano_publicacao}</p>
            <p><strong>Status:</strong> ${livro.disponivel ? 'Disponível' : 'Indisponível'}</p>
            <button class="delete-btn" onclick="deletarLivro(${livro.id})">Deletar</button>
        `;
        listaDiv.appendChild(livroCard);
    });
}

// Função para adicionar um novo livro
async function adicionarLivro(evento) {
    evento.preventDefault();

    const formData = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        ano_publicacao: parseInt(document.getElementById('ano').value)
    };

    try {
        const response = await fetch(`${API_URL}/livros/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            document.getElementById('livro-form').reset();
            carregarLivros();
        } else {
            console.error('Erro ao adicionar livro');
        }
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
    }
}

// Função para deletar um livro
async function deletarLivro(id) {
    if (confirm('Tem certeza que deseja deletar este livro?')) {
        try {
            const response = await fetch(`${API_URL}/livros/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                carregarLivros();
            } else {
                console.error('Erro ao deletar livro');
            }
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
        }
    }
}

// Event Listeners
document.getElementById('livro-form').addEventListener('submit', adicionarLivro);

// Carregar livros ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarLivros);
