# Equipment Reservation Technical Specification Documentation

1. Descriptions and sample data representations of new or modified model representation(s) and API routes supporting your feature’s stories

2. Description of underlying database/entity-level representation decisions

   Equipment is represented in the database with its own unique id, a unique equipment_id that will match a physical label on each piece of equipment so that they can be uniquely identified, 
   a model name (ex: meta quest 3), an equipment image (URL), an is checked out boolean flag to track if the item is available, condition to track the condition of the item, condition notes array of
   strings so ambassadors can note any concerns about the equipment condition, and checkout history which is a list of pids of users who have checked out an item in the past.

3. At least one technical and one user experience design choice your team weighed the trade-offs with justification for the decision (we chose X over Y, because…)

   Technical design choice:

   Our team needs to be able to track which users currently have what equipment checked out. We initially thought it would be a good idea to add a column to the equipment table 
   to hold an equipment item when the user has one checked out, however we later realized it would be much easier to use a combination of the 'is_checked_out' boolean flag and the 
   'checkout_history' (list of pids) that are alrady stored in the equipment entity to find what users have what equipment checked out. 

4. Development concerns: How does a new developer get started on your feature? Brief guide/tour of the files and concerns they need to understand to get up-to-speed.

   Frontend files:

   1. User-equipment component
      This components shows how many of each type of equipment are currently available for checkout by a user.
   2. Waiver component
      This components displays a waiver that a user must agree to before they can checkout.
   3. Equipment Checkout Complete Component
      This component displays a message telling a user to see an ambassador in order to finish the equipment checkout.

   Backend files:

   1. EquipmentEntity
      This entity controls the Equipment table in the database.
   2. Equipment service
      This service layer class controls all of the actions on the equipment database.
   3. Equipment/checkouts.py (API folder)
      This file holds all of the routes for the api layer of the equipment feature and directly interacts with the equipment service.
