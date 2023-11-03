"""Mock data for equipment.

"""

import pytest
from sqlalchemy.orm import Session
from .reset_table_id_seq import reset_table_id_seq
from ...entities.equipment_entity import EquipmentEntity
from ...models.equipment import Equipment


__authors__ = ["Nicholas Mountain, Jacob Brown"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


quest_3 = Equipment(
    equipment_id=1, model="Meta Quest 3", condition=10, is_checked_out=False
)
arduino = Equipment(equipment_id=2, model="Arduino Uno", is_checked_out=False)

equipment = [quest_3, arduino]


def insert_fake_data(session: Session):
    global equipment
    for item in equipment:
        entity = EquipmentEntity.from_model(item)
        session.add(entity)


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield
