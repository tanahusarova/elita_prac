const MESSAGES_STORAGE_KEY="messages";

let storage = localStorage;

function addEvent(event) {
    return fetch("http://localhost:3001/events/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
    });
}

async function getEvent(id) {
    return fetch(`http://localhost:3001/events/event/${id}`).then(
        (response) => {
            if (!response.ok) {
                throw new Error("tato chyba");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("chyba 2");
            return [];
        });
}

async function getEventByDate(id_of_user, id_of_owner, date) {
    return fetch(`http://localhost:3001/events/event-date?param1=${id_of_user}&param2=${id_of_owner}&param3=${date}`).then(
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



function addParticipant(body) {
    return fetch("http://localhost:3001/events/participant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
}

function addObserver(event) {
    return fetch("http://localhost:3001/events/observer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
    });
}

async function getComment(id) {
    return fetch(`http://localhost:3001/events/comments/${id}`).then(
        (response) => {
            if (!response.ok) {
                throw new Error("tato chyba");
            }
            return response.json();
        }).catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("chyba 2");
            return [];
        });
}

export {addEvent, getEvent, getEventByDate, addObserver, 
        addParticipant, deleteEvent, getComment};