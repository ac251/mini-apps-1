let results = document.getElementById('serverResponse');

let fileInput = document.getElementById('fileSubmit');

let submitHandler = (e) => {
  console.log('hi');
  let file = fileInput.files[0];
  console.log(file);
  return fetch('/json', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: file
  })
  .then(response => {
    console.log(response.body);
    return response.text();
  })
  .then(text => results.innerHTML = text);
};

fileInput.addEventListener('change', submitHandler);