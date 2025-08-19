from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
from typing import List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class LivroBase(BaseModel):
    titulo: str
    autor: str
    ano_publicacao: int

class LivroCreate(LivroBase):
    pass

class Livro(LivroBase):
    id: int
    disponivel: bool
    data_cadastro: datetime

    class Config:
        orm_mode = True

@router.post("/livros/", response_model=Livro)
def criar_livro(livro: LivroCreate, db: Session = Depends(get_db)):
    db_livro = models.Livro(**livro.dict())
    db.add(db_livro)
    db.commit()
    db.refresh(db_livro)
    return db_livro

@router.get("/livros/", response_model=List[Livro])
def listar_livros(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    livros = db.query(models.Livro).offset(skip).limit(limit).all()
    return livros

@router.get("/livros/{livro_id}", response_model=Livro)
def obter_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()
    if livro is None:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return livro

@router.delete("/livros/{livro_id}")
def deletar_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()
    if livro is None:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    db.delete(livro)
    db.commit()
    return {"message": "Livro deletado com sucesso"}
