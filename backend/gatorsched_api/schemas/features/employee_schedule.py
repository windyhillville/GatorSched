from pydantic import BaseModel

class DaySummary(BaseModel):
  fromTime: str
  toTime: str
  longLabel: str
  shiftHours: float

class DayItem(BaseModel):
  key: str
  shortLabel: str
  timeRange: str
  summary: DaySummary

class EmployeeScheduleResponse(BaseModel):
  id: str
  color: str
  weekLabel: str
  totalHours: float
  schedule: list[DayItem]