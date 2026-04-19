from pydantic import BaseModel


class ManageAssignmentRequest(BaseModel):
    employeeIds: list[str]


class ManageAssignmentResponse(BaseModel):
    success: bool
