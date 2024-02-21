// Declare global variables
var n1, n2, n3, n4, n33, n44;
var calculations = [];

// Event listener for the "Calculate" button
document.getElementById("calculateBtn").addEventListener("click", function () {
  // Clear previous results
  var resultDiv = document.querySelector(".result");
  var selective = document.querySelector('.selective');

  resultDiv.innerHTML = "";

  if (document.getElementById("qartulis_qula").value == "") {
    alert('გთხოვთ შეიყვანოთ ქართულის ქულა')
    return
  };

  if (document.getElementById("qartulis_qula").value < 15 || document.getElementById("qartulis_qula").value > 60 ) {
    alert(`გთხოვთ შეიყვანოთ ქულა 15-იდან 60-მდე, შეყვანილი ქულა ${document.getElementById("qartulis_qula").value}`)
    return
  };

  if (document.getElementById("inglisuris_qula").value == "") {
    alert('გთხოვთ შეიყვანოთ ინგლისურის ქულა')
    return
  }

  if (document.getElementById("inglisuris_qula").value < 18 || document.getElementById("inglisuris_qula").value > 70 ) {
    alert(`გთხოვთ შეიყვანოთ ქულა 18-იდან 70-მდე, შეყვანილი ქულა ${document.getElementById("inglisuris_qula").value}`)
    return
  };

  // Get input values
  var subject = document.getElementById("subject").value;
  n1 = parseFloat(document.getElementById("qartulis_qula").value);
  n2 = parseFloat(document.getElementById("inglisuris_qula").value);

  // Calculate optional subject grades if applicable
  if (subject !== "") {
    if (subject === "matematika") {
      if (document.getElementById("matematikis_qula").value == "" ) {
        alert('გთხოვთ შეიყვანოთ მათემატიკის ქულა')
        return;
      };
      if (document.getElementById("matematikis_qula").value < 11 || document.getElementById("matematikis_qula").value > 51) {
        alert(`გთხოვთ შეიყვანოთ ქულა 11-იდან 51-მდე, შეყვანილი ქულა ${document.getElementById("matematikis_qula").value}`)
        return
      } else {
        n3 = parseFloat(document.getElementById("matematikis_qula").value);
        n33 = 15 * (59 * n3 / 51 - 22.928) / 12.251 + 150;
      }
    } else if (subject === "istoria") {
      if ( document.getElementById("istoriis_qula").value == "") {
        alert('გთხოვთ შეიყვანოთ ისტორიის ქულა')
        return;
    };
      if (document.getElementById("istoriis_qula").value < 15 || document.getElementById("istoriis_qula").value > 60) {
        alert(`გთხოვთ შეიყვანოთ ქულა 15-იდან 60-მდე, შეყვანილი ქულა ${document.getElementById("istoriis_qula").value}`)
        return;
      } else {
        n4 = parseFloat(document.getElementById("istoriis_qula").value);
        n44 = 15 * (59 * n4 / 60 - 30.928) / 12.251 + 150; // 185 129
      }
    }
  } else {
    alert("გთხოვთ აირჩიოთ არჩევითი საგანი")
    return;
  }

  selective.classList.add('none')

  // Calculate grades
  var n11 = 15 * (n1 - 37.42) / 12 + 150; // Formula adjusted for Qartulis
  var n22 = 15 * (n2 - 46) / 18 + 150; // Formula adjusted for Inglisuris
  var n = (n11 + n22 + (subject === "matematika" ? 1.5 * n33 : 0) + (subject === "istoria" ? 1.5 * n44 : 0)) * 10;

  // Display the result
  resultDiv.innerHTML += `<p> ქართულის სკალირებული ქულაა ${n11.toFixed(2)} </p>`
  resultDiv.innerHTML += `<p> ინგლისურის სკალირებული ქულაა ${n22.toFixed(2)} </p>`

  if (subject === "matematika") {
    resultDiv.innerHTML += `<p> მათემატიკის სკალირებული ქულაა ${n33.toFixed(2)} </p>`
    resultDiv.innerHTML += `<p> თქვენი საგრანტო ქულაა ${n.toFixed(2)} </p>`;
    if (n < 5713.5) {
      resultDiv.innerHTML += " <div style='background-color: #91a3b0' > სამწუხაროდ თქვენ ვერ მოიპოვეთ გრანტი </div>";
    } else if (n < 5965.5) {
      resultDiv.innerHTML += "<div>თქვენ მოიპოვეთ 50%-იანი გრანტი </div>";
    } else if (n < 6141.5) {
      resultDiv.innerHTML += "<div>თქვენ მოიპოვეთ 70%-იანი გრანტი </div>";
    } else {
      resultDiv.innerHTML += "<div>თქვენ მოიპოვეთ 100%-იანი გრანტი </div>";
    }
  } else if (subject === "istoria") {
    resultDiv.innerHTML += `<p> ისტორიის სკალირებული ქულაა ${n44.toFixed(2)} </p>`
    resultDiv.innerHTML += `<p> თქვენი საგრანტო ქულაა ${n.toFixed(2)} </p>`;
    if (n < 5804.0) {
      resultDiv.innerHTML += "<div style='background-color: #91a3b0'>სამწუხაროდ თქვენ ვერ მოიპოვეთ გრანტი. </div>";
    } else if (n < 5968.5) {
      resultDiv.innerHTML += "<div>თქვენ მოიპოვეთ 50%-იანი გრანტი </div>";
    } else if (n < 6060.0) {
      resultDiv.innerHTML += "<div>თქვენ მოიპოვეთ 70%-იანი გრანტი </div>";
    } else {
      resultDiv.innerHTML += "<div>თქვენ მოიპოვეთ 100%-იანი გრანტი </div>";
    }
    
  }

  const againBtn = document.createElement('button');
  resultDiv.appendChild(againBtn);
  againBtn.textContent = "ახლიდან ცდა";
  againBtn.classList.add('buttons')

  againBtn.addEventListener('click', function () {
    resultDiv.classList.add('none')
    selective.classList.remove('none')

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
  })
  resultDiv.classList.remove('none')
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
      var n33 = 15 * (59 * n3 / 51 - 22.928) / 12.251 + 150;
    } else {
      var archeviti_number = Math.floor(Math.random() * (60 - 52 + 1)) + 52;
      document.getElementById("istoriis_qula").value = archeviti_number;
      var n4 = parseFloat(document.getElementById("istoriis_qula").value);
      var n44 = 15 * (59 * n4 / 60 - 30.928) / 12.251 + 150; // 185 129
    }
  
    var n11 = 15 * (qartuli_random - 37.42) / 12 + 150;
    var n22 = 15 * (inglisuri_random - 46) / 18 + 150;
    var n = (n11 + n22 + (subject === "matematika" ? 1.5 * n33 : 0) + (subject === "istoria" ? 1.5 * n44 : 0)) * 10;
    console.log(n);
  }
});




// Function to delete the welcome message
document.getElementById("deleteMessageBtn").addEventListener("click", function () {
  var welcomeMessage = document.getElementById("welcomeMessage");
  var overlay = document.getElementById("overlay");
  welcomeMessage.style.display = "none";
  overlay.style.display = "none";
});

// Show welcome message when the page loads
window.onload = function () {
  var welcomeMessage = document.getElementById("welcomeMessage");
  var overlay = document.getElementById("overlay");
  welcomeMessage.style.display = "block";
  overlay.style.display = "block";
};
