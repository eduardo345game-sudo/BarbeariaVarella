// Troque aqui pelo WhatsApp oficial da barbearia, com DDD e sem símbolos.
const WHATSAPP_BARBEARIA = '5521999999999';
const INSTAGRAM_BARBEARIA = 'barbeariadovarella';

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
  telefoneInput.addEventListener('input', () => {
    telefoneInput.value = telefoneInput.value.replace(/\D/g, '').slice(0, 11);
  });
  telefoneInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const texto = (e.clipboardData || window.clipboardData).getData('text');
    telefoneInput.value = texto.replace(/\D/g, '').slice(0, 11);
  });
}

const form = document.getElementById('bookingForm');
const wizardSteps = Array.from(document.querySelectorAll('.wizard-step'));
const stepDots = Array.from(document.querySelectorAll('.step-dot'));
const progressFill = document.getElementById('progressFill');
const prevStepBtn = document.getElementById('prevStep');
const nextStepBtn = document.getElementById('nextStep');
const wizardActions = document.querySelector('.wizard-actions');
const finalSummary = document.getElementById('finalSummary');
let currentStep = 0;

function setMinDate() {
  const dataInput = document.getElementById('data');
  if (!dataInput) return;
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  dataInput.min = `${ano}-${mes}-${dia}`;
}
setMinDate();

function formatDateBR(value) {
  if (!value) return '-';
  const [ano, mes, dia] = value.split('-');
  return `${dia}/${mes}/${ano}`;
}

function updateFinalSummary() {
  if (!finalSummary) return;
  const nome = document.getElementById('nome')?.value.trim() || '-';
  const tipo = document.getElementById('tipo')?.value || '-';
  const servico = document.getElementById('servico')?.value || '-';
  const data = formatDateBR(document.getElementById('data')?.value);
  const hora = document.getElementById('hora')?.value || '-';
  finalSummary.innerHTML = `
    <div><span>Cliente</span><strong>${nome}</strong></div>
    <div><span>Serviço</span><strong>${servico} • ${tipo}</strong></div>
    <div><span>Data e horário</span><strong>${data} às ${hora}</strong></div>
  `;
}

function showStep(index) {
  currentStep = Math.max(0, Math.min(index, wizardSteps.length - 1));
  wizardSteps.forEach((step, i) => step.classList.toggle('active', i === currentStep));
  stepDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentStep);
    dot.classList.toggle('done', i < currentStep);
  });
  if (progressFill) progressFill.style.width = `${(currentStep / (wizardSteps.length - 1)) * 100}%`;
  if (wizardActions) {
    wizardActions.classList.toggle('first', currentStep === 0);
    wizardActions.classList.toggle('final', currentStep === wizardSteps.length - 1);
  }
  updateFinalSummary();
}

const customAlert = document.getElementById('customAlert');
const alertTitle = document.getElementById('alertTitle');
const alertMessage = document.getElementById('alertMessage');
const closeAlert = document.getElementById('closeAlert');
let alertTimer;

function showCustomAlert(title, message, field) {
  clearTimeout(alertTimer);
  if (alertTitle) alertTitle.textContent = title;
  if (alertMessage) alertMessage.textContent = message;
  if (customAlert) customAlert.classList.add('show');

  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
  if (field) {
    field.classList.add('field-error');
    field.focus({ preventScroll: true });
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  alertTimer = setTimeout(() => {
    if (customAlert) customAlert.classList.remove('show');
  }, 4300);
}

if (closeAlert) {
  closeAlert.addEventListener('click', () => {
    if (customAlert) customAlert.classList.remove('show');
  });
}

function getFieldName(field) {
  const label = field.closest('label');
  if (!label) return 'campo obrigatório';
  return (label.childNodes[0]?.textContent || 'campo obrigatório').trim();
}

function validateCurrentStep() {
  const fields = Array.from(wizardSteps[currentStep].querySelectorAll('input, select, textarea'));
  for (const field of fields) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      showCustomAlert('Falta uma informação', `Preencha o campo: ${getFieldName(field)}.`, field);
      return false;
    }
  }

  const telefoneField = document.getElementById('telefone');
  const telefone = telefoneField?.value.replace(/\D/g, '') || '';
  if (currentStep === 0 && telefone.length < 10) {
    showCustomAlert('WhatsApp inválido', 'Digite somente números com DDD. Ex: 21999999999.', telefoneField);
    return false;
  }

  return true;
}

if (nextStepBtn) {
  nextStepBtn.addEventListener('click', () => {
    if (!validateCurrentStep()) return;
    showStep(currentStep + 1);
  });
}

if (prevStepBtn) {
  prevStepBtn.addEventListener('click', () => showStep(currentStep - 1));
}

stepDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const target = Number(dot.dataset.step);
    if (target <= currentStep) showStep(target);
  });
});

if (form) {
  showStep(0);
  form.addEventListener('input', (e) => {
    updateFinalSummary();
    if (e.target) e.target.classList.remove('field-error');
  });
  form.addEventListener('change', (e) => {
    updateFinalSummary();
    if (e.target) e.target.classList.remove('field-error');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.replace(/\D/g, '').trim();
    const tipo = document.getElementById('tipo').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const obs = document.getElementById('obs').value.trim();

    if (telefone.length < 10) {
      showStep(0);
      showCustomAlert('WhatsApp inválido', 'Digite somente números com DDD. Ex: 21999999999.', document.getElementById('telefone'));
      return;
    }

    const telefoneFormatado = telefone.length === 11
      ? `(${telefone.slice(0,2)}) ${telefone.slice(2,7)}-${telefone.slice(7)}`
      : `(${telefone.slice(0,2)}) ${telefone.slice(2,6)}-${telefone.slice(6)}`;

    const mensagem = `Olá! Quero agendar um horário na Barbearia do Varella.%0A%0A` +
      `Nome: ${nome}%0A` +
      `WhatsApp: ${telefoneFormatado}%0A` +
      `Tipo: ${tipo}%0A` +
      `Serviço: ${servico}%0A` +
      `Data: ${formatDateBR(data)}%0A` +
      `Horário: ${hora}%0A` +
      `Aviso: horários em feriados e finais de semana podem ser afetados. Aguardando confirmação da barbearia.%0A` +
      `Observação: ${obs || 'Nenhuma'}`;

    window.open(`https://wa.me/${WHATSAPP_BARBEARIA}?text=${mensagem}`, '_blank');
  });
}
