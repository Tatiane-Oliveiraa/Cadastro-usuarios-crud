import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_URL")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.desafio_db
pessoa_collection = database.get_collection("pessoas_collection")

# Helper para converter ID do Mongo para String
def pessoa_helper(pessoa) -> dict:
    return {
        "id": str(pessoa["_id"]),
        "nome": pessoa["nome"],
        "email": pessoa["email"],
        "data_nascimento": pessoa["data_nascimento"],
    }