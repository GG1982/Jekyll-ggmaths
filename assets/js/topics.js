let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let boxes = checkboxes.length;

// Local Storage
function save() {
    checkboxes.forEach(function(checkbox) {
        let topicId = checkbox.getAttribute("data-topic-id");
        localStorage.setItem("checkbox_" + topicId, checkbox.checked);

        let checkedCount = countCheckedCheckboxes();
        localStorage.setItem("checkedCount", checkedCount);
    });
}

// Function to count checked checkboxes
function countCheckedCheckboxes() {
    let checkedCount = 0;
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkedCount++;
        }
    });
    return checkedCount;
}

// Local Storage: Load checkbox states from local storage
for (let i = 0; i < boxes; i++) {
    let topicId = checkboxes[i].getAttribute("data-topic-id");
    let checked = localStorage.getItem("checkbox_" + topicId) === "true";
    checkboxes[i].checked = checked;
}

// Attach change event listener to each checkbox
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', save);
});




// Progress Bar
const progressbar = document.querySelector(".progressbar")

function enableProgressbar() {
    progressbar.setAttribute("role", "progressbar");

    let checkedCount = localStorage.getItem("checkedCount");
    progressPercentage = Math.round((checkedCount / checkboxes.length) * 1000 ) / 10;
    progressbar.setAttribute("aria-valuenow", progressPercentage);
    progressbar.style.setProperty('--progress', progressPercentage + "%")

}
enableProgressbar()

// Function to update the progress bar value and convert to a %
function updateProgressBarValue() {
    let checkedCount = localStorage.getItem("checkedCount");
    let progressPercentage = (checkedCount / checkboxes.length) * 100;
    return Math.round(progressPercentage * 10) / 10 // round to 1dp
}

// Attach event listener to each checkbox
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        let newValue = updateProgressBarValue(); // Update the progress bar value with the new value
        progressbar.setAttribute("aria-valuenow", newValue);
        progressbar.style.setProperty('--progress', newValue + "%")
    });
});





