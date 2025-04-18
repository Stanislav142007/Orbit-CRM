function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('open');
  }

  const clients = {
    sid: {
      name: 'Иван Петрович Сидоров',
      phone: '(495) 80-90-90',
      email: 'svel@mail.ru',
      address: 'г. Москва<br>ул. Пушкина<br>д.30<br>119019',
      shipping: 'г. Москва<br>ул. Пушкина<br>д.30<br>119019'
    },
    kuz: {
      name: 'Елена Сергеевна Кузнецова',
      phone: '(812) 33-22-11',
      email: 'elena.kuz@mail.ru',
      address: 'г. Санкт-Петербург<br>ул. Ленина<br>д.15<br>190000',
      shipping: 'г. Санкт-Петербург<br>ул. Ленина<br>д.15<br>190000'
    },
    sok: {
      name: 'Дмитрий Александрович Соколов',
      phone: '(843) 44-55-66',
      email: 'd.sokolov@mail.ru',
      address: 'г. Казань<br>ул. Баумана<br>д.1<br>420111',
      shipping: 'г. Казань<br>ул. Баумана<br>д.1<br>420111'
    },
    smi: {
      name: 'Мария Васильевна Смирнова',
      phone: '(8552) 77-88-99',
      email: 'm.sm@mail.ru',
      address: 'г. Набережные Челны<br>ул. Камская<br>д.45<br>423800',
      shipping: 'г. Набережные Челны<br>ул. Камская<br>д.45<br>423800'
    }
  };

  function updateContact(key) {
    const client = clients[key];
    document.getElementById('contact-name').innerText = client.name;
    document.getElementById('contact-phone').innerText = client.phone;
    document.getElementById('contact-email').innerText = client.email;
    document.getElementById('contact-email').href = 'mailto:' + client.email;
    document.getElementById('contact-address').innerHTML = client.address;
    document.getElementById('contact-shipping').innerHTML = client.shipping;

    
    const rows = document.querySelectorAll('.client-table tbody tr');
    rows.forEach(row => row.classList.remove('active-row'));
    const clickedRow = Array.from(rows).find(row => row.textContent.includes(client.name));
    if (clickedRow) clickedRow.classList.add('active-row');
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