from fastapi import FastAPI

app = FastAPI(title="GatorSched API")


@app.get("/health")
def health():
    return {"status": "ok"}
