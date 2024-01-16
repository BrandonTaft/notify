import config from '../config';

export const fetchReminders = async () => {
    return await fetch(config.BASE_URL)
        .catch((err) => {
            console.log(err);
        })
        .then((res) => res.json())
};

export const completeMany = async (selected) => {
    return fetch(config.BASE_URL + '/complete', {
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
    return fetch(config.BASE_URL + "/delete", {
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

export const addReminders = async (name, action, selectedDate, editable, expoPushToken) => {
    return await fetch(config.BASE_URL, {
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

export const deleteReminder = async (reminder) => {
    return  fetch(config.BASE_URL + '/' + reminder, {
        method: 'DELETE'
      }).then(response => response.json())
};

export const wipeAll = async (selected) => {
    return  fetch(config.BASE_URL + "/wipe", {
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
