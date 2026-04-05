from importlib.metadata import PackageNotFoundError
from importlib.metadata import version as pkg_version

from fastapi import APIRouter

from gatorsched_api.core.config import APP_NAME

router = APIRouter(tags=["Meta"])


def get_version() -> str:
    try:
        return pkg_version(APP_NAME)
    except PackageNotFoundError:
        return "0.0.0"


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/version")
def version_info():
    return {"name": APP_NAME, "version": get_version()}
