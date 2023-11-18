"""
Includes mock data to be loaded in by the reset_demo script
"""

from enum import Enum
import pytest
from sqlalchemy.orm import Session
from backend.entities.equipment_checkout_request_entity import (
    EquipmentCheckoutRequestEntity,
)
from backend.entities.equipment_entity import EquipmentEntity
from backend.entities.permission_entity import PermissionEntity

from backend.models.equipment import Equipment
from backend.models.equipment_checkout_request import EquipmentCheckoutRequest
from backend.models.permission import Permission
from backend.test.services.reset_table_id_seq import reset_table_id_seq
from backend.test.services.role_data import ambassador_role


class DeviceType(Enum):
    META_QUEST_3 = "https://s7d1.scene7.com/is/image/dmqualcommprod/meta-quest-3-1?$QC_Responsive$&fmt=png-alpha"

    ARDUINO_UNO = (
        "https://www.circuitbasics.com/wp-content/uploads/2020/05/Arduino-Uno.png"
    )


# add equipment data
quest_3 = Equipment(
    equipment_id=1,
    model="Meta Quest 3",
    equipment_image=DeviceType.META_QUEST_3.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)
arduino = Equipment(
    equipment_id=2,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

arduino2 = Equipment(
    equipment_id=3,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

arduino3 = Equipment(
    equipment_id=4,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=True,
    condition_notes=[],
    checkout_history=[],
)

quest_3_two = Equipment(
    equipment_id=5,
    model="Meta Quest 3",
    equipment_image=DeviceType.META_QUEST_3.value,
    condition=9,
    is_checked_out=True,
    condition_notes=["Lights on fire whenever it is turned on."],
    checkout_history=[111111111],
)

# add mock equipment checkout requests
checkout_request_quest_3 = EquipmentCheckoutRequest(model="Meta Quest 3", pid=111111111)
checkout_request_arduino = EquipmentCheckoutRequest(model="Arduino Uno", pid=999999999)

# add necessary permissions to data
ambassador_permission_equipment = Permission(
    id=4, action="equipment.update", resource="equipment"
)
ambassador_permission_delete_checkout_request = Permission(
    id=5, action="equipment.delete_request", resource="equipment"
)
ambassador_permission_get_all_requests = Permission(
    id=6, action="equipment.get_all_requests", resource="equipment"
)

permissions = [
    ambassador_permission_get_all_requests,
    ambassador_permission_delete_checkout_request,
    ambassador_permission_delete_checkout_request,
]

checkout_requests = [checkout_request_quest_3, checkout_request_arduino]
equipment = [quest_3, arduino, arduino2, arduino3, quest_3_two]


def insert_fake_data(session: Session):
    global equipment, permissions, checkout_requests

    for item in equipment:
        entity = EquipmentEntity.from_model(item)
        session.add(entity)

    for request in checkout_requests:
        entity = EquipmentCheckoutRequestEntity.from_model(request)
        session.add(entity)

    for i in range(0, len(permissions)):
        ambassador_permission_entity = PermissionEntity(
            id=permissions[i].id,
            role_id=ambassador_role.id,
            action=permissions[i].action,
            resource=permissions[i].resource,
        )
        session.add(ambassador_permission_entity)

    # Reset table IDs to prevent ID conflicts
    reset_table_id_seq(session, EquipmentEntity, EquipmentEntity.id, len(equipment) + 1)
    reset_table_id_seq(
        session, PermissionEntity, PermissionEntity.id, len(permissions) + 4
    )
    reset_table_id_seq(
        session,
        EquipmentCheckoutRequestEntity,
        EquipmentCheckoutRequestEntity.id,
        len(checkout_requests) + 1,
    )
    # commit all changes
    session.commit()
