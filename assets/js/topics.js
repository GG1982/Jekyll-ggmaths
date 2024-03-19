let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let boxes = checkboxes.length;

function save() {	
    for(let i = 0; i < boxes; i++){
        var checkbox = checkboxes[i];
        localStorage.setItem("checkbox" + i, checkbox.checked);	
    }
}

//for loading
for(let i = 0; i < boxes; i++){
    var checked = JSON.parse(localStorage.getItem("checkbox" + i));
    checkboxes[i].checked = checked;
}

// Attach change event listener to each checkbox
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', save);
});