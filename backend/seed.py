from sqlalchemy.orm import Session
from database import get_db, engine
from models import Livro
from datetime import datetime

def seed_database():
    db = next(get_db())
    
    # Lista de livros para seed
    livros = [
        {"titulo": "Dom Casmurro", "autor": "Machado de Assis", "ano_publicacao": 1899},
        {"titulo": "O Pequeno Príncipe", "autor": "Antoine de Saint-Exupéry", "ano_publicacao": 1943},
        {"titulo": "1984", "autor": "George Orwell", "ano_publicacao": 1949},
        {"titulo": "Memórias Póstumas de Brás Cubas", "autor": "Machado de Assis", "ano_publicacao": 1881},
        {"titulo": "Vidas Secas", "autor": "Graciliano Ramos", "ano_publicacao": 1938},
        {"titulo": "Grande Sertão: Veredas", "autor": "João Guimarães Rosa", "ano_publicacao": 1956},
        {"titulo": "O Alquimista", "autor": "Paulo Coelho", "ano_publicacao": 1988},
        {"titulo": "Capitães da Areia", "autor": "Jorge Amado", "ano_publicacao": 1937},
        {"titulo": "O Cortiço", "autor": "Aluísio Azevedo", "ano_publicacao": 1890},
        {"titulo": "Macunaíma", "autor": "Mário de Andrade", "ano_publicacao": 1928},
        {"titulo": "Quincas Borba", "autor": "Machado de Assis", "ano_publicacao": 1891},
        {"titulo": "Senhora", "autor": "José de Alencar", "ano_publicacao": 1875},
        {"titulo": "A Hora da Estrela", "autor": "Clarice Lispector", "ano_publicacao": 1977},
        {"titulo": "Sagarana", "autor": "João Guimarães Rosa", "ano_publicacao": 1946},
        {"titulo": "O Guarani", "autor": "José de Alencar", "ano_publicacao": 1857},
        {"titulo": "Iracema", "autor": "José de Alencar", "ano_publicacao": 1865},
        {"titulo": "A Moreninha", "autor": "Joaquim Manuel de Macedo", "ano_publicacao": 1844},
        {"titulo": "O Ateneu", "autor": "Raul Pompéia", "ano_publicacao": 1888},
        {"titulo": "Memórias de um Sargento de Milícias", "autor": "Manuel Antônio de Almeida", "ano_publicacao": 1854},
        {"titulo": "O Auto da Compadecida", "autor": "Ariano Suassuna", "ano_publicacao": 1955}
    ]
    
    # Adiciona os livros ao banco de dados
    for livro_data in livros:
        livro = Livro(**livro_data)
        db.add(livro)
    
    db.commit()
    db.close()

if __name__ == "__main__":
    # Cria as tabelas
    from models import Base
    Base.metadata.create_all(bind=engine)
    
    # Executa o seed
    seed_database()
    print("Database seeded successfully!")
