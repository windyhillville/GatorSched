from pydantic import BaseModel


class RequestDecisionResponse(BaseModel):
    success: bool
