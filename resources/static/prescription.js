document.getElementById('prescriptionForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Get form values
    const doctorName = document.getElementById('doctorName').value;
    const patientName = document.getElementById('patientName').value;
    const age = parseInt(document.getElementById('age').value, 10); // Ensure age is a number
    const medicines = document.getElementById('medicines').value;
    const dosage = document.getElementById('dosage').value;
    const nextVisitString = document.getElementById('nextVisit').value;
  
    // Convert to Firestore Timestamp
    const nextVisit = nextVisitString ? Timestamp.fromDate(new Date(nextVisitString + "T00:00:00Z")) : null;
  
    try {
      // Save form data to Firestore
      await addDoc(collection(db, "prescriptions"), {
        doctorName: doctorName,
        patientName: patientName,
        age: age,
        medicines: medicines,
        dosage: dosage,
        nextVisit: nextVisit // Store as Timestamp
      });
  
      // Show confirmation message
      document.getElementById('confirmationMessage').textContent = "Prescription submitted successfully!";
      document.getElementById('confirmationMessage').style.color = 'green';
  
      // Clear the form after submission
      document.getElementById('prescriptionForm').reset();
    } catch (error) {
      document.getElementById('errorMessage').textContent = "Error: " + error.message;
    }
   

  });
  