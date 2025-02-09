document.getElementById('calculate').addEventListener('click', function() {
    const marks = parseInt(document.getElementById('marks').value);

    let grade = '';
    let remarks = '';

    if(marks >= 90) {
        grade= "A+";
        remarks = "Excellent";
    } else if(marks >=80) {
        grade = "A";
        remarks = "Very good";
    } else if (marks >= 70) {
        grade = "B+";
        remarks = "Good";
    } else if (marks >= 60) {
        grade = "B";
        remarks = "Fair";
    } else if (marks >= 50) {
        grade = "C+";
        remarks = "Pass"
    } else {
        grade = "F";
        remarks = "Failed";
    }

    document.getElementById('grade').value = grade;
    document.getElementById('remarks').value = remarks;
});