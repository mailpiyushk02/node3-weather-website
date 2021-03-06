// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data.puzzle);
//   });
// });

const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
