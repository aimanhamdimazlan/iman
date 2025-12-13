const packages = [
    {
        name: "SET DULANG BESAR AYAM",
        ingredients: { "AYAM : KETUL": 10, "BERAS : KG": 0.6 }
    },
    {
        name: "SET DULANG BESAR CAMPUR",
        ingredients: { "AYAM : KETUL": 8, "KAMBING : KG": 0.5, "BERAS : KG": 0.6 }
    },
    {
        name: "SET DULANG BESAR KAMBING",
        ingredients: { "KAMBING : KG": 1.6, "BERAS : KG": 0.6 }
    },
    {
        name: "SET BBQ AYAM SEKOR",
        ingredients: { "AYAM SEKOR 1.7KG : EKOR": 1, "BERAS : KG": 0.4 }
    },
    {
        name: "SET PERI-PERI AYAM SEKOR",
        ingredients: { "AYAM SEKOR 1.7KG : EKOR": 1, "BERAS : KG": 0.4 }
    },
    {
        name: "SET RUSUK KAMBING",
        ingredients: { "RUSUK KAMBING : KG": 1, "BERAS : KG": 0.4 }
    },
    {
        name: "SINGLE AYAM",
        ingredients: { "AYAM PISTOL : KETUL": 1, "BERAS : KG": 0.11 }
    },
    {
        name: "SINGLE AYAM MANDY PISTOL",
        ingredients: { "AYAM PISTOL : KETUL": 1, "BERAS : KG": 0.11 }
    },
    {
        name: "SINGLE AYAM PERI-PERI",
        ingredients: { "AYAM PISTOL : KETUL": 1, "BERAS : KG": 0.11 }
    },
    {
        name: "SINGLE AYAM BBQ",
        ingredients: { "AYAM PISTOL : KETUL": 1, "BERAS : KG": 0.11 }
    },
    {
        name: "SINGLE KAMBING",
        ingredients: { "KAMBING : KG": 0.2, "BERAS : KG": 0.11 }
    },
    {
        name: "SINGLE LAMBSHANK",
        ingredients: { "LAMBSHANK : BATANG": 1, "BERAS : KG": 0.11 }
    },
    {
        name: "SET MINI BUFET AYAM",
        ingredients: { "AYAM : KETUL": 30, "BERAS : KG": 2 }
    },
    {
        name: "SET MINI BUFET KAMBING",
        ingredients: { "KAMBING : KG": 30, "BERAS : KG": 2 }
    },
    {
        name: "SET MINI BUFET CAMPUR",
        ingredients: { "AYAM : KETUL": 15, "KAMBING : KG": 15, "BERAS : KG": 2 }
    }
];

const packageListContainer = document.getElementById('packageList');
const resultsContainer = document.getElementById('results');

// Generate Inputs with Stepper UI
packages.forEach((pkg, index) => {
    const div = document.createElement('div');
    div.className = 'package-item';
    div.innerHTML = `
        <label>${pkg.name}</label>
        <div class="stepper">
            <button type="button" class="stepper-btn" onclick="updateQty(${index}, -1)">-</button>
            <input type="number" id="pkg-${index}" class="stepper-input" value="0" min="0" data-index="${index}" oninput="calculateIngredients()">
            <button type="button" class="stepper-btn" onclick="updateQty(${index}, 1)">+</button>
        </div>
    `;
    packageListContainer.appendChild(div);
});

// Update Quantity Helper
window.updateQty = function (index, change) {
    const input = document.getElementById(`pkg-${index}`);
    let currentQty = parseInt(input.value) || 0;
    let newQty = currentQty + change;

    if (newQty < 0) newQty = 0;

    input.value = newQty;
    calculateIngredients();
}

function calculateIngredients() {
    const totals = {};
    let hasOrder = false;

    const inputs = document.querySelectorAll('.stepper-input');

    inputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            hasOrder = true;
            const pkgIndex = input.getAttribute('data-index');
            const pkg = packages[pkgIndex];

            for (const [ingredient, amount] of Object.entries(pkg.ingredients)) {
                if (!totals[ingredient]) {
                    totals[ingredient] = 0;
                }
                totals[ingredient] += (amount * qty);
            }
        }
    });

    displayResults(totals, hasOrder);
}

function displayResults(totals, hasOrder) {
    if (!hasOrder) {
        resultsContainer.innerHTML = '<p class="placeholder-text">Tambah pesanan...</p>';
        return;
    }

    let html = '';
    const sortedIngredients = Object.keys(totals).sort();

    sortedIngredients.forEach(ingredient => {
        const val = Math.round(totals[ingredient] * 100) / 100;
        html += `
            <div class="result-item">
                <span>${ingredient}</span>
                <span class="result-value">${val}</span>
            </div>
        `;
    });

    resultsContainer.innerHTML = html;
}
