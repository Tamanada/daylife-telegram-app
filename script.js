// DAYLIFE – Global life counter with real demographic data 🌍

// HTML elements
const birthInput = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");
const daysLivedSpan = document.getElementById("daysLived");

// Create country and sex selectors dynamically
const container = document.querySelector(".counter");

const countrySelect = document.createElement("select");
countrySelect.id = "country";
countrySelect.innerHTML = `<option value="">🌎 Select your country</option>`;
container.insertBefore(countrySelect, birthInput);

const sexSelect = document.createElement("select");
sexSelect.id = "sex";
sexSelect.innerHTML = `
  <option value="">🧍 Select your sex</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
`;
container.insertBefore(sexSelect, birthInput);

// Load countries from REST Countries API
async function loadCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    data.forEach(c => {
      const option = document.createElement("option");
      option.value = c.cca2.toLowerCase(); // country code
      option.textContent = c.name.common;
      countrySelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading countries:", err);
  }
}
loadCountries();

// Fetch life expectancy from World Bank API
async function getLifeExpectancy(countryCode, sex) {
  const indicator =
    sex === "male"
      ? "SP.DYN.LE00.MA.IN"
      : "SP.DYN.LE00.FE.IN";

  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // find most recent value available
    if (data && data[1]) {
      const latest = data[1].find(entry => entry.value !== null);
      return latest ? latest.value : 75; // fallback average
    }
  } catch (err) {
    console.error("Error fetching life expectancy:", err);
  }

  return 75; // default fallback
}

// Main calculation
calculateBtn.addEventListener("click", async () => {
  const birthDate = new Date(birthInput.value);
  const countryCode = countrySelect.value;
  const sex = sexSelect.value;

  if (!birthDate || !countryCode || !sex) {
    alert("Please fill all fields (country, sex, and birth date).");
    return;
  }

  // Calculate days lived
  const today = new Date();
  const diff = today - birthDate;
  const daysLived = Math.floor(diff / (1000 * 60 * 60 * 24));
  daysLivedSpan.textContent = daysLived.toLocaleString();

  // Fetch expected life expectancy
  const lifeExpYears = await getLifeExpectancy(countryCode, sex);
  const totalExpectedDays = Math.round(lifeExpYears * 365);
  const daysRemaining = totalExpectedDays - daysLived;

  // Display
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h2>You have lived <strong>${daysLived.toLocaleString()}</strong> days.</h2>
    <p>In ${countrySelect.selectedOptions[0].text} the average ${sex} lives about <strong>${lifeExpYears.toFixed(1)}</strong> years.</p>
    <p>That means you may have around <strong>${daysRemaining.toLocaleString()}</strong> days left. Make each one count 🌙</p>
  `;
});
