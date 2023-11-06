"""Tests for the equipment service"""

from ...models.equipment import Equipment
from ...services.equipment import EquipmentService
import pytest
from sqlalchemy.orm import Session

from .user_equipment_data import equipment, quest_3, arduino


@pytest.fixture(autouse=True)
def equipment_service(session: Session):
    """This PyTest fixture is injected into each test parameter of the same name below.

    It constructs a new, empty EquipmentService object."""
    equipment_service = EquipmentService(session)
    return equipment_service


def test_getAll(equipment_service: EquipmentService):
    equipment_service.add_item(quest_3)
    equipment_service.add_item(arduino)
    fetched_equipment = equipment_service.getAll()
    assert fetched_equipment is not None
    assert len(fetched_equipment) == len(equipment)
    assert isinstance(fetched_equipment[0], Equipment)
    assert fetched_equipment[0] == quest_3
    assert fetched_equipment[1] == arduino


# def test_add_item(equipment_service: EquipmentService):
#     item = quest_3
#     assert equipment_service.add_item(item) == item
