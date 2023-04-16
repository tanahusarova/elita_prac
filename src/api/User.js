function addUser(user) {
    return fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
}


function loginUser(user) {
    return fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
}

async function checkUser(mail) {
    return fetch(`http://localhost:3001/users/user/${mail}`).then(
        (response) => {
            if (!response.ok) {
                throw new Error("Error getting user");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting user");
            return [];
        });
}


async function getNicknames() {
    return fetch("http://localhost:3001/users/nicknames").then(
        (response) => {
            if (!response.ok) {
                throw new Error("Error getting event");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting event");
            return [];
        });
}


//upravit na vymazanie, spytat sa
async function deleteEvent(body) {
    return 0;
}



export {getNicknames, addUser, checkUser, loginUser};