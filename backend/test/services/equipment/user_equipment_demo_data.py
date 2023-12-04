"""Mock data for equipment demo.

"""

__authors__ = ["Nicholas Mountain, Jacob Brown, Ayden Franklin"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

from enum import Enum

from backend.models.equipment import Equipment


class DeviceType(Enum):
    META_QUEST_3 = "https://s7d1.scene7.com/is/image/dmqualcommprod/meta-quest-3-1?$QC_Responsive$&fmt=png-alpha"

    ARDUINO_UNO = (
        "https://www.circuitbasics.com/wp-content/uploads/2020/05/Arduino-Uno.png"
    )

    IPAD_AIR = "https://w7.pngwing.com/pngs/40/500/png-transparent-ipad-air-ipad-2-ipad-4-macbook-air-others-gadget-electronics-ipad-mini.png"

    ANDROID = "https://w7.pngwing.com/pngs/574/270/png-transparent-android-figurine-illustration-android-application-software-android-logo-logo-mobile-app-development-android-software-development.png"


# Create all the equipment for the demo

quest3_1 = Equipment(
    equipment_id=1,
    model="Meta Quest 3",
    equipment_image=DeviceType.META_QUEST_3.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

quest3_2 = Equipment(
    equipment_id=2,
    model="Meta Quest 3",
    equipment_image=DeviceType.META_QUEST_3.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

quest3_3 = Equipment(
    equipment_id=3,
    model="Meta Quest 3",
    equipment_image=DeviceType.META_QUEST_3.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

arduino_1 = Equipment(
    equipment_id=4,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

arduino_2 = Equipment(
    equipment_id=5,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

arduino_3 = Equipment(
    equipment_id=6,
    model="Arduino Uno",
    equipment_image=DeviceType.ARDUINO_UNO.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

ipad_1 = Equipment(
    equipment_id=7,
    model="Arduino Uno",
    equipment_image=DeviceType.IPAD_AIR.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

ipad_2 = Equipment(
    equipment_id=8,
    model="Arduino Uno",
    equipment_image=DeviceType.IPAD_AIR.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

ipad_3 = Equipment(
    equipment_id=9,
    model="Arduino Uno",
    equipment_image=DeviceType.IPAD_AIR.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

android_1 = Equipment(
    equipment_id=10,
    model="Arduino Uno",
    equipment_image=DeviceType.ANDROID.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)

android_2 = Equipment(
    equipment_id=11,
    model="Arduino Uno",
    equipment_image=DeviceType.ANDROID.value,
    condition=10,
    is_checked_out=False,
    condition_notes=[],
    checkout_history=[],
)
