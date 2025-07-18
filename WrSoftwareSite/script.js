document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('fade-out');
      }, 1000);
    });
  }

  // Menu Mobile
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      mobileMenuToggle.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.main-nav a').forEach(function(link) {
      link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Scroll Suave
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight || 80;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header Fixo com Efeito Scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Botão "Voltar ao Topo"
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Animação ao Scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .info-item, .section-header');
    
    if (elements.length > 0) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(function(element) {
        observer.observe(element);
      });
    }
  };

  // Inicia a animação
  animateOnScroll();

  // Validação do Formulário WhatsApp
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('userName').value.trim();
      let phone = document.getElementById('userPhone').value.replace(/\D/g, '');
      const message = document.getElementById('userMessage').value.trim();

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

  // Dark Mode Toggle
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
    themeToggle.addEventListener('click', function() {
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

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
      const item = this.parentNode;
      item.classList.toggle('active');
      
      // Close other open items
      document.querySelectorAll('.faq-item').forEach(function(otherItem) {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    });
  });

  // FAQ Search
  const faqSearch = document.getElementById('faqSearch');
  if (faqSearch) {
    faqSearch.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      
      document.querySelectorAll('.faq-item').forEach(function(item) {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // FAQ Category Filter
  document.querySelectorAll('.faq-category').forEach(function(category) {
    category.addEventListener('click', function() {
      document.querySelector('.faq-category.active').classList.remove('active');
      this.classList.add('active');
      
      const selectedCategory = this.dataset.category;
      
      document.querySelectorAll('.faq-item').forEach(function(item) {
        if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ROI Calculator
  const calculateROI = function() {
    const dailyOrders = parseInt(document.getElementById('dailyOrders').value);
    const averageTicket = parseInt(document.getElementById('averageTicket').value);
    const employees = parseInt(document.getElementById('employees').value);
    
    // Cálculos (exemplo simplificado)
    const monthlyRevenue = dailyOrders * averageTicket * 30;
    const efficiencyGain = 15 + (employees * 2); // 15% base + 2% por funcionário
    const timeSaved = employees * 20; // 20h por funcionário por mês
    const monthlySavings = monthlyRevenue * (efficiencyGain / 100) + (employees * 800); // R$800 por funcionário
    
    // Período de retorno (considerando custo do sistema de R$1000)
    const systemCost = 1000;
    const paybackDays = Math.ceil(systemCost / (monthlySavings / 30));
    const roiMultiple = (monthlySavings * 12 / systemCost).toFixed(1);
    
    // Atualiza UI
    document.getElementById('monthlySavings').textContent = `R$ ${Math.round(monthlySavings).toLocaleString('pt-BR')}`;
    document.getElementById('timeSaved').textContent = timeSaved;
    document.getElementById('efficiencyGain').textContent = efficiencyGain;
    document.getElementById('paybackPeriod').textContent = `${paybackDays} dias`;
    document.getElementById('roiMultiple').textContent = `R$${roiMultiple}`;
  };

  // Atualiza valores dos ranges
  document.getElementById('dailyOrders').addEventListener('input', function() {
    document.getElementById('dailyOrdersValue').textContent = this.value;
    calculateROI();
  });

  document.getElementById('averageTicket').addEventListener('input', function() {
    calculateROI();
  });

  document.getElementById('employees').addEventListener('input', function() {
    document.getElementById('employeesValue').textContent = this.value;
    calculateROI();
  });

  // Cálculo inicial
  calculateROI();

  // Inicializa Particles.js
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#FF6B6B" },
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#FF6B6B", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
      },
      "retina_detect": true
    });
  }
});

// Funções Globais do Modal
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
window.addEventListener('click', function(e) {
  if (e.target === document.getElementById('imageModal')) {
    closeModal();
  }
  // Animação de Scroll
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-scroll');
  
  // Configura o Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--animation-order', entry.target.dataset.animationOrder || 0);
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observa cada elemento
  animatedElements.forEach((element, index) => {
    element.dataset.animationOrder = index % 5; // Cicla de 0 a 4 para os delays
    observer.observe(element);
  });
}

// Chame esta função no DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  setupScrollAnimations();
  // ... (seus outros códigos existentes)
});
});