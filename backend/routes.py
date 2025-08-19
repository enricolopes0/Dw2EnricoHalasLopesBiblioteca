from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
from typing import List
from pydantic import BaseModel, Field
from datetime import datetime

router = APIRouter()

class LivroBase(BaseModel):
    titulo: str = Field(..., min_length=1, description="Título do livro")
    autor: str = Field(..., min_length=1, description="Nome do autor")
    ano_publicacao: int = Field(..., gt=0, lt=9999, description="Ano de publicação")

class LivroCreate(LivroBase):
    pass

class Livro(LivroBase):
    id: int
    disponivel: bool
    data_cadastro: datetime

    class Config:
        orm_mode = True

@router.post("/livros/", response_model=Livro, status_code=status.HTTP_201_CREATED)
def criar_livro(livro: LivroCreate, db: Session = Depends(get_db)):
    try:
        db_livro = models.Livro(**livro.dict())
        db.add(db_livro)
        db.commit()
        db.refresh(db_livro)
        return db_livro
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno do servidor ao criar livro"
        )

@router.get("/livros/", response_model=List[Livro], status_code=status.HTTP_200_OK)
def listar_livros(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        livros = db.query(models.Livro).offset(skip).limit(limit).all()
        return livros
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno do servidor ao listar livros"
        )

@router.get("/livros/{livro_id}", response_model=Livro, status_code=status.HTTP_200_OK)
def obter_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()
    if livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Livro não encontrado"
        )
    return livro

@router.delete("/livros/{livro_id}", status_code=status.HTTP_200_OK)
def deletar_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()
    if livro is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Livro não encontrado"
        )
    try:
        db.delete(livro)
        db.commit()
        return {"message": "Livro deletado com sucesso"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno do servidor ao deletar livro"
        )
