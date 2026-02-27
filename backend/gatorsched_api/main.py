from fastapi import FastAPI

from gatorsched_api.api.v1.router import api_router
from gatorsched_api.api.v1.routes.health import get_version
from gatorsched_api.db.init_db import init_db

app = FastAPI(title="GatorSched API", version=get_version())
app.include_router(api_router)


@app.on_event("startup")
def on_startup() -> None:
    init_db()
