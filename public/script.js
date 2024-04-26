
// This script is not necessary for the typing effect itself
// It's included in case you want to dynamically change the text

const text = "A normal fetal condition in pregnancy signifies that the baby's development follows expected patterns without concerning issue Normal fetal conditions involve expected growth, stable heart rates indicating good oxygenation, consistent movements reflecting well-being absence of structural anomalies in scans, and maternal health free from complicatio  Confirmation of a normal fetal condition assures both mother and baby of good health. Consistent prenatal care and evaluations play a crucial role in continual verifying the fetus's normal progression throughout the pregnancy, ensuring a reassuring state of well-being for both.";
const typingText = document.getElementById('p');

let index = 0;

function type() {
  p.textContent = text.slice(0, index);

  if (index < text.length) {
    index++;
    setTimeout(type, 50); // Adjust the typing speed (milliseconds)
  }
}

// Uncomment the line below if you want the typing effect to start automatically
// type();
