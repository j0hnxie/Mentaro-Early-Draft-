from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy import text
engine = create_engine(
    "sqlite+pysqlite:///user-collection.db", echo=True, future=True)


def login(username, password):
    with engine.connect() as conn:
        result = conn.execute(text(
            "select * from users where Username = :username"), {'username': username})
        # for row in :
        res = result.fetchone()
        if res is not None:
            if res['Password'] == password:
                return res['UserId']
            else: 
                return None
        else:
            return None