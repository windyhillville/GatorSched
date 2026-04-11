from enum import StrEnum


class EmployeeRequestStatus(StrEnum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    cancelled = "cancelled"


class ManagerRequestStatus(StrEnum):
    not_sent = "not_sent"
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
