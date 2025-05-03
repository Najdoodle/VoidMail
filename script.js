document.getElementById('voidMailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const sendTime = document.getElementById('sendTime').value;
    if (email && message && sendTime) {
      document.getElementById('successMessage').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('successMessage').classList.add('hidden');
      }, 5000);
    }
  });  