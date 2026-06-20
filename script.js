/* =========================
ADD SUBJECT
========================= */

function addSubject(
subjectName = "",
gradeValue = "",
creditValue = ""
) {


const subjects =
    document.getElementById("subjects");

const row =
    document.createElement("div");

row.classList.add("subject");

row.innerHTML = `
    <input
        type="text"
        class="subject-name"
        placeholder="Subject Name"
        value="${subjectName}"
    >

    <input
        type="number"
        class="grade"
        min="0"
        max="10"
        step="0.1"
        placeholder="Grade Point"
        value="${gradeValue}"
    >

    <input
        type="number"
        class="credit"
        min="1"
        placeholder="Credits"
        value="${creditValue}"
    >

    <button
        type="button"
        class="remove-btn"
        onclick="removeSubject(this)"
    >
        ✕
    </button>
`;

subjects.appendChild(row);

saveData();


}

/* =========================
REMOVE SUBJECT
========================= */

function removeSubject(button) {


const subjects =
    document.getElementById("subjects");

if (subjects.children.length === 1) {

    alert(
        "At least one subject is required."
    );

    return;
}

button.parentElement.remove();

saveData();


}

/* =========================
CALCULATE CGPA
========================= */

function calculateCGPA() {


const grades =
    document.querySelectorAll(".grade");

const credits =
    document.querySelectorAll(".credit");

let totalCredits = 0;
let totalPoints = 0;

for (
    let i = 0;
    i < grades.length;
    i++
) {

    const grade =
        parseFloat(grades[i].value);

    const credit =
        parseFloat(credits[i].value);

    if (
        isNaN(grade) ||
        isNaN(credit)
    ) {
        continue;
    }

    if (
        grade < 0 ||
        grade > 10
    ) {

        alert(
            "Grade Point must be between 0 and 10."
        );

        return;
    }

    totalPoints +=
        grade * credit;

    totalCredits += credit;
}

if (totalCredits === 0) {

    alert(
        "Please enter valid values."
    );

    return;
}

const cgpa =
    totalPoints / totalCredits;

const percentage =
    cgpa * 9.5;

let performance =
    "Needs Improvement 📚";

if (cgpa >= 9) {
    performance =
        "Outstanding 🏆";
}
else if (cgpa >= 8) {
    performance =
        "Excellent ⭐";
}
else if (cgpa >= 7) {
    performance =
        "Very Good 👍";
}
else if (cgpa >= 6) {
    performance =
        "Good 🙂";
}

document.getElementById(
    "cgpaValue"
).textContent =
    cgpa.toFixed(2);

document.getElementById(
    "percentageValue"
).textContent =
    `Percentage: ${percentage.toFixed(2)}%`;

document.getElementById(
    "gradeBadge"
).textContent =
    performance;

document.getElementById(
    "creditInfo"
).textContent =
    `Total Credits: ${totalCredits}`;

saveData();


}

/* =========================
SAVE TO LOCAL STORAGE
========================= */

function saveData() {


const rows =
    document.querySelectorAll(
        ".subject"
    );

const data = [];

rows.forEach(row => {

    const subject =
        row.querySelector(
            ".subject-name"
        ).value;

    const grade =
        row.querySelector(
            ".grade"
        ).value;

    const credit =
        row.querySelector(
            ".credit"
        ).value;

    data.push({
        subject,
        grade,
        credit
    });
});

localStorage.setItem(
    "cgpaData",
    JSON.stringify(data)
);


}

/* =========================
LOAD FROM LOCAL STORAGE
========================= */

function loadData() {


const saved =
    JSON.parse(
        localStorage.getItem(
            "cgpaData"
        ) || "[]"
    );

if (
    saved.length === 0
) {
    return;
}

document.getElementById(
    "subjects"
).innerHTML = "";

saved.forEach(item => {

    addSubject(
        item.subject,
        item.grade,
        item.credit
    );
});


}

/* =========================
DARK MODE
========================= */

const themeToggle =
document.getElementById(
"themeToggle"
);

themeToggle.addEventListener(
"click",
() => {


    document.body.classList.toggle(
        "dark"
    );

    const darkMode =
        document.body.classList.contains(
            "dark"
        );

    themeToggle.textContent =
        darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";

    localStorage.setItem(
        "theme",
        darkMode
            ? "dark"
            : "light"
    );
}


);

/* =========================
LOAD THEME
========================= */

function loadTheme() {


const savedTheme =
    localStorage.getItem(
        "theme"
    );

if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    themeToggle.textContent =
        "☀️ Light Mode";
}


}

/* =========================
DOWNLOAD PDF
========================= */

function downloadReport() {


const {
    jsPDF
} = window.jspdf;

const doc =
    new jsPDF();

const cgpa =
    document.getElementById(
        "cgpaValue"
    ).textContent;

const percentage =
    document.getElementById(
        "percentageValue"
    ).textContent;

const grade =
    document.getElementById(
        "gradeBadge"
    ).textContent;

const credits =
    document.getElementById(
        "creditInfo"
    ).textContent;

doc.setFontSize(20);
doc.text(
    "CGPA Calculator Report",
    20,
    20
);

doc.setFontSize(12);

doc.text(
    `CGPA: ${cgpa}`,
    20,
    50
);

doc.text(
    percentage,
    20,
    65
);

doc.text(
    `Performance: ${grade}`,
    20,
    80
);

doc.text(
    credits,
    20,
    95
);

doc.save(
    "CGPA_Report.pdf"
);


}

/* =========================
AUTO SAVE ON INPUT
========================= */

document.addEventListener(
"input",
saveData
);

/* =========================
INITIAL LOAD
========================= */

window.onload = function () {


loadData();

loadTheme();


};
