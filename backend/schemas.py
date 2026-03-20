from pydantic import BaseModel, EmailStr
from typing import Optional

class PessoaSchema(BaseModel):
    nome: str
    email: EmailStr
    data_nascimento: str 

class UpdatePessoaModel(BaseModel):
    nome: Optional[str]
    email: Optional[EmailStr]
    data_nascimento: Optional[str]
    