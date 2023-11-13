"""Mock data for equipment.

"""

import pytest
from sqlalchemy.orm import Session
from backend.entities.permission_entity import PermissionEntity

from backend.models.permission import Permission
from backend.test.services import role_data
from .reset_table_id_seq import reset_table_id_seq
from ...entities.equipment_entity import EquipmentEntity
from ...models.equipment import Equipment
from enum import Enum


__authors__ = ["Nicholas Mountain, Jacob Brown, Ayden Franklin"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class DeviceType(Enum):
    META_QUEST_3 = (
        "https://i.pinimg.com/736x/db/06/6f/db066fa23a204492e71eba3113e98bce.jpg"
    )
    ARDUINO_UNO = "https://w7.pngwing.com/pngs/76/730/png-transparent-arduino-uno-microcontroller-atmega328-electronics-arduino-uno-electronics-electronic-device-microcontroller-thumbnail.png"


quest_3 = Equipment(
    equipment_id=1,
    model="Meta Quest 3",
    equipment_image=DeviceType.META_QUEST_3.value,
    condition=10,
    is_checked_out=False,
)
arduino = Equipment(
    equipment_id=2,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=False,
)

arduino2 = Equipment(
    equipment_id=3,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=False,
)

arduino3 = Equipment(
    equipment_id=4,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=True,
)
quest_3_two = Equipment(
    equipment_id=5,
    model="Meta Quest 3",
    equipment_image=DeviceType.META_QUEST_3.value,
    condition=10,
    is_checked_out=True,
)

ambassador_permission_equipment = Permission(
    id=1, action="equipment.update", resource="equipment"
)

equipment = [quest_3, arduino, arduino2, arduino3, quest_3_two]


def insert_fake_data(session: Session):
    global equipment

    # Create entities for test equipment data
    entities = []
    for item in equipment:
        entity = EquipmentEntity.from_model(item)
        session.add(entity)
        entities.append(entity)

    # Add ambassador equipment permission for testing
    ambassador_entity = PermissionEntity(
        id=ambassador_permission_equipment.id,
        role_id=role_data.ambassador_role.id,
        action=ambassador_permission_equipment.action,
        resource=ambassador_permission_equipment.resource,
    )
    session.add(ambassador_entity)

    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, EquipmentEntity, EquipmentEntity.id, len(equipment) + 1)
    reset_table_id_seq(session, PermissionEntity, PermissionEntity.id, 2)

    # Commit all changes
    session.commit()
