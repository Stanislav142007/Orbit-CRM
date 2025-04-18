function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('open');
  }

  function toggleSupportForm() {
    const widget = document.querySelector('.animated-support-widget');
    const form = document.getElementById('supportForm');

    form.classList.toggle('active');
    widget.classList.toggle('form-active');

  }

async function submitSupportForm() {
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;
const supportMessage = document.getElementById('support-message');
const form = document.getElementById('supportForm');


supportMessage.classList.remove('success', 'error');
supportMessage.textContent = '';
supportMessage.style.display = 'none';

if (!name || !email || !message) {
  supportMessage.textContent = "Пожалуйста, заполните все поля.";
  supportMessage.classList.add('error');
  supportMessage.style.display = 'block'; 
  return;
}

try {
  
  const response = await fetch('/api/support', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  });

  if (response.ok) {
    supportMessage.textContent = "Сообщение отправлено!";
    supportMessage.classList.add('success');
    form.reset(); 
    setTimeout(() => {
      toggleSupportForm();
    }, 2000);
  } else {
    supportMessage.textContent = "Ошибка отправки. Попробуйте позже.";
    supportMessage.classList.add('error');
  }
} catch (error) {
  console.error('Ошибка:', error);
  supportMessage.textContent = "Произошла ошибка. Попробуйте снова.";
  supportMessage.classList.add('error');
} finally {
  supportMessage.style.display = 'block'; 
}
}