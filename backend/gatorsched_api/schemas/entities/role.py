from pydantic import BaseModel, ConfigDict


class RoleBase(BaseModel):
    name: str
    color: str
    description: str


class RoleCreate(RoleBase):
    pass


class RoleRead(RoleBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
