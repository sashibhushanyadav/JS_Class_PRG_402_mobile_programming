const colorPrint = document.getElementById("colorPrint");

function calculate() {
  let eng = Number(document.getElementById("eng").value);
  let nep = Number(document.getElementById("nep").value);
  let cMath = Number(document.getElementById("c.math").value);
  let optMath = Number(document.getElementById("opt.math").value);
  let sci = Number(document.getElementById("sci").value);
  let eph = Number(document.getElementById("eph").value);
  let social = Number(document.getElementById("social").value);
  let acc = Number(document.getElementById("acc").value);

  let totalMarks = eng + nep + cMath + optMath + sci + eph + social + acc;

  if (totalMarks > 700) {
    ((colorPrint.innerHTML = "Distinction with total marks: " + totalMarks),
      (colorPrint.style.color = "green"));
  } else if (totalMarks > 600 && totalMarks <= 700) {
    ((colorPrint.innerHTML = "First Division with total marks: " + totalMarks),
      (colorPrint.style.color = "black"));
  } else if (totalMarks > 500 && totalMarks <= 600) {
    ((colorPrint.innerHTML = "Second Division with total marks: " + totalMarks),
      (colorPrint.style.color = "brown"));
  } else if (totalMarks > 400 && totalMarks <= 500) {
    ((colorPrint.innerHTML = "Third Division with total marks: " + totalMarks),
      (colorPrint.style.color = "orange"));
  } else {
    ((colorPrint.innerHTML = "Fail with total marks: " + totalMarks),
      (colorPrint.style.color = "red"));
  }
}
