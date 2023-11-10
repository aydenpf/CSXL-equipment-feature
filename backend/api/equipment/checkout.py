"""Equipment Checkout API

This API is used to manage and list user equipment checkouts"""

from fastapi import APIRouter, Depends, HTTPException

from backend.models.equipment_type import EquipmentType
from backend.models.user import User
from ...models.equipment import Equipment
from ...services.equipment import EquipmentService

from backend.api.authentication import registered_user

__authors__ = ["Nicholas Mountain", "Jacob Brown", "Ayden Franklin", "David Sprague"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

api = APIRouter(prefix="/api/equipment")
openapi_tags = {
    "name": "Equipment",
    "description": "Get Equipment and update equipment properties.",
}


@api.get("/get_all", tags=["Equipment"])
def get_all(equipment_service: EquipmentService = Depends()) -> list[Equipment]:
    """Gets all equipment in the database and returns to the user as a list of equipment models."""
    return equipment_service.get_all()


@api.put("/update", tags=["Equipment"])
def update(
    item: Equipment,
    equipment_service: EquipmentService = Depends(),
    subject: User = Depends(registered_user),
) -> Equipment:
    """Updates an item of equipment and returns the updated item as an equipment model"""
    return equipment_service.update(item)


@api.get("/get_all_types", tags=["Equipment"])
def get_all_types(
    equipment_service: EquipmentService = Depends(),
    subject: User = Depends(registered_user),
) -> list[EquipmentType]:
    """Gets all unique equipment types from database with correct available inventory and returns to the user as a list of equipment type models"""
    return equipment_service.get_all_types()
