const apiUrl = "users.json"

document.getElementById("getUsersButton").addEventListener("click", getUsers);


document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const userId = document.getElementById("userId").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    if (userId) {
        updateUser(userId, name, password);
    } else {
        createUser(name,password)
    }
    
    document.getElementById("userId").value = ''
    document.getElementById("userForm").reset();

});

window.onload = getUsers;


function createUser(name, password) {
    fetch(apiUrl, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({name, password})
    })
    .then(response => response.json())
    .then(data => {
        console.log("User created:", data);
        getUsers();
    })
}

function getUsers() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById("userList");
        userList.innerHTML = ''; // Clear the list before adding updated data

        users.forEach(user => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${user.name}</strong> - ${user.username}, ${user.id}
                <button onclick="editUser('${user.id}', '${user.name}', '${user.email}')">Edit</button>
                <button onclick="deleteUser('${user.id}')">Delete</button>
            `;
            userList.appendChild(listItem);
        });
    });
}


function updateUser(userId, name, password) {
    fetch(`${apiUrl}/${userId}`, {
        method : "PUT",
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify({name, password})
    })
    .then(response => response.json())
    .then(data => {
        console.log("User updated:", data);
        getUsers()
    })
}

function deleteUser(userId) {
    fetch(`${apiUrl}/${userId}`, {method:"DELETE"})
    .then(() => {
        console.log("User deleted");
        getUsers();
    })
}

function editUser() {
    document.getElementById("userId").value = userId;
    document.getElementById("name").value = name;
    document.getElementById("password").value = password;

}