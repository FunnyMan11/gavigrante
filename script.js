// Declare global variables
var n1, n2, n3, n4, n33, n44;
var calculations = [];
var calculationCounter = 0;

document.addEventListener("DOMContentLoaded", function() {
  const box = document.getElementById('box');

  // Show the box immediately
  box.style.opacity = 1;

  // Hide the box after 3 seconds
  setTimeout(() => {
    // Apply transition for smooth disappearing
    box.style.transition = "opacity 1s ease";
    box.style.opacity = 0;

    // Remove the box from the DOM after the transition completes
    setTimeout(() => {
      document.body.removeChild(box);
    }, 1000); // Adjust this value to match the transition duration
  }, 4000);
});


// Event listener for the "Calculate" button
document.getElementById("calculateBtn").addEventListener("click", function () {
  calculationCounter++;

  // Check if the counter reaches 5
  if (calculationCounter === 5) {
    // Create and display the pop-up div
    var popupDiv = document.getElementById("popup");
    popupDiv.style.display = "block"
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    // Reset the counter
    // calculationCounter = 0;
  }

  // Clear previous results
  var resultDiv = document.querySelector(".result");
  var selective = document.querySelector(".selective");

  resultDiv.innerHTML = "";

  if (document.getElementById("qartulis_qula").value == "") {
    alert("გთხოვთ შეიყვანოთ ქართულის ქულა");
    return;
  }

  if (
    document.getElementById("qartulis_qula").value < 15 ||
    document.getElementById("qartulis_qula").value > 60
  ) {
    alert(
      `გთხოვთ შეიყვანოთ ქულა 15-იდან 60-მდე, შეყვანილი ქულა ${document.getElementById("qartulis_qula").value
      }`
    );
    return;
  }

  if (document.getElementById("inglisuris_qula").value == "") {
    alert("გთხოვთ შეიყვანოთ ინგლისურის ქულა");
    return;
  }

  if (
    document.getElementById("inglisuris_qula").value < 18 ||
    document.getElementById("inglisuris_qula").value > 70
  ) {
    alert(
      `გთხოვთ შეიყვანოთ ქულა 18-იდან 70-მდე, შეყვანილი ქულა ${document.getElementById("inglisuris_qula").value
      }`
    );
    return;
  }

  // Get input values
  var subject = document.getElementById("subject").value;
  n1 = parseFloat(document.getElementById("qartulis_qula").value);
  n2 = parseFloat(document.getElementById("inglisuris_qula").value);

  // Calculate optional subject grades if applicable
  if (subject !== "") {
    if (subject === "matematika") {
      if (document.getElementById("matematikis_qula").value == "") {
        alert("გთხოვთ შეიყვანოთ მათემატიკის ქულა");
        return;
      }
      if (
        document.getElementById("matematikis_qula").value < 11 ||
        document.getElementById("matematikis_qula").value > 51
      ) {
        alert(
          `გთხოვთ შეიყვანოთ ქულა 11-იდან 51-მდე, შეყვანილი ქულა ${document.getElementById("matematikis_qula").value
          }`
        );
        return;
      } else {
        n3 = parseFloat(document.getElementById("matematikis_qula").value);
        n33 = (15 * ((59 * n3) / 51 - 22.928)) / 12.251 + 150;
      }
    } else if (subject === "istoria") {
      if (document.getElementById("istoriis_qula").value == "") {
        alert("გთხოვთ შეიყვანოთ ისტორიის ქულა");
        return;
      }
      if (
        document.getElementById("istoriis_qula").value < 15 ||
        document.getElementById("istoriis_qula").value > 60
      ) {
        alert(
          `გთხოვთ შეიყვანოთ ქულა 15-იდან 60-მდე, შეყვანილი ქულა ${document.getElementById("istoriis_qula").value
          }`
        );
        return;
      } else {
        n4 = parseFloat(document.getElementById("istoriis_qula").value);
        n44 = (15 * ((59 * n4) / 60 - 30.928)) / 12.251 + 150; // 185 129
      }
    }
  } else {
    alert("გთხოვთ აირჩიოთ არჩევითი საგანი");
    return;
  }

  selective.classList.add("none");

  // Calculate grades
  var n11 = (15 * (n1 - 37.42)) / 12 + 150; // Formula adjusted for Qartulis
  var n22 = (15 * (n2 - 46)) / 18 + 150; // Formula adjusted for Inglisuris
  var n =
    (n11 +
      n22 +
      (subject === "matematika" ? 1.5 * n33 : 0) +
      (subject === "istoria" ? 1.5 * n44 : 0)) *
    10;

  // Display the result
  resultDiv.innerHTML += `<p> ქართულის სკალირებული ქულაა ${n11.toFixed(
    2
  )} </p>`;
  resultDiv.innerHTML += `<p> ინგლისურის სკალირებული ქულაა ${n22.toFixed(
    2
  )} </p>`;

  if (subject === "matematika") {
    resultDiv.innerHTML += `<p> მათემატიკის სკალირებული ქულაა ${n33.toFixed(
      2
    )} </p>`;
    resultDiv.innerHTML += `<p> თქვენი საგრანტო ქულაა ${n.toFixed(2)} </p>`;
    if (n < 5713.5) {
      grantP = "არ აქვს";
      resultDiv.innerHTML +=
        " <div style='background-color: #91a3b0' > სამწუხაროდ თქვენ ვერ მოიპოვეთ გრანტი </div>";
    } else if (n < 5965.5) {
      grantP = "50%";
      resultDiv.innerHTML += `<div>თქვენ მოიპოვეთ ${grantP}-იანი გრანტი </div>`;
    } else if (n < 6141.5) {
      grantP = "70%";
      resultDiv.innerHTML += `<div>თქვენ მოიპოვეთ ${grantP}-იანი გრანტი </div>`;
    } else {
      grantP = "100%";
      resultDiv.innerHTML += `<div>თქვენ მოიპოვეთ ${grantP}-იანი გრანტი </div>`;
    }
  } else if (subject === "istoria") {
    resultDiv.innerHTML += `<p> ისტორიის სკალირებული ქულაა ${n44.toFixed(
      2
    )} </p>`;
    resultDiv.innerHTML += `<p> თქვენი საგრანტო ქულაა ${n.toFixed(2)} </p>`;
    if (n < 5804.0) {
      grantP = "არ აქვს";
      resultDiv.innerHTML +=
        "<div style='background-color: #91a3b0'>სამწუხაროდ თქვენ ვერ მოიპოვეთ გრანტი. </div>";
    } else if (n < 5968.5) {
      grantP = "50%";
      resultDiv.innerHTML += `<div>თქვენ მოიპოვეთ ${grantP}-იანი გრანტი </div>`;
    } else if (n < 6060.0) {
      grantP = "70%";
      resultDiv.innerHTML += `<div>თქვენ მოიპოვეთ ${grantP}-იანი გრანტი </div>`;
    } else {
      grantP = "100%";
      resultDiv.innerHTML += `<div>თქვენ მოიპოვეთ ${grantP}-იანი გრანტი </div>`;
    }
  }

  // Store current calculation
  var currentCalculation = {
    qartulis_qula: document.getElementById("qartulis_qula").value,
    inglisuris_qula: document.getElementById("inglisuris_qula").value,
    archeviti_qula: subject === "matematika" ? document.getElementById("matematikis_qula").value : document.getElementById("istoriis_qula").value,
    qartulis_skalirebuli: n11.toFixed(2),
    inglisuris_skalirebuli: n22.toFixed(2),
    matematikis_skalirebuli: subject === "matematika" ? n33.toFixed(2) : null,
    istoriis_skalirebuli: subject === "istoria" ? n44.toFixed(2) : null,
    n33: subject === "matematika" ? n33.toFixed(2) : null,
    n44: subject === "istoria" ? n44.toFixed(2) : null,
    total: n.toFixed(2),
    grantP: grantP,
  };

  // Add current calculation to the calculations array
  calculations.push(currentCalculation);


  // Display all calculations
  const prevCalc = document.getElementById("prevCalc");
  prevCalc.innerHTML = "";
  prevCalc.innerHTML = `<div class="delete-data" id="deleteData"><i class="fa-regular fa-trash-can"></i></div>`;
  calculations.forEach((calculation, index) => {
    prevCalc.innerHTML += `<p><strong>კალკულაცია ${index + 1}</strong></p>`;
    prevCalc.innerHTML += `<p>ქართული ${calculation.qartulis_qula} -- ს / ქ  ${calculation.qartulis_skalirebuli}</p>`;
    prevCalc.innerHTML += `<p>ინგლისური ${calculation.inglisuris_qula} -- ს / ქ  ${calculation.inglisuris_skalirebuli}</p>`;
    prevCalc.innerHTML += `<p>${subject === "matematika" ? `მათემატიკა ${calculation.archeviti_qula} -- ს / ქ  ${calculation.n33}` : `ისტორია ${calculation.archeviti_qula} -- ს / ქ  ${calculation.n44}`}</p>`;
    prevCalc.innerHTML += `<p>თქვენი საგრანტო ქულაა ${calculation.total}</p>`;
    prevCalc.innerHTML += `<p style="color: ${calculation.grantP !== "არ აქვს" ? "green" : "red"};"> გრანტი - ${calculation.grantP} </p>`;
    prevCalc.innerHTML += `<hr>`;
  });
  resultDiv.classList.remove("none");

  var deleteData = document.getElementById("deleteData");
  deleteData.addEventListener("click", deleteAllData);

  function deleteAllData() {
    calculations = []; // Clear calculations array
    const prevCalc = document.getElementById("prevCalc");
    prevCalc.innerHTML = "<h2>არ არის მონაცემი</h2>"; // Clear previous calculations HTML
  }

  function handleSubjectChange() {
    calculations = []; // Clear previous calculations
    const prevCalc = document.getElementById("prevCalc");
    prevCalc.innerHTML = "<h2>არ არის მონაცემი</h2>"; // Clear previous calculations HTML
  }

  // Attach the event listener to the subject select element
  var subjectElement = document.getElementById("subject");
  subjectElement.addEventListener("change", handleSubjectChange);


  const againBtn = document.createElement("button");
  resultDiv.appendChild(againBtn);
  againBtn.textContent = "ახლიდან ცდა";
  againBtn.classList.add("buttons");

  againBtn.addEventListener("click", function () {
    resultDiv.classList.add("none");
    selective.classList.remove("none");

    if (document.getElementById("qartulis_qula")) {
      document.getElementById("qartulis_qula").value = "";
    }
    if (document.getElementById("inglisuris_qula")) {
      document.getElementById("inglisuris_qula").value = "";
    }
    if (document.getElementById("matematikis_qula")) {
      if (document.getElementById("matematikis_qula").value !== "") {
        document.getElementById("matematikis_qula").value = "";
      }
    }
    if (document.getElementById("istoriis_qula")) {
      if (document.getElementById("istoriis_qula").value !== "") {
        document.getElementById("istoriis_qula").value = "";
      }
    }
  });
  resultDiv.classList.remove("none");
});

