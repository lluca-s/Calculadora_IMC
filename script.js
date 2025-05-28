// Funcionalidade de troca de tema (claro/escuro)
const themeToggle = document.getElementById('themeToggle');

// Verificar preferência salva ou usar preferência do sistema
let currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Aplicar tema inicial
document.documentElement.setAttribute('data-theme', currentTheme);

// Alternar entre temas ao clicar no botão
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Adicionar animação ao trocar tema
    document.querySelector('.card').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.card').style.animation = 'pulse 0.6s ease-in-out';
    }, 10);
});

// Funcionalidade da calculadora de IMC
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculateBtn');
const resultContainer = document.getElementById('resultContainer');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const bmiMessage = document.getElementById('bmiMessage');

// Adicionar efeito de foco nos inputs
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-5px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// Função para calcular o IMC
calculateBtn.addEventListener('click', () => {
    // Adicionar animação ao botão
    calculateBtn.style.animation = 'pulse 0.3s ease-in-out';
    setTimeout(() => {
        calculateBtn.style.animation = 'none';
    }, 300);
    
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100; // Converter cm para m
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        showError('Por favor, insira valores válidos para peso e altura.');
        return;
    }
    
    // Cálculo do IMC
    const bmi = weight / (height * height);
    
    // Exibir resultado
    bmiValue.textContent = bmi.toFixed(1);
    
    // Categorizar o IMC
    let category, message, categoryClass;
    
    if (bmi < 18.5) {
        category = 'Abaixo do Peso';
        message = 'Você está abaixo do peso ideal. Considere consultar um nutricionista para orientações.';
        categoryClass = 'underweight';
    } else if (bmi < 25) {
        category = 'Peso Normal';
        message = 'Parabéns! Seu peso está dentro da faixa considerada saudável.';
        categoryClass = 'normal';
    } else if (bmi < 30) {
        category = 'Sobrepeso';
        message = 'Você está com sobrepeso. Considere adotar hábitos mais saudáveis.';
        categoryClass = 'overweight';
    } else {
        category = 'Obesidade';
        message = 'Você está na faixa de obesidade. Recomendamos consultar um profissional de saúde.';
        categoryClass = 'obese';
    }
    
    bmiCategory.textContent = category;
    bmiCategory.className = 'result-category ' + categoryClass;
    bmiMessage.textContent = message;
    
    // Mostrar o resultado com animação
    resultContainer.classList.add('show');
    
    // Adicionar animação de destaque ao resultado
    bmiValue.style.animation = 'pulse 1s ease-in-out';
    setTimeout(() => {
        bmiValue.style.animation = 'none';
    }, 1000);
});

function showError(message) {
    // Mostrar mensagem de erro
    resultContainer.classList.add('show');
    bmiValue.textContent = '--';
    bmiCategory.textContent = 'Erro';
    bmiCategory.className = 'result-category obese';
    bmiMessage.textContent = message;
    
    // Tremer os inputs com erro
    const inputs = [weightInput, heightInput];
    inputs.forEach(input => {
        if (!input.value || parseFloat(input.value) <= 0) {
            input.style.animation = 'shake 0.4s ease-in-out';
            input.style.borderColor = 'var(--danger-color)';
            setTimeout(() => {
                input.style.animation = 'none';
            }, 400);
        }
    });
    
    // Resetar bordas quando o usuário começa a digitar
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = 'var(--border-color)';
        });
    });
}

// Adicionar evento para pressionar Enter
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateBtn.click();
    }
});

// Adicionar animações iniciais
window.addEventListener('load', () => {
    document.querySelector('.card').style.animation = 'fadeIn 0.8s ease-out';
});