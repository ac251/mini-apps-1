let results = document.getElementById('serverResponse');

let fileInput = document.getElementById('fileSubmit');

let textInput = document.getElementById('textInput');

let textSubmit = document.getElementById('textSubmit');

let makePostRequest = (data) => {
  return fetch('/json', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: data
  })
  .then(response => {
    console.log(response.body);
    return response.text();
  })
  .then(text => results.innerHTML = text);
}

let submitHandler = (e) => {
  console.log('hi');
  let file = fileInput.files[0];
  console.log(file);
  makePostRequest(file);
};

let clickHandler = () => {
  let data = textInput.value;
  makePostRequest(data);
};




fileInput.addEventListener('change', submitHandler);
textSubmit.addEventListener('click', clickHandler);