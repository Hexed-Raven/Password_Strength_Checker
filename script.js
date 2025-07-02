// script.js
window.onload = () => {
  // Dynamically load password checker HTML
  fetch('passwordChecker.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('container').innerHTML = html;
    });

  // Dark/Light theme toggle
  const toggleBtn = document.getElementById("toggleTheme");
  toggleBtn.addEventListener("click", () => {
    document.body.dataset.theme =
      document.body.dataset.theme === "dark" ? "" : "dark";
      if(document.body.dataset.theme === "dark"){
        toggleBtn.innerHTML = '<i class="fa-solid fa-toggle-on"></i>';
      } else {
        toggleBtn.innerHTML = '<i class="fa-solid fa-toggle-off"></i>';
      }
  });
};

// Toggle password visibility
function togglePasswordVisibility() {
  const input = document.getElementById("passwordInput");
  const icon = document.getElementById("toggleVisibility");

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}

// Convert string to SHA-1 hash
async function sha1(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// Check if password is in breached HIBP DB
async function isPasswordBreached(password) {
  const hash = await sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);
  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const data = await res.text();
  return data.includes(suffix);
}

// Check password against local wordlist
async function checkAgainstWordlist(password) {
  const res = await fetch('wordlists/rockyou_mini.txt');
  const list = await res.text();
  return list.split('\n').includes(password);
}

// Main password checking logic (called on input)
async function checkPassword() {
  const password = document.getElementById('passwordInput').value;
  const resultBox = document.getElementById('resultBox');
  const scoreDisplay = document.getElementById('score');
  const lengthCheck = document.getElementById('lengthCheck');
  const complexityCheck = document.getElementById('complexityCheck');
  const breachCheck = document.getElementById('breachCheck');
  const bar = document.getElementById('strengthBar');
  const label = document.getElementById('strengthLabel');

  let score = 0;

  // Length validation
  if (password.length >= 8) {
    score += 3;
    lengthCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>Good Length';
    lengthCheck.className = "criteria-item success";
  } else {
    lengthCheck.innerHTML =' <i class="fa-solid fa-circle-exclamation"></i> Too Short (min 8)';
    lengthCheck.className = "criteria-item fail";
  }

  // Complexity validation
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (hasUpper && hasNumber && hasSpecial) {
    score += 5;
    complexityCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>Strong Complexity';
    complexityCheck.className = "criteria-item success";
  } else {
    complexityCheck.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>Add Uppercase, Number & Symbol';
    complexityCheck.className = "criteria-item fail";
  }

  // SQL injection pattern detection (basic)
  const sqlPattern = /('|--|;|\/\*|\*\/|drop|select|insert|update|delete|exec|union|xp_cmdshell)/i;
  if (sqlPattern.test(password)) {
    score -= 2;
  }

  // Wordlist & Breach check
  let breached = false;
  const inWordlist = await checkAgainstWordlist(password);
  if (inWordlist) breached = true;
  const inHIBP = await isPasswordBreached(password);
  if (inHIBP) breached = true;

  if (breached) {
    score -= 4;
    breachCheck.innerHTML ='<i class="fa-solid fa-circle-exclamation"></i> Found in Breached DB';
    breachCheck.className = "criteria-item fail";
  } else {
    score += 2;
    breachCheck.innerHTML = '<i class="fa-solid fa-circle-check"></i>Not Found in Breached DB';
    breachCheck.className = "criteria-item success";
  }

  // Final score and label
  const finalScore = Math.max(0, Math.min(10, score));
  scoreDisplay.textContent = `${finalScore}/10`;
  resultBox.classList.add("visible");

  // Update strength bar live
  const percent = (finalScore / 10) * 100;
  bar.style.width = percent + '%';
  if (finalScore <= 3) {
    bar.style.backgroundColor = 'red';
    label.textContent = 'Very Weak';
  } else if (finalScore <= 5) {
    bar.style.backgroundColor = 'orange';
    label.textContent = 'Weak';
  } else if (finalScore <= 7) {
    bar.style.backgroundColor = 'yellow';
    label.textContent = 'Moderate';
  } else if (finalScore < 10) {
    bar.style.backgroundColor = 'lightgreen';
    label.textContent = 'Strong';
  } else {
    bar.style.backgroundColor = 'green';
    label.textContent = 'Very Strong';
  }
}

// display suggestions

function showSuggestions() {
  const section = document.getElementById('goodPractices');
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}
