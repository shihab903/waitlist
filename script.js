document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('success-message');
  const form = document.getElementById('waitlist-form');

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Button loading state
  submitBtn.innerHTML = `
    <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  `;
  submitBtn.disabled = true;

  try {
    // এখানে তোমার ব্যাকএন্ড বা Formspree / Web3Forms / Make.com / n8n ইত্যাদি API দিতে পারো
    // উদাহরণস্বরূপ Web3Forms (ফ্রি):

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_key: "তোমার_web3forms_access_key",   // ← entire your access key
        name: name,
        email: email,
        subject: "New Waitlist Signup",
        message: `Name: ${name}\nEmail: ${email}`
      })
    });

    if (response.ok) {
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
    } else {
      alert("try again");
    }
  } catch (error) {
    console.error(error);
    alert("check your internet connection");
  } finally {
    submitBtn.innerHTML = 'join waitlist';
    submitBtn.disabled = false;
  }
});
