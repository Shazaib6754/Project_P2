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
  const transactions = [
    { id: 1, type: 'inkomend', datum: '2024-11-01', bedrag: 150.00 },
    { id: 2, type: 'uitgaand', datum: '2024-11-03', bedrag: -50.00 },
    { id: 3, type: 'inkomend', datum: '2024-11-05', bedrag: 200.00 },
    { id: 4, type: 'uitgaand', datum: '2024-11-10', bedrag: -30.00 }
];
 
// Functie om transacties te filteren
function filterTransactions() {
    const typeFilter = document.getElementById('typeFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
   
    let filteredTransactions = transactions;
 
    // Filteren op type
    if (typeFilter) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === typeFilter);
    }
 
    // Filteren op datum
    if (dateFilter) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.datum === dateFilter);
    }
 
    // Toon de gefilterde transacties
    displayTransactions(filteredTransactions);
}
 
// Functie om transacties in de tabel weer te geven
function displayTransactions(filteredTransactions) {
    const tableBody = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Maak de tabel leeg voordat we nieuwe gegevens invoegen
 
    filteredTransactions.forEach(transaction => {
        const row = document.createElement('tr');
 
        const dateCell = document.createElement('td');
        dateCell.textContent = transaction.datum;
        row.appendChild(dateCell);
 
        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1); // Hoofdletter voor het type
        row.appendChild(typeCell);
 
        const amountCell = document.createElement('td');
        amountCell.textContent = `€${transaction.bedrag.toFixed(2)}`;
        amountCell.classList.add(transaction.type); // Voeg de klasse 'inkomend' of 'uitgaand' toe voor kleur
        row.appendChild(amountCell);
 
        tableBody.appendChild(row);
    });
}
 
// Initialiseren van de weergave van de transacties
displayTransactions(transactions);
 
// Event listeners voor de filters
document.getElementById('typeFilter').addEventListener('change', filterTransactions);
document.getElementById('dateFilter').addEventListener('change', filterTransactions);
  // Crypto-functionaliteit
const saldoEl = document.getElementById("saldo");
const huidigePrijsEl = document.getElementById("huidige-prijs");
const inBezitEl = document.getElementById("in-bezit");
const bedragInput = document.getElementById("bedrag");
const investeringStatusEl = document.getElementById("investering-status");

let saldo = 760.0; // Startsaldo (kan gekoppeld worden aan een dashboard-waarde)
let huidigePrijs = 120.0;
let inBezit = 2;

function updateCryptoInfo() {
  saldoEl.textContent = `€${saldo.toFixed(2)}`;
  huidigePrijsEl.textContent = `€${huidigePrijs.toFixed(2)}`;
  inBezitEl.textContent = inBezit;
}

document.getElementById("koop-btn").addEventListener("click", () => {
  const bedrag = parseFloat(bedragInput.value);
  if (isNaN(bedrag) || bedrag <= 0) {
    investeringStatusEl.textContent = "Voer een geldig bedrag in.";
    return;
  }

  if (saldo >= bedrag) {
    const aantal = Math.floor(bedrag / huidigePrijs);
    saldo -= bedrag;
    inBezit += aantal;
    investeringStatusEl.textContent = `Je hebt €${bedrag.toFixed(2)} geïnvesteerd.`;
    investeringStatusEl.style.color = "green";
  } else {
    investeringStatusEl.textContent = "Onvoldoende saldo.";
    investeringStatusEl.style.color = "red";
  }

  updateCryptoInfo();
});

document.getElementById("verkoop-btn").addEventListener("click", () => {
  const bedrag = parseFloat(bedragInput.value);
  if (isNaN(bedrag) || bedrag <= 0) {
    investeringStatusEl.textContent = "Voer een geldig bedrag in.";
    return;
  }

  const aantal = Math.floor(bedrag / huidigePrijs);
  if (inBezit >= aantal) {
    saldo += bedrag;
    inBezit -= aantal;
    investeringStatusEl.textContent = `Je hebt €${bedrag.toFixed(2)} terugverdiend.`;
    investeringStatusEl.style.color = "green";
  } else {
    investeringStatusEl.textContent = "Onvoldoende eenheden in bezit.";
    investeringStatusEl.style.color = "red";
  }

  updateCryptoInfo();
});

// Simuleer prijsverandering
setInterval(() => {
  const verandering = Math.random() * 10 - 5; // Willekeurige verandering tussen -5 en +5
  huidigePrijs = Math.max(1, huidigePrijs + verandering); // Zorg dat de prijs niet negatief wordt
  updateCryptoInfo();
}, 5000);

updateCryptoInfo();
});
