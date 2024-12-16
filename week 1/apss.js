// Simulatie van rekeningbalansen
let balances = {
  "Betaalrekening": 456.00,
  "Spaarrekening": 239.50,
};

// Selecteer alle navigatieknoppen
const navButtons = document.querySelectorAll('.nav-button');

// Selecteer alle secties
const sections = document.querySelectorAll('.content-section');

// Selecteer het loginformulier en foutmelding
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

// Correcte gebruikersnaam en wachtwoord
const correctUsername = "Shazaib";
const correctPassword = "Persoon1";

// Overschrijvingsformulier en feedback
const transferForm = document.getElementById('transfer-form');
const transferAmountInput = document.getElementById('amount'); // Corrigeer ID
const transferFromSelect = document.getElementById('from-account'); // Corrigeer ID
const transferToSelect = document.getElementById('to-account'); // Corrigeer ID
const feedbackMessage = document.getElementById('feedback');

// Update saldo in de UI
function updateBalancesUI() {
  const rekeningDivs = document.querySelectorAll('.rekening-item');
  rekeningDivs.forEach((div) => {
    const rekeningType = div.children[0].textContent;
    if (rekeningType in balances) {
      div.children[1].textContent = `€${balances[rekeningType].toFixed(2)}`;
    }
  });
}

// Voeg event listeners toe aan de knoppen
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.getAttribute('data-section');
    sections.forEach(section => section.classList.remove('active'));
    const activeSection = document.getElementById(targetSection);
    activeSection.classList.add('active');

    if (targetSection === "account") {
      loginForm.style.display = "block";
    } else {
      loginForm.style.display = "none";
      loginError.textContent = "";
    }

    if (targetSection === "overschrijvingen") {
      showTransferSection();
    }
  });
});

// Loginformulier versturen
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === correctUsername && password === correctPassword) {
    loginError.textContent = "";
    alert(`Welkom ${username}! Je wordt doorgestuurd naar de Home-pagina.`);
    navButtons.forEach(button => {
      if (button.getAttribute("data-section") === "home") {
        button.click();
      }
    });
  } else {
    loginError.textContent = "Onjuiste combinatie.";
    loginError.style.color = "red";
  }
});

// Functie om de overschrijvingssectie te tonen
function showTransferSection() {
  transferForm.style.display = "block";
  feedbackMessage.textContent = "";
}

// Overschrijvingsformulier versturen
transferForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = parseFloat(transferAmountInput.value.trim());
  const fromAccount = transferFromSelect.value;
  const toAccount = transferToSelect.value;

  feedbackMessage.classList.remove("error", "success");

  // Valideer de invoer
  if (isNaN(amount) || amount <= 0) {
    feedbackMessage.textContent = "Voer een geldig bedrag in.";
    feedbackMessage.classList.add("error");
    return;
  }

  if (fromAccount === toAccount) {
    feedbackMessage.textContent = "Kies verschillende rekeningen voor de overschrijving.";
    feedbackMessage.classList.add("error");
    return;
  }

  if (balances[fromAccount] < amount) {
    const tekort = amount - balances[fromAccount];
    feedbackMessage.textContent = `Onvoldoende saldo op de rekening. U komt €${tekort.toFixed(2)} tekort.`;
    feedbackMessage.classList.add("error");
    return;
  }

  // Voer de overschrijving uit
  balances[fromAccount] -= amount;
  balances[toAccount] += amount;

  feedbackMessage.textContent = `Succesvolle overschrijving van €${amount.toFixed(2)} van ${fromAccount} naar ${toAccount}.`;
  feedbackMessage.classList.remove("error");
  feedbackMessage.classList.add("success");

  updateBalancesUI();

  console.log(`Nieuw saldo ${fromAccount}: €${balances[fromAccount].toFixed(2)}`);
  console.log(`Nieuw saldo ${toAccount}: €${balances[toAccount].toFixed(2)}`);
});
