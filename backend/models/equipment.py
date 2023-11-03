"""Equipment model serves as the data object for representing equipment across application layers."""

from pydantic import BaseModel

__authors__ = ["Nicholas Mountain, Jacob Brown"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class Equipment(BaseModel):
    """
    Pydantic model to represent how Equipment is identified in the system.

    This model is based on the `EquipmentEntity` model, which defines the shape
    of the `Equipment` database in the PostgreSQL database.
    """

    equipment_id: int
    model: str
    condition: int = 10
    is_checked_out: bool = False
    # TODO
    # notes: list[str]
    #  # list of PIDs for students that have checkout this equipment
