const MESSAGES_STORAGE_KEY="messages";

let storage = localStorage;

function addEvent(event) {
    return fetch("/events/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
    });
}

async function getEvent(id) {
    return fetch("/events/event").then(
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

async function getEventByDate(body) {
    return fetch("/events/event-date").then(
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
    return fetch("/events/participant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
}

function addObserver(event) {
    return fetch("/events/observer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
    });
}

export {addEvent, getEvent, getEventByDate, addObserver, 
        addParticipant, deleteEvent};