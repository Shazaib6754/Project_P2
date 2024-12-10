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
const transferAmountInput = document.getElementById('transfer-amount');
const transferFromSelect = document.getElementById('transfer-from');
const transferToSelect = document.getElementById('transfer-to');
const feedbackMessage = document.getElementById('feedback-message');

// Voeg event listeners toe aan de knoppen
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Haal de waarde van data-section op
    const targetSection = button.getAttribute('data-section');

    // Verwijder 'active' van alle secties
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Voeg 'active' toe aan de geselecteerde sectie
    const activeSection = document.getElementById(targetSection);
    activeSection.classList.add('active');

    // Loginformulier alleen tonen in de 'Account'-sectie
    if (targetSection === "account") {
      loginForm.style.display = "block";
    } else {
      loginForm.style.display = "none";
      loginError.textContent = ""; // Verberg foutmelding als het niet de Account-pagina is
    }

    // Toon overschrijvingssectie bij de juiste pagina
    if (targetSection === "overschrijvingen") {
      showTransferSection();
    }
  });
});

// Loginformulier versturen
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Voorkom standaardformulieractie

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Controleer de gebruikersnaam en het wachtwoord
  if (username === correctUsername && password === correctPassword) {
    loginError.textContent = ""; // Wis eerdere foutmeldingen
    alert(`Welkom ${username}! Je wordt doorgestuurd naar de Home-pagina.`);
    
    // Navigeer automatisch naar de Home-pagina
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
    feedbackMessage.textContent = "Onvoldoende saldo op de rekening.";
    feedbackMessage.classList.add("error");
    return;
  }

  // Voer de overschrijving uit
  balances[fromAccount] -= amount;
  balances[toAccount] += amount;

  // Geef succesfeedback
  feedbackMessage.textContent = `Succesvolle overschrijving van €${amount.toFixed(2)} van ${Betaalrekening} naar ${Spaarrekening}.`;
  feedbackMessage.classList.remove("error");
  feedbackMessage.classList.add("success");

  
  console.log(`Nieuw saldo ${fromAccount}: €${balances[fromAccount].toFixed(2)}`);
  console.log(`Nieuw saldo ${toAccount}: €${balances[toAccount].toFixed(2)}`);
});
