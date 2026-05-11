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
    ((document.getElementById("colorPrint").innerHTML =
      "Distinction with marks: " + totalMarks),
      (document.getElementById("colorPrint").style.color = "green"));
  } else if (totalMarks > 600 && totalMarks <= 700) {
    console.log(
      (document.getElementById("colorPrint").innerHTML =
        "First Div with marks: " + totalMarks),
      (document.getElementById("colorPrint").style.color = "black"),
    );
  } else if (totalMarks > 500 && totalMarks <= 600) {
    console.log(
      (document.getElementById("colorPrint").innerHTML =
        "Div with marks: " + totalMarks),
      (document.getElementById("colorPrint").style.color = "brown"),
    );
  } else if (totalMarks > 400 && totalMarks <= 500) {
    console.log(
      (document.getElementById("colorPrint").innerHTML =
        "Third Div with marks: " + totalMarks),
      (document.getElementById("colorPrint").style.color = "orange"),
    );
  } else {
    console.log(
      (document.getElementById("colorPrint").innerHTML =
        "Fail with marks: " + totalMarks),
      (document.getElementById("colorPrint").style.color = "red"),
    );
  }
}
