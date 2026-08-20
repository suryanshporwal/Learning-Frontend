const inputHolder = document.getElementById("inputHolder");
const submitBtn = document.getElementById("submitBtn");
const list = document.getElementById("taskList");

submitBtn.addEventListener("click", () => {
  if(inputHolder.value.length==0) return;
  list.innerHTML += `<li> ${inputHolder.value} </li>`;
  inputHolder.value="";
});


// Could use this also
// submitBtn.onclick = () => {
//   list.innerHTML += `<li> ${inputHolder.value} </li>`;
// };