from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
# In app/routers/auth_router.py

from .. import models, schemas, database
from ..auth import hash, token  # <-- This is the fix


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register", response_model=schemas.UserCreate)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(
        (models.User.username == user.username) | (models.User.email == user.email)
    ).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username or Email already registered")
    hashed_pwd = hash.hash_password(user.password)
    new_user = models.User(username=user.username, email=user.email, password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return user  # don't return password

@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not hash.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = token.create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}
