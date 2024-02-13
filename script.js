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
    resultDiv.innerHTML = "Qartulis skalirebuli qulaa: " + n11.toFixed(2) + "<br>" + 
                          "Inglisuris skalirebuli qulaa: " + n22.toFixed(2) + "<br>";
  
    if (subject === "matematika") {
      resultDiv.innerHTML += "Matematikis skalirebuli qulaa: " + n33.toFixed(2) + "<br>";
      if (n < 5713.5) {
        resultDiv.innerHTML += "Samwuxarod ver moipovet granti.";
      } else if (n < 5965.5) {
        resultDiv.innerHTML += "Tqven moipoet 50%-iani granti.";
      } else if (n < 6141.5) {
        resultDiv.innerHTML += "Tqven moipovet 70%-iani granti.";
      } else {
        resultDiv.innerHTML += "Tqven moipovet 100%-iani granti.";
      }
    } else if (subject === "istoria") {
      resultDiv.innerHTML += "Istoriis skalirebuli qulaa: " + n44.toFixed(2) + "<br>";
      if (n < 5804.0) {
        resultDiv.innerHTML += "Samwuxarod ver moipovet granti.";
      } else if (n < 5968.5) {
        resultDiv.innerHTML += "Tqven moipoet 50%-iani granti.";
      } else if (n < 6060.0) {
        resultDiv.innerHTML += "Tqven moipovet 70%-iani granti.";
      } else {
        resultDiv.innerHTML += "Tqven moipovet 100%-iani granti.";
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
      container.innerHTML = '<label for="matematikis_qula">Matematikis qula:</label>' +
                            '<input type="number" id="matematikis_qula" step="0.01"><br>';
    } else if (subject === "istoria") {
      container.innerHTML = '<label for="istoriis_qula">Istoriis qula:</label>' +
                            '<input type="number" id="istoriis_qula" step="0.01"><br>';
    }
  });
  