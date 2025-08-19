from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base
from datetime import datetime

class Livro(Base):
    __tablename__ = "livros"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    autor = Column(String)
    ano_publicacao = Column(Integer)
    disponivel = Column(Boolean, default=True)
    data_cadastro = Column(DateTime, default=datetime.utcnow)
