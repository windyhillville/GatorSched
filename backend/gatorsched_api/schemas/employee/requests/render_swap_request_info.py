from pydantic import BaseModel

from gatorsched_api.schemas.employee.requests.employee_requests import RequestPerson


class AssignmentSummary(BaseModel):
    assignmentId: str
    dayLabel: str
    monthAndDayLabel: str
    timeRange: str


class TeammateShiftGroup(BaseModel):
    teammateId: str
    shifts: list[AssignmentSummary]


class EmployeeSwapRequestInfoResponse(BaseModel):
    requester: RequestPerson
    requesterShifts: list[AssignmentSummary]
    eligibleTeammates: list[RequestPerson]
    eligibleTeammatesShifts: list[TeammateShiftGroup]
