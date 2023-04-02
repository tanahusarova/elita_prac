const MESSAGES_STORAGE_KEY="messages";

let storage = localStorage;

function addUser(user) {
    return fetch("/users/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
}

async function getNicknames() {
    return fetch("/users/nicknames").then(
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



export {getNicknames, addUser};