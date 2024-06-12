document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        const jsonData = JSON.stringify(jsonObject);
        sendDataToGoogleSheet(jsonData);
        form.reset();
    });
});

function sendDataToGoogleSheet(data) {
    const url = "https://script.google.com/macros/s/AKfycbzWy9ILH5UaGE6gJYoF11kYxbs-oVJu5pHvhvrLwTZKD-A-8wqd1vBQI3bmTWLIZDrI/exec";
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    })
    .then(response => console.log("Data sent successfully"))
    .catch(error => console.error("Error sending data:", error));
}

function validatePAN() {
    const pan = document.getElementById("pan").value;
    const panError = document.getElementById("panError");
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (panRegex.test(pan)) {
        panError.textContent = "PAN number is valid.";
        panError.classList.remove("error");
        panError.classList.add("valid");
    } else {
        panError.textContent = "Invalid PAN number";
        panError.classList.remove("valid");
        panError.classList.add("error");
    }
    return panRegex.test(pan);
}

function validatePhone() {
    const phone = document.getElementById("phone").value;
    const phoneError = document.getElementById("phoneError");
    const phoneRegex = /^\d{10}$/;

    if (phoneRegex.test(phone)) {
        phoneError.textContent = "Phone number is valid.";
        phoneError.classList.remove("error");
        phoneError.classList.add("valid");
    } else {
        phoneError.textContent = "Invalid phone number. Enter a 10-digit phone number.";
        phoneError.classList.remove("valid");
        phoneError.classList.add("error");
    }
    return phoneRegex.test(phone);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const bankList = document.getElementById('bankList');
    const panInput = document.getElementById('pan');
    const phoneInput = document.getElementById('phone');

    const checkFormValidity = () => {
        let allValid = true;

        for (let element of form.elements) {
            if (element.type !== 'submit' && !element.checkValidity()) {
                allValid = false;
                break;
            }
        }

        if (!validatePAN(panInput.value) || !validatePhone(phoneInput.value)) {
            allValid = false;
        }

        submitBtn.disabled = !allValid;
    };

    form.addEventListener('input', checkFormValidity);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // if (validatePAN(panInput.value) && validatePhone(phoneInput.value)) {
            form.style.display = 'none';
            bankList.style.display = 'block';
        // } else {
        //     alert("Please enter valid PAN and phone number.");
        // }
    });

    checkFormValidity();
})