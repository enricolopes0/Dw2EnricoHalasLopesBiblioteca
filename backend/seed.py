from sqlalchemy.orm import Session
from database import get_db, engine
from models import Livro
from datetime import datetime

def seed_database():
    db = next(get_db())
    
    # Lista de livros para seed
    livros = [
        {
            "titulo": "Dom Casmurro",
            "autor": "Machado de Assis",
            "ano_publicacao": 1899
        },
        {
            "titulo": "O Pequeno Príncipe",
            "autor": "Antoine de Saint-Exupéry",
            "ano_publicacao": 1943
        },
        {
            "titulo": "1984",
            "autor": "George Orwell",
            "ano_publicacao": 1949
        }
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