// Dynamically create the optional subject input field based on subject selection
document.getElementById("subject").addEventListener("change", function () {
  var subject = this.value;
  var optionalContainer = document.getElementById("optional_subject_container");
  optionalContainer.innerHTML = "";

  if (subject === "matematika") {
    optionalContainer.innerHTML =
      '<label for="matematikis_qula">მათემატიკის ქულა:</label>' +
      '<input type="number" id="matematikis_qula" step="1"><br>';
  } else if (subject === "istoria") {
    optionalContainer.innerHTML =
      '<label for="istoriis_qula">ისტორიის ქულა</label>' +
      '<input type="number" id="istoriis_qula" step="1"><br>';
  }
});
document.getElementById("generateBtn").addEventListener("click", function () {
  var qartuli_random = Math.floor(Math.random() * (60 - 45 + 1)) + 45;
  document.getElementById("qartulis_qula").value = qartuli_random;

  var inglisuri_random = Math.floor(Math.random() * (70 - 55 + 1)) + 55;
  document.getElementById("inglisuris_qula").value = inglisuri_random;

  var subject = document.getElementById("subject").value;

  if (subject === "") {
    alert("გთხოვთ აირჩიოთ არჩევითი საგანი");
    return;
  } else {
    if (subject === "matematika") {
      var archeviti_number = Math.floor(Math.random() * (51 - 33 + 1)) + 33;
      document.getElementById("matematikis_qula").value = archeviti_number;
      var n3 = parseFloat(document.getElementById("matematikis_qula").value);
      var n33 = (15 * ((59 * n3) / 51 - 22.928)) / 12.251 + 150;
    } else {
      var archeviti_number = Math.floor(Math.random() * (60 - 52 + 1)) + 52;
      document.getElementById("istoriis_qula").value = archeviti_number;
      var n4 = parseFloat(document.getElementById("istoriis_qula").value);
      var n44 = (15 * ((59 * n4) / 60 - 30.928)) / 12.251 + 150; // 185 129
    }

    var n11 = (15 * (qartuli_random - 37.42)) / 12 + 150;
    var n22 = (15 * (inglisuri_random - 46)) / 18 + 150;
    var n =
      (n11 +
        n22 +
        (subject === "matematika" ? 1.5 * n33 : 0) +
        (subject === "istoria" ? 1.5 * n44 : 0)) *
      10;
    console.log(n);
  }
});

