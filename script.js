function calculate() {
    var subject = document.getElementById("subject").value;
    var n1 = parseFloat(document.getElementById("qartulis_qula").value);
    var n2 = parseFloat(document.getElementById("inglisuris_qula").value);
    var n3, n4, n33, n44;
  
    if (subject === "matematika") {
      n3 = parseFloat(document.getElementById("matematikis_qula").value);
      n33 = 15 * (59 * n3 / 51 - 22.928) / 12.251 + 150;
    } else if (subject === "istoria") {
      n4 = parseFloat(document.getElementById("istoriis_qula").value);
      n44 = 15 * (59 * n4 / 51 - 22.928) / 12.251 + 150;
    }
  
    var n11 = 15 * (n1 - 37.42) / 12 + 150; // Formula adjusted for Qartulis
    var n22 = 15 * (n2 - 46) / 18 + 150; // Formula adjusted for Inglisuris
    var n = (n11 + n22 + (subject === "matematika" ? 1.5 * n33 : 0) + (subject === "istoria" ? 1.5 * n44 : 0)) * 10;
  
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "ქართულის სკალირებული ქულაა: " + n11.toFixed(2) + "<br>" + 
                          "ინგლისურის სკალირებული ქულაა: " + n22.toFixed(2) + "<br>";
  
    if (subject === "matematika") {
      resultDiv.innerHTML += "მათემატიკის სკალირებული ქულაა: " + n33.toFixed(2) + "<br>";
      if (n < 5713.5) {
        resultDiv.innerHTML += "სამწუხაროდ თქვენ ვერ მოიპოვეთ გრანტი";
      } else if (n < 5965.5) {
        resultDiv.innerHTML += "გილოცავთ, თქვენ მოიპოვეთ 50%-იანი გრანტი";
      } else if (n < 6141.5) {
        resultDiv.innerHTML += "გილოცავთ, თქვენ მოიპოვეთ 70%-იანი გრანტი";
      } else {
        resultDiv.innerHTML += "გილოცავთ, თქვენ მოიპოვეთ 100%-იანი გრანტი";
      }
    } else if (subject === "istoria") {
      resultDiv.innerHTML += "ისტორიის სკალირებული ქულაა: " + n44.toFixed(2) + "<br>";
      if (n < 5804.0) {
        resultDiv.innerHTML += "სამწუხაროდ თქვენ ვერ მოიპოვეთ გრანტი.";
      } else if (n < 5968.5) {
        resultDiv.innerHTML += "სამწუხაროდ თქვენ ვერ მოიპოვეთ გრანტი";
      } else if (n < 6060.0) {
        resultDiv.innerHTML += "გილოცავთ, თქვენ მოიპოვეთ 70%-იანი გრანტი";
      } else {
        resultDiv.innerHTML += "გილოცავთ, თქვენ მოიპოვეთ 100%-იანი გრანტი";
      }
    }
  
    resultDiv.innerHTML += "Tqveni sagranto qulaa: " + n.toFixed(2) + "<br>";
  }
  
  // Dynamically create the optional subject input field based on subject selection
  document.getElementById("subject").addEventListener("change", function() {
    var subject = this.value;
    var container = document.getElementById("optional_subject_container");
    container.innerHTML = "";
  
    if (subject === "matematika") {
      container.innerHTML = '<label for="matematikis_qula">მათემატიკის ქულა:</label>' +
                            '<input type="number" id="matematikis_qula" step="1"><br>';
    } else if (subject === "istoria") {
      container.innerHTML = '<label for="istoriis_qula">ისტორიის ქულა</label>' +
                            '<input type="number" id="istoriis_qula" step="1"><br>';
    }
  });
  