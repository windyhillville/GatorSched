from fastapi import FastAPI

from gatorsched_api.api.v1.router import api_router
from gatorsched_api.api.v1.routes.health import get_version

app = FastAPI(title="GatorSched API", version=get_version())
app.include_router(api_router)
