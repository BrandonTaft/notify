const BASE_URL = "https://6c14-2600-6c5a-4a7f-463a-81f3-37d4-1497-e095.ngrok-free.app";

export const fetchReminders = async () => {
    return await fetch(BASE_URL)
        .catch((err) => {
            console.log(err);
        })
        .then((res) => res.json())
};

export const addReminders = async (name, action, selectedDate, editable, expoPushToken) => {
    return await fetch(BASE_URL, {
        method: action,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editable,
          name: name,
          notification: selectedDate,
          expoPushToken: expoPushToken
        })
      }).catch((err) => {
        console.log(err);
    }).then(response => response.json())
};

export const fetchNotes = async () => {
    return await fetch(BASE_URL + '/notes')
        .catch((err) => {
            console.log(err);
        })
        .then((res) => res.json())
};

export const addNote = async (note) => {
    return await fetch(BASE_URL  + "/notes", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: note.name,
          note: true
        })
      }).catch((err) => {
        console.log(err);
    }).then(response => response.json())
};

export const updateNote = async (note) => {
    return await fetch(BASE_URL  + "/notes", {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: note.name,
          note: true,
          id:note._id,
          priority:note.false
        })
      }).catch((err) => {
        console.log(err);
    }).then(response => response.json())
};

export const completeMany = async (selected) => {
    return fetch(BASE_URL + '/complete', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selected: selected
        })
    }).then(response => response.json())
};

export const deleteMany = async (selected) => {
    return fetch(BASE_URL + "/delete", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selected: selected
        })
    }).then(response => response.json())
};

export const restoreMany = async (selected) => {
    return fetch(BASE_URL + '/restore', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selected: selected
        })
    }).then(response => response.json())
};



export const wipeAll = async (selected) => {
    return  fetch(BASE_URL + "/wipe", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selected: selected
        })
    }).then(response => response.json())
};



