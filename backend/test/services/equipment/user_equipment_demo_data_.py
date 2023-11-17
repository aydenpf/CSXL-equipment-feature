"""
Includes mock data to be loaded in by the reset_demo script
"""

from enum import Enum
import pytest
from sqlalchemy.orm import Session

from backend.models.equipment import Equipment
from backend.models.equipment_checkout_request import EquipmentCheckoutRequest
from backend.models.permission import Permission


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
