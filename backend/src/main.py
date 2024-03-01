from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise import Tortoise

from src.database.register import register_tortoise
from src.database.config import TORTOISE_ORM


# enable schemas to read relationship between models
Tortoise.init_models(["src.database.models"], "models")
from src.routes import users, symptoms, red_flags, disease

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)
app.include_router(symptoms.router)
app.include_router(red_flags.router)
app.include_router(disease.router)

register_tortoise(app, config=TORTOISE_ORM)


@app.get("/")
def home():
    return "Hello, World!"
