from pydantic import BaseModel


class CreateSwapRequestPayload(BaseModel):
    requesterAssignmentId: str
    coverAssignmentId: str


class CreateSwapResponse(BaseModel):
    success: bool
