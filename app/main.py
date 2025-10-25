# In app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .routers import auth_router

# This creates your tables (if they don't exist)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 1. Define the origins that are allowed to make requests
origins = [
    "http://localhost:3000",
]

# 2. Add the CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True, # Allows cookies (if you use them)
    allow_methods=["*"],    # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)

# 3. Include your auth router
app.include_router(auth_router.router)

# 4. Your existing root route
@app.get("/")
def read_root():
    return {"message": "Auth backend running"}