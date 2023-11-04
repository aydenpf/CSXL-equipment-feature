"""
The equipment service allows the API to manipulate equipment in the database.
"""

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import db_session
from ..models.equipment import Equipment
from ..entities.equipment_entity import EquipmentEntity
from ..models import User

from .exceptions import EquipmentNotFoundException

# Excluding this import for now, however, we will need to use in later sprints for handling different types of users
#from .permission import PermissionService

__authors__ = ["Jacob Brown, Nicholas Mountain"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

class EquipmentService:
    """Service that performs all of the actions on the equipment table."""

    def __init__(
            self,
            session: Session = Depends(db_session),
    ):
        """Initialize the session for querying the db."""
        self._session = session 

    def getAll(self) -> list[Equipment]:
        """Return a list of all equipment in the db."""
        # Create the query for getting all equipment entities.
        query = select(EquipmentEntity)
        # execute the query grabbing each row from the equipment table
        query_result = self._session.scalars(query).all()
        # convert the query results into 'Equipment' models and return as a list
        return [result.to_model() for result in query_result]
    
    # TODO: add param for user and save users pid in equipments list of pids and implement permissions
    def checkout_equipment(self, item: Equipment) -> Equipment:
        """
        Checks out a specific item.

        Args:
            model (Equipment): The model instance check out.
            TODO: model (User): The user that is checking out the equipment.

        Returns:
            Equipment: the checked out equipment.
        """

        #get item with matching equipment_id from db
        entity_item = self._session.get(EquipmentEntity, item.equipment_id)

        if entity_item:
            entity_item.is_checked_out = True

            self._session.commit()
            return entity_item.to_model()
        
        else:
            raise EquipmentNotFoundException(item.equipment_id)
    
    def return_equipment(self, item: Equipment) -> Equipment:
        """
        sets an item as not checked out in the database.

        Args:
            model (Equipment): The model instance to check in.

        Returns:
            Equipment: the checked in equipment.
        """

        #get the item with matching equipment_id from the db
        entity_item = self._session.get(EquipmentEntity, item.equipment_id)

        if entity_item:
            entity_item.is_checked_out = False

            self._session.commit()
            return entity_item.to_model()
        
        else:
            raise EquipmentNotFoundException(item.equipment_id)
        
    def update_equipment_condition(self, item: Equipment) -> Equipment:
        """
        updates an equipments condition

        Args:
            model (Equipment): The model instance to update.

        Returns:
            Equipment: the checked in equipment.
        """

        #get the item with matching equipment_id from the db
        entity_item = self._session.get(EquipmentEntity, item.equipment_id)

        if entity_item:
            entity_item.condition = item.condition

            self._session.commit()
            return entity_item.to_model()
        
        else:
            raise EquipmentNotFoundException(item.equipment_id)

        