function toggleMenu() {
  var element = document.getElementById("prevCalc");
  var burgerMenu = document.getElementById("burgerMenu");
  element.classList.toggle("show");
  if (element.classList.contains("show")) {
    burgerMenu.innerHTML = `<i class="fa-solid fa-x"></i>`;
    burgerMenu.style.backgroundColor = "transparent";
    burgerMenu.style.fontSize = "30px";
    burgerMenu.style.padding = "20px 0px 0px 20px";
  } else {
    burgerMenu.innerHTML = `<i class="fa-solid fa-list-ol"></i>`;
    burgerMenu.style.backgroundColor = "";
    burgerMenu.style.fontSize = "";
    burgerMenu.style.padding = "10px 20px";
  }
}


document.addEventListener("DOMContentLoaded", function () {
  // Fetch the data from data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the quotes array from data
      const quotes = data.quotes;

      // Function to display a random quote
      function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Update the HTML with the random quote
        document.getElementById(
          "quote-text"
        ).textContent = `"${randomQuote.quote}"`;
        document.getElementById(
          "quote-author"
        ).textContent = `- ${randomQuote.author}`;
      }

      // Display a random quote initially
      displayRandomQuote();

      // Set interval to change the quote every 30 seconds
      setInterval(displayRandomQuote, 15000);
    })
    .catch((error) => console.error("Error fetching data:", error));
});


document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("modeChange");

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      document.body.style.backgroundColor = "black"; // Set background color to black
      toggleButton.textContent = "Light Mode";
    } else {
      document.body.style.backgroundColor = "white"; // Revert to original background color
      toggleButton.textContent = "Dark Mode";
    }
  });

});


// Show welcome message when the page loads
window.onload = function () {
  var welcomeMessage = document.getElementById("welcomeMessage");
  var overlay = document.getElementById("overlay");
  welcomeMessage.style.display = "block";
  overlay.style.display = "block";
};

const shareUs = document.getElementById("shareUs")

shareUs.addEventListener('click', function(){
  var popupDiv = document.getElementById("popup");
  popupDiv.style.display = "block"
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";
})

// Function to delete the welcome message
document.getElementById("deleteMessageBtn").addEventListener("click", function () {
  var welcomeMessage = document.getElementById("welcomeMessage");
  var overlay = document.getElementById("overlay");
  welcomeMessage.style.display = "none";
  overlay.style.display = "none";
});

function shareOnFacebook() {
  var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
  window.open(shareUrl, '_blank', 'toolbar=0,status=0,width=626,height=436');
}

function shareOnMessenger() {
  var shareUrl = 'fb-messenger://share/?link=' + encodeURIComponent(window.location.href) + '&app_id=123456789';
  window.open(shareUrl);
}

function shareOnTwitter() {
  var shareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href);
  window.open(shareUrl, '_blank', 'toolbar=0,status=0,width=626,height=436');
}

function shareOnLinkedIn() {
  var shareUrl = 'https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(window.location.href);
  window.open(shareUrl, '_blank', 'toolbar=0,status=0,width=626,height=436');
}

function shareOnPinterest() {
  var shareUrl = 'https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(window.location.href);
  window.open(shareUrl, '_blank', 'toolbar=0,status=0,width=626,height=436');
}

function shareOnWhatsApp() {
  var shareUrl = 'whatsapp://send?text=' + encodeURIComponent(window.location.href);
  window.open(shareUrl);
}

function shareOnReddit() {
  var shareUrl = 'https://www.reddit.com/submit?url=' + encodeURIComponent(window.location.href);
  window.open(shareUrl, '_blank', 'toolbar=0,status=0,width=626,height=436');
}

function shareOnGmail() {
  var subject = 'Check out this website';
  var body = 'I found this website and thought you might be interested: ' + window.location.href;
  var mailtoUrl = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  window.location.href = mailtoUrl;
}

document.getElementById("closePopupBtn").addEventListener('click', function () {
  var popupDiv = document.getElementById("popup");
  popupDiv.style.display = "none"
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
})


