let results = document.getElementById('serverResponse');

let fileInput = document.getElementById('fileSubmit');

let textInput = document.getElementById('textInput');

let textSubmit = document.getElementById('textSubmit');

let downloadLink;

let lastHash;

// let downloadHandler = (e) => {
//   e.preventDefault();
//   return fetch('/download', {
//     method: 'POST',
//     headers: {'content-type': 'text/plain'},
//     body: {hash: lastHash}
//   })
//   .then(response => response.text())
//   .then(text => {
//     console.log(text);
//     downloadLink.href = window.URL.createObjectURL(text);
//     downloadLink.click();
//   });
// }

let makePostRequest = (data) => {
  return fetch('/json', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: data
  })
  .then(response => {
    console.log(response);

    return response.json();
  })
  .then(json => {
    results.innerHTML = json.html;
    lastHash = json.hash;
    downloadLink = document.getElementById('download');
    downloadLink.href = '/download/' + lastHash
    //downloadLink.addEventListener('click', downloadHandler);
  });
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