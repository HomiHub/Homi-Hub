const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn'); 

const database = firebase.database();
const rootRef = database.ref('users')

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const autoId = rootRef.push().key
    rootRef.child(autoId).set({
        first_name: firstName.value,
        last_name: lastName.value,
        age: age.value,

    });
});

// type ID in first name input box to delete
removeBtn.addEventListener('click', e => {
    e.preventDefault();
    rootRef.child(firstName.value).remove();
});

readBtn.addEventListener('click', e => {
    e.preventDefault();
    //query database
    rootRef.orderByKey().on('value', snapshot => {
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            firstName.value = item.first_name;
            lastName.value = item.last_name;
            age.value = item.age;
        })
    })
});

// receive updates
rootRef.on('value', snapshot => {
    console.log('an event has occured!');
})


