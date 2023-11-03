"""Definition of SQLAlchemy table-backed object mapping entity for Equipment."""

from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self

from backend.models.equipment import Equipment
from .entity_base import EntityBase
from .user_role_table import user_role_table

__authors__ = ["Jacob Brown, Nicholas Mountain"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class EquipmentEntity(EntityBase):
    """Serves as the database model schema defining the shape of the `Equipment` table"""

    # Unique ID for the equipment entry
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    # Equipment ID of the equipment (should be unique per equipment)
    equipment_id: Mapped[int] = mapped_column(Integer, unique=True, index=True)
    # Name of the model of the item ex. Meta Quest 3
    model: Mapped[str] = mapped_column(String(64))
    # Shows if item is currently checked out
    is_checked_out: Mapped[bool] = mapped_column(Boolean)
    # Notes on how the condition of the item has changed throughout checkouts
    # TODO
    # List of the PIDs of students who have checkout out this item
    # TODO

    @classmethod
    def from_model(cls, model: Equipment) -> Self:
        """
        Create an EquipmentEntity from an Equipment model.

        Args:
            model (Equipment): The model to create the entity from.

        Returns:
            Self: The entity (not yet persisted).
        """
        return cls(
            equipment_id=model.equipment_id,
            model=model.model,
            is_checked_out=model.is_checked_out,
        )

    def to_model(self) -> Equipment:
        """
        Create an Equipment model from a EquipmentEntity.

        Returns:
            Equipment: An Equipment model for API usage.
        """
        return Equipment(
            equipment_id=self.equipment_id,
            model=self.model,
            is_checked_out=self.is_checked_out,
        )

    def update(self, model: Equipment) -> None:
        """
        Update an EquipmentEntity from an Equipment model.

        Args:
            model (Equipment): The model to update the entity from.

        Returns:
            None
        """
        self.equipment_id = model.equipment_id
        self.model = model.model
        self.is_checked_out = model.is_checked_out
