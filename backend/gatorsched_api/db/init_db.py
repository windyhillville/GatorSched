from gatorsched_api.db.base import Base
from gatorsched_api.db.session import engine


def init_db():
    Base.metadata.create_all(bind=engine)
