const REQUEST_TIMEOUT = 2000; // ms

const formTable = document.getElementById('form-table');
const formTableBody = formTable.getElementsByTagName('tbody');
const loadingAlert = document.getElementById('loading-alert');

function loadForm() {
  formTable.classList.add('d-none');
  loadingAlert.classList.add('d-none');


  const abortController = new AbortController();
  const timer = setTimeout(() => {
    abortController.abort();
  }, REQUEST_TIMEOUT);

  fetch('/Form', { signal: abortController.signal })
    .then((response) => response.json())
    .then((json) => {
      formTableBody.innerHTML = '';
      const personlist = json.personlist;
      personlist.forEach((Person) => {
        const row = document.createElement('tr');
        const nomCol = document.createElement('td');
        nomCol.textContent = Person.nom;
        row.appendChild(nomCol);
        const prenomCol = document.createElement('td');
        prenomCol.textContent = Person.prenom;
        row.appendChild(prenomCol);
        const datenaissanceCol = document.createElement('td');
        datenaissanceCol.textContent = Person.datenaissance;
        row.appendChild(datenaissanceCol);
        const adresseemailCol = document.createElement('td');
        adresseemailCol.textContent = Person.adresseemail;
        row.appendChild(adresseemailCol);
        const rueCol = document.createElement('td');
        rueCol.textContent = Person.rue;
        row.appendChild(rueCol);
        const communeCol = document.createElement('td');
        communeCol.textContent = Person.commune;
        row.appendChild(communeCol);
        const numeroCol = document.createElement('td');
        numeroCol.textContent = Person.numero;
        row.appendChild(numeroCol);
        const codepostalCol = document.createElement('td');
        codepostalCol.textContent = Person.codepostal;
        row.appendChild(codepostalCol);
        formTableBody.appendChild(row);
      });
      formTable.classList.remove('d-none');
    })
    .catch((error) => {
      loadingAlert.classList.remove('d-none');
    })
    .finally(() => {
      clearTimeout(timer);
    });
}

loadForm();

const Form = document.getElementById('form');
const nomInput = document.getElementById('nomInput');
const prenomInput = document.getElementById('prenomInput');
const datenaissanceInput = document.getElementById('datenaissanceInput');
const adresseemailInput = document.getElementById('adresseemailInput');
const rueInput = document.getElementById('rueInput');
const codepostalInput = document.getElementById('codepostalInput');
const numeroInput = document.getElementById('numeroInput');
const communeInput = document.getElementById('communeInput');

const sendingFailure = document.getElementById('sending-failure');

function sendForm() {

  nomInput.setAttribute('disabled', true);
  prenomInput.setAttribute('disabled', true);
  datenaissanceInput.setAttribute('disabled', true);
  adresseemailInput.setAttribute('disabled', true);
  rueInput.setAttribute('disabled', true);
  numeroInput.setAttribute('disabled', true);
  codepostalInput.setAttribute('disabled', true);
  communeInput.setAttribute('disabled', true);


  const data = {
    nom: nomInput.value,
    prenom: prenomInput.value,
    datenaissance: datenaissanceInput.value,
    adresseemail: adresseemailInput.value,
    rue: rueInput.value,
    numero: numeroInput.value,
    codepostal: codepostalInput.value,
    commune: communeInput.value,
  };

  const abortController = new AbortController();
  const timer = setTimeout(() => {
    abortController.abort();
  }, REQUEST_TIMEOUT);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  fetch('/Form', {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
    signal: abortController.signal,
  })
    .then((response) => {
      if (response.ok) {
        loadForm();
        Form.reset();
        Form.classList.remove('was-validated');
        window.scrollTo(0, 0);
      }
    })
    .catch((error) => {
      sendingFailure.classList.remove('d-none');
    })
    .finally(() => {
      nomInput.removeAttribute('disabled');
      prenomInput.removeAttribute('disabled');
      datenaissanceInput.removeAttribute('disabled');
      adresseemailInput.removeAttribute('disabled');
      rueInput.removeAttribute('disabled');
      numeroInput.removeAttribute('disabled');
      codepostalInput.removeAttribute('disabled');
      communeInput.removeAttribute('disabled');

      clearTimeout(timer);

    });
}

Form.addEventListener('submit', (event) => {
  sendingFailure.classList.add('d-none');
  event.preventDefault();
  event.stopPropagation();
  if (Form.checkValidity()) {
    sendForm();
  }

  Form.classList.add('was-validated');
});

const refreshButton = document.getElementById('refresh-button');

refreshButton.addEventListener('click', (event) => {

  loadForm();
});

