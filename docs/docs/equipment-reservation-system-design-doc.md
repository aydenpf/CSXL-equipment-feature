# Equipment Reservation System

### Team D9:

David Sprague, Nick Mountain, Jacob Brown, Ayden Franklin

### Overview:

To permit the use of CSXL equipment that will be avaiable in the future, students must be able to veiw availability of equipment and request equipment. Managers and ambassadoors must be able to see requests and accept them and ensure equipment was used properly.

### Key Personas:

##### Sally Student:

Sally student needs to be able to reserve and check out equipment.

##### Amy Ambassador:

Amy ambassador needs to be able to oversee chekouts, returns, and condition of equipment.

##### User Stories:

##### Technical Implementation Opportunities and Planning

1. Extend navigation.component.html file to have button for equipment. Depend on user.py in backend to get users. Depend on permission.py in backend to validate that user has correct permissions to perform an action related to checkouts.
2. Equipment widget. Waiver Widget. Checkout complete widget. Equipment checkout requests widget. Checked out equipment widget. Equipment return component. Equipment reservation component for sally student. XL equipment component for amy ambassador.
3. Add a checkout model. Add an equipment model. Change User model to have certain permissions/data associated with checkouts.
