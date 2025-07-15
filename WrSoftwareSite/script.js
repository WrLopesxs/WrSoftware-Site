document.addEventListener('DOMContentLoaded', function() {
  // ===== Menu Mobile =====
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuToggle.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // ===== Scroll Suave =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Header Fixo com Efeito Scroll =====
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===== Botão "Voltar ao Topo" =====
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== Animação ao Scroll =====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .benefit-item, .pricing-card, .info-item');
    
    if (elements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(element => observer.observe(element));
    }
  };

  // Inicia a animação
  animateOnScroll();

  // ===== Validação do Formulário WhatsApp =====
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('userName')?.value.trim();
      let phone = document.getElementById('userPhone')?.value.replace(/\D/g, '');
      const message = document.getElementById('userMessage')?.value.trim();

      // Validação
      if (!name || name.length < 3) {
        alert("Por favor, insira um nome válido (mínimo 3 caracteres)");
        return;
      }

      if (!phone || !/^(\d{10,13})$/.test(phone)) {
        alert("Número inválido! Digite um WhatsApp com DDD (ex: 11912345678)");
        return;
      }

      if (!message || message.length < 5) {
        alert("Sua mensagem precisa ter pelo menos 5 caracteres");
        return;
      }

      // Formata o telefone
      if (!phone.startsWith('55')) {
        phone = '55' + phone;
      }

      // Cria mensagem formatada
      const formattedMessage = `*Nova mensagem do site WrSoftware*%0A%0A` +
                             `*Nome:* ${name}%0A` +
                             `*Telefone:* ${phone}%0A` +
                             `*Mensagem:* ${message}`;

      // Abre o WhatsApp
      window.open(`https://wa.me/${phone}?text=${formattedMessage}`, '_blank');
      this.reset();
    });
  }

  // ===== Dark Mode Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Verifica preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Aplica o tema salvo
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateButton(savedTheme);

    // Alterna ao clicar
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateButton(newTheme);
    });

    // Atualiza ícone e texto do botão
    function updateButton(theme) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Claro';
      } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Escuro';
      }
    }
  }
});
// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentNode;
    item.classList.toggle('active');
    
    // Close other open items
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
  });
});

// FAQ Search
document.getElementById('faqSearch').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question span').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
    
    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});
// ROI Calculator
document.addEventListener('DOMContentLoaded', function() {
  // Update range value displays
  document.getElementById('dailyOrders').addEventListener('input', function() {
    document.getElementById('dailyOrdersValue').textContent = this.value;
  });

  document.getElementById('employees').addEventListener('input', function() {
    document.getElementById('employeesValue').textContent = this.value;
  });

  // Calculate ROI
  document.getElementById('calculateRoi').addEventListener('click', function() {
    const dailyOrders = parseInt(document.getElementById('dailyOrders').value);
    const averageTicket = parseInt(document.getElementById('averageTicket').value);
    const employees = parseInt(document.getElementById('employees').value);
    
    // Calculations (simplified example)
    const monthlyRevenue = dailyOrders * averageTicket * 30;
    const efficiencyGain = 15 + (employees * 2); // 15% base + 2% per employee
    const timeSaved = employees * 20; // 20h per employee per month
    const monthlySavings = monthlyRevenue * (efficiencyGain / 100) + (employees * 800); // R$800 per employee
    
    // Payback period (assuming system cost of R$1000)
    const systemCost = 1000;
    const paybackDays = Math.ceil(systemCost / (monthlySavings / 30));
    const roiMultiple = (monthlySavings * 12 / systemCost).toFixed(1);
    
    // Update UI
    document.getElementById('monthlySavings').textContent = `R$ ${Math.round(monthlySavings).toLocaleString('pt-BR')}`;
    document.getElementById('timeSaved').textContent = timeSaved;
    document.getElementById('efficiencyGain').textContent = efficiencyGain;
    document.getElementById('paybackPeriod').textContent = `${paybackDays} dias`;
    document.getElementById('roiMultiple').textContent = `R$${roiMultiple}`;
  });

  // Initial calculation
  document.getElementById('calculateRoi').click();
});
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  document.querySelector('.parallax-bg').style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// FAQ Category Filter
document.querySelectorAll('.faq-category').forEach(category => {
  category.addEventListener('click', () => {
    document.querySelector('.faq-category.active').classList.remove('active');
    category.classList.add('active');
    
    const selectedCategory = category.dataset.category;
    
    document.querySelectorAll('.faq-item').forEach(item => {
      if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== Funções Globais do Modal =====
function openImageModal(imageSrc, title) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  
  if (modal && modalImg && modalTitle) {
    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    
    // Fecha ao pressionar ESC
    document.addEventListener('keydown', function escListener(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escListener);
      }
    });
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Fecha ao clicar fora da imagem
window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('imageModal')) {
    closeModal();
  }
});