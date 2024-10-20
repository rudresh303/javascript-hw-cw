const button = document.getElementById("btn");
const birthday = document.getElementById("birth");
const output = document.getElementById("output");

function calculateAge() {
  const birthVal = birthday.value;
  if (birthVal === "") {
    alert("Please enter your birthday");
  } else {
    const age = getAge(birthVal);
    output.innerText = `Your age is ${age} ${age > 1 ? "years" : "year"} old`;
  }
}

function getAge(birthVal) {
  const currDate = new Date();
  const birthDate = new Date(birthVal);
  let age = currDate.getFullYear() - birthDate.getFullYear();
  const month = currDate.getMonth() - birthDate.getMonth();

  if (
    month < 0 ||
    (month === 0 && currDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

button.addEventListener("click", calculateAge);
