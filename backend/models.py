from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from database import Base
from datetime import datetime
import enum

class GeneroEnum(str, enum.Enum):
    ROMANCE = "romance"
    FICCAO = "ficcao"
    NAO_FICCAO = "nao-ficcao"
    TECNICO = "tecnico"

class StatusEnum(str, enum.Enum):
    DISPONIVEL = "disponivel"
    EMPRESTADO = "emprestado"

class Livro(Base):
    __tablename__ = "livros"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(90), index=True, nullable=False)
    autor = Column(String, nullable=False)
    ano_publicacao = Column(Integer, nullable=False)
    genero = Column(Enum(GeneroEnum))
    isbn = Column(String)
    status = Column(Enum(StatusEnum), nullable=False, default=StatusEnum.DISPONIVEL)
    data_cadastro = Column(DateTime, default=datetime.utcnow)
    data_emprestimo = Column(DateTime, nullable=True)
