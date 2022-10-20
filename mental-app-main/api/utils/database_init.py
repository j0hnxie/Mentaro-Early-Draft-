from sqlalchemy import create_engine
from sqlalchemy import text
engine = create_engine(
    "sqlite+pysqlite:///api/user-collection.db", echo=True, future=True)


with engine.connect() as conn:
    conn.execute(text("CREATE TABLE users (UserId INTEGER PRIMARY KEY, Username TEXT NOT NULL, Password TEXT NOT NULL)"))
    conn.commit()
    conn.execute(text("INSERT INTO users (Username, Password) VALUES ('user1', 'pass1')"))
    conn.execute(text("INSERT INTO users (Username, Password) VALUES ('user2', 'pass2')"))
    conn.commit()