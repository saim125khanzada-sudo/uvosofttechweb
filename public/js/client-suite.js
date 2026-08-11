// Interactive Client Suite: Chatbot, Regional Selector & Quote Modal
document.addEventListener('DOMContentLoaded', () => {
  // Region Selector Dropdown Toggle
  const regionBtn = document.getElementById('regionBtn');
  const regionDropdown = document.getElementById('regionDropdown');

  if (regionBtn && regionDropdown) {
    regionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      regionDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      regionDropdown.classList.remove('show');
    });
  }

  // Chatbot Assistant Toggle
  const chatbotTrigger = document.getElementById('chatbotTrigger');
  const chatbotBox = document.getElementById('chatbotBox');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotSend = document.getElementById('chatbotSend');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');

  if (chatbotTrigger && chatbotBox) {
    chatbotTrigger.addEventListener('click', () => {
      chatbotBox.classList.toggle('open');
    });

    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotBox.classList.remove('open');
      });
    }

    const botKnowledge = [
      { keywords: ['erp', 'odoo', 'dynamics', '365'], response: 'We provide end-to-end ERP implementation, customization, and cloud migration for Odoo and Microsoft Dynamics 365. Would you like to schedule a free consultation?' },
      { keywords: ['cloud', 'aws', 'azure', 'devops'], response: 'Our Cloud Engineering team handles architecture, multi-cloud deployment, Kubernetes, security auditing, and continuous deployment.' },
      { keywords: ['store', 'laptop', 'hardware', 'buy'], response: 'Visit our Store tab to view enterprise-grade laptops and workstations with customizable RAM, SSD, and GPU options.' },
      { keywords: ['quote', 'price', 'cost'], response: 'You can use our Quick Quote Estimator modal or submit a contact form to get an instant tailored quotation for your organization!' },
      { keywords: ['security', 'cyber', 'pentest', 'mdm'], response: 'We specialize in Cybersecurity hardening, Mobile Device Management (MDM) deployment, SOC monitoring, and zero-trust infrastructure.' },
      { keywords: ['startup', 'cheap', 'save', 'open source'], response: 'We offer specialized Smart-Save Open Source stacks for startups to reduce SaaS licensing costs by up to 70%!' }
    ];

    function addMessage(text, isUser = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = isUser ? 'msg-user' : 'msg-bot';
      msgDiv.innerText = text;
      chatbotMessages.appendChild(msgDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function handleChatSend() {
      const text = chatbotInput.value.trim();
      if (!text) return;

      addMessage(text, true);
      chatbotInput.value = '';

      setTimeout(() => {
        const lower = text.toLowerCase();
        let matched = botKnowledge.find(item => item.keywords.some(kw => lower.includes(kw)));
        if (matched) {
          addMessage(matched.response);
        } else {
          addMessage("Thank you for reaching out! Our regional IT solutions expert will assist you shortly. You can also click 'Request Consultation' to get an immediate call.");
        }
      }, 600);
    }

    if (chatbotSend && chatbotInput) {
      chatbotSend.addEventListener('click', handleChatSend);
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
      });
    }
  }

  // Quote Modal Toggle
  const quoteModal = document.getElementById('quoteModal');
  const quoteTriggers = document.querySelectorAll('.trigger-quote-modal');
  const modalCloses = document.querySelectorAll('.close-modal');

  quoteTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteModal) quoteModal.classList.add('active');
    });
  });

  modalCloses.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (quoteModal) quoteModal.classList.remove('active');
    });
  });

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) quoteModal.classList.remove('active');
    });
  }
});
