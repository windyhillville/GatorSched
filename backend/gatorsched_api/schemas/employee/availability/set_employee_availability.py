from datetime import datetime, time
from typing import Literal

from pydantic import BaseModel, model_validator

from gatorsched_api.schemas.employee.availability.employee_availability import (
    EmployeeAvailability,
)


class SetEmployeeAvailabilityRequest(BaseModel):
    isAvailable: bool
    startHour: str | None = None
    startMinute: str | None = None
    startTimePeriod: Literal["AM", "PM"] | None = None
    endHour: str | None = None
    endMinute: str | None = None
    endTimePeriod: Literal["AM", "PM"] | None = None

    combined_start_time: time | None = None
    combined_end_time: time | None = None

    @model_validator(mode="after")
    def validate_and_combine_times(self) -> "SetEmployeeAvailabilityRequest":
        if not self.isAvailable:
            self.combined_start_time = None
            self.combined_end_time = None
            return self

        required_fields = [
            self.startHour,
            self.startMinute,
            self.startTimePeriod,
            self.endHour,
            self.endMinute,
            self.endTimePeriod,
        ]

        if any(field is None for field in required_fields):
            raise ValueError("All time fields are required when isAvailable is true.")

        start_str = f"{self.startHour}:{self.startMinute} {self.startTimePeriod}"
        end_str = f"{self.endHour}:{self.endMinute} {self.endTimePeriod}"

        self.combined_start_time = datetime.strptime(start_str, "%I:%M %p").time()
        self.combined_end_time = datetime.strptime(end_str, "%I:%M %p").time()

        return self


class SetEmployeeAvailabilityResponse(BaseModel):
    dayOfWeek: int
    availability: EmployeeAvailability
