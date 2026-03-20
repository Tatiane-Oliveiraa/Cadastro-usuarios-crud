from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import pessoa_collection, pessoa_helper
from schemas import PessoaSchema, UpdatePessoaModel
from bson import ObjectId

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pessoa")
async def add_pessoa(pessoa: PessoaSchema = Body(...)):
    new_pessoa = await pessoa_collection.insert_one(pessoa.dict())
    return {"id": str(new_pessoa.inserted_id)}

@app.get("/pessoas")
async def get_pessoas():
    pessoas = []
    async for pessoa in pessoa_collection.find():
        pessoas.append(pessoa_helper(pessoa))
    return pessoas

@app.delete("/pessoa/{id}")
async def delete_pessoa(id: str):
    delete_result = await pessoa_collection.delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return {"message": "Pessoa deletada com sucesso"}
    raise HTTPException(status_code=404, detail="Pessoa não encontrada")

@app.put("/pessoa/{id}")
async def update_pessoa(id: str, data: UpdatePessoaModel = Body(...)):
    
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    
    if len(update_data) >= 1:
        update_result = await pessoa_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": update_data}
        )
        if update_result.modified_count == 1:
            return {"message": "Pessoa atualizada"}
            
    raise HTTPException(status_code=404, detail="Pessoa não encontrada")