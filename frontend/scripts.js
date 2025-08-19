const API_URL = 'http://localhost:8000';
let livros = [];
let filtrosAtivos = {
    genero: '',
    ano: '',
    status: '',
    texto: ''
};

// Configuração de ordenação
let ordenacao = localStorage.getItem('ordenacao') || 'titulo';
const ITENS_POR_PAGINA = 10;
let paginaAtual = 1;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    inicializarEventos();
    carregarLivros();
});

// Inicializar eventos
function inicializarEventos() {
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            abrirModalNovoLivro();
        }
    });

    // Eventos de filtro
    document.getElementById('busca').addEventListener('input', debounce(aplicarFiltros, 300));
    document.getElementById('filtro-genero').addEventListener('change', aplicarFiltros);
    document.getElementById('filtro-ano').addEventListener('input', debounce(aplicarFiltros, 300));
    document.getElementById('filtro-status').addEventListener('change', aplicarFiltros);

    // Botões e modais
    document.getElementById('btn-novo-livro').addEventListener('click', abrirModalNovoLivro);
    document.getElementById('btn-exportar').addEventListener('click', exportarDados);
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', fecharModais);
    });

    // Formulários
    document.getElementById('form-livro').addEventListener('submit', salvarLivro);
    document.getElementById('form-emprestimo').addEventListener('submit', processarEmprestimo);

    // Scroll infinito
    window.addEventListener('scroll', verificarScrollInfinito);
}

// Funções de gerenciamento de livros
async function carregarLivros() {
    try {
        const response = await fetch(`${API_URL}/livros/`);
        if (!response.ok) throw new Error('Erro ao carregar livros');
        
        livros = await response.json();
        aplicarFiltros();
    } catch (error) {
        mostrarErro('Erro ao carregar livros');
    }
}

function aplicarFiltros() {
    const textoBusca = document.getElementById('busca').value.toLowerCase();
    const genero = document.getElementById('filtro-genero').value;
    const ano = document.getElementById('filtro-ano').value;
    const status = document.getElementById('filtro-status').value;

    let livrosFiltrados = livros.filter(livro => {
        const matchTexto = textoBusca === '' || 
            livro.titulo.toLowerCase().includes(textoBusca) || 
            livro.autor.toLowerCase().includes(textoBusca);
        const matchGenero = genero === '' || livro.genero === genero;
        const matchAno = ano === '' || livro.ano_publicacao.toString() === ano;
        const matchStatus = status === '' || livro.status === status;

        return matchTexto && matchGenero && matchAno && matchStatus;
    });

    // Ordenação
    livrosFiltrados.sort((a, b) => {
        if (ordenacao === 'titulo') {
            return a.titulo.localeCompare(b.titulo);
        } else {
            return b.ano_publicacao - a.ano_publicacao;
        }
    });

    exibirLivros(livrosFiltrados.slice(0, ITENS_POR_PAGINA));
    paginaAtual = 1;
}

function exibirLivros(livrosExibir) {
    const grid = document.querySelector('.livros-grid');
    grid.innerHTML = '';

    livrosExibir.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
            <div class="livro-info">
                <h3>${livro.titulo}</h3>
                <p>${livro.autor}</p>
                <p>Ano: ${livro.ano_publicacao}</p>
                <p>Gênero: ${livro.genero}</p>
                <p class="status-${livro.status}">${livro.status}</p>
                ${livro.isbn ? `<p>ISBN: ${livro.isbn}</p>` : ''}
            </div>
            <div class="card-acoes">
                <button class="btn btn-secundario" onclick="gerenciarEmprestimo(${livro.id})">
                    ${livro.status === 'disponivel' ? 'Emprestar' : 'Devolver'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

async function salvarLivro(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const livro = Object.fromEntries(formData);

    // Validar título duplicado
    if (livros.some(l => l.titulo.toLowerCase() === livro.titulo.toLowerCase())) {
        mostrarErro('Já existe um livro com este título');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/livros/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });

        if (!response.ok) throw new Error('Erro ao salvar livro');

        await carregarLivros();
        fecharModais();
        form.reset();
    } catch (error) {
        mostrarErro('Erro ao salvar livro');
    }
}

async function gerenciarEmprestimo(id) {
    const livro = livros.find(l => l.id === id);
    if (!livro) return;

    try {
        const novoStatus = livro.status === 'disponivel' ? 'emprestado' : 'disponivel';
        const response = await fetch(`${API_URL}/livros/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: novoStatus,
                data_emprestimo: novoStatus === 'emprestado' ? new Date().toISOString() : null
            })
        });

        if (!response.ok) throw new Error('Erro ao atualizar status');

        await carregarLivros();
    } catch (error) {
        mostrarErro('Erro ao processar empréstimo/devolução');
    }
}

// Funções auxiliares
function exportarDados() {
    const livrosFiltrados = aplicarFiltros();
    const csv = [
        ['Título', 'Autor', 'Ano', 'Gênero', 'ISBN', 'Status', 'Data Empréstimo'],
        ...livrosFiltrados.map(l => [
            l.titulo,
            l.autor,
            l.ano_publicacao,
            l.genero,
            l.isbn || '',
            l.status,
            l.data_emprestimo || ''
        ])
    ].map(row => row.join(',')).join('\\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biblioteca_export.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function verificarScrollInfinito() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        const inicio = paginaAtual * ITENS_POR_PAGINA;
        const fim = inicio + ITENS_POR_PAGINA;
        const proximaPagina = livrosFiltrados.slice(inicio, fim);
        
        if (proximaPagina.length > 0) {
            paginaAtual++;
            exibirLivros([...document.querySelectorAll('.livro-card'), ...proximaPagina]);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function mostrarErro(mensagem) {
    // Implementar toast ou notificação
    console.error(mensagem);
}

function abrirModalNovoLivro() {
    document.getElementById('modal-novo-livro').classList.add('active');
}

function fecharModais() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}
