from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    # bcrypt only supports passwords up to 72 bytes
    if len(password.encode("utf-8")) > 72:
        # Option 1 (recommended): raise an error for clarity
        raise ValueError("Password too long (maximum 72 characters allowed for bcrypt).")
        # Option 2 (alternative): uncomment below line if you prefer automatic truncation
        # password = password[:72]

    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    # Same check before verifying
    if len(plain_password.encode("utf-8")) > 72:
        raise ValueError("Password too long (maximum 72 characters allowed for bcrypt).")
        # Or: plain_password = plain_password[:72]
    
    return pwd_context.verify(plain_password, hashed_password)
