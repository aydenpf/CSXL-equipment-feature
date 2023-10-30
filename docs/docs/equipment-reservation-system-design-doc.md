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

### WireFrame / Mockup

The wireframe for our project is stored in a figma file. To access the wireframe you will need to navigate to the below link and make an account.

https://www.figma.com/file/XbX6hfwGJLQTOl0MLk5SVY/590-Final-Project?type=design&node-id=0%3A1&mode=design&t=AyWmjYFu8xMUW4UA-1

#### Technical Implementation 5.

There exists multiple concerns regarding security and privacy of data based on a user's role. These are defined as follows:

<ins>Sally Student:</ins> When checking out equipment, Sally student will have access to all available resources. All equipment already checked out or under repair shall be kept private from a student's access. Upon checking out equipment, only Sally Student will be able to access her resource, all other students will not have access to that data.
Sally Student will not have access to oversight of checking in/out equipment, only the ability to request a checkout.
<ins>Amy Ambassador:</ins> Amy Ambassador must have privilege to check in/out student equipment. She will have access to see a list of all current reservations, as this data is kept private from student roles. Amy Ambassador should have the ability to 'remove' equipment that has been damaged upon return, so write capabilities to the backend database may be necessary. Student's will only have read capabilities. Amy Ambassador will also have permission to 'turn off' students' access to reserve equipment if they are not respectful of the equipment, whether that be through damages, late return, etc.

