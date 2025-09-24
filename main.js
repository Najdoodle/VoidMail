// VoidMail Application
class VoidMail {
    constructor() {
        this.currentTheme = 'dark';
        this.currentPage = 'landing-page';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDatePicker();
        this.loadTheme();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Navigation
        const proceedBtn = document.getElementById('proceed-btn');
        const backBtn = document.getElementById('back-btn');
        proceedBtn.addEventListener('click', () => this.navigateToApp());
        backBtn.addEventListener('click', () => this.navigateToLanding());

        // Form submission
        const sendBtn = document.getElementById('send-btn');
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Form validation
        const messageText = document.getElementById('message-text');
        const deliveryDate = document.getElementById('delivery-date');
        
        messageText.addEventListener('input', () => this.validateForm());
        deliveryDate.addEventListener('change', () => this.validateForm());
    }

    setupDatePicker() {
        const dateInput = document.getElementById('delivery-date');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Set minimum date to tomorrow
        dateInput.min = tomorrow.toISOString().split('T')[0];
        
        // Set default date to one week from today
        const defaultDate = new Date(today);
        defaultDate.setDate(defaultDate.getDate() + 7);
        dateInput.value = defaultDate.toISOString().split('T')[0];
    }

    setupAnimations() {
        // Add entrance animations to elements
        const animatedElements = document.querySelectorAll('.landing-content, .message-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('voidmail-theme', this.currentTheme);
        
        // Add a subtle animation to the theme toggle
        const toggle = document.getElementById('theme-toggle');
        toggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toggle.style.transform = 'scale(1)';
        }, 150);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('voidmail-theme');
        if (savedTheme && savedTheme !== 'dark') {
            this.currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', this.currentTheme);
        }
    }

    navigateToApp() {
        this.switchPage('landing-page', 'main-app');
        this.currentPage = 'main-app';
        
        // Focus on the message textarea for better UX
        setTimeout(() => {
            document.getElementById('message-text').focus();
        }, 300);
    }

    navigateToLanding() {
        this.switchPage('main-app', 'landing-page');
        this.currentPage = 'landing-page';
        this.hideStatusMessage();
    }

    switchPage(fromPage, toPage) {
        const currentPage = document.getElementById(fromPage);
        const nextPage = document.getElementById(toPage);
        
        // Fade out current page
        currentPage.classList.remove('active');
        
        // Fade in next page after a short delay
        setTimeout(() => {
            nextPage.classList.add('active');
        }, 250);
    }

    validateForm() {
        const messageText = document.getElementById('message-text').value.trim();
        const deliveryDate = document.getElementById('delivery-date').value;
        const sendBtn = document.getElementById('send-btn');
        
        const isValid = messageText.length > 0 && deliveryDate;
        
        if (isValid) {
            sendBtn.style.opacity = '1';
            sendBtn.style.pointerEvents = 'auto';
            sendBtn.classList.remove('disabled');
        } else {
            sendBtn.style.opacity = '0.6';
            sendBtn.style.pointerEvents = 'none';
            sendBtn.classList.add('disabled');
        }
    }

    async sendMessage() {
        const messageText = document.getElementById('message-text').value.trim();
        const deliveryDate = document.getElementById('delivery-date').value;
        
        if (!messageText || !deliveryDate) {
            this.showStatusMessage('Please fill in all fields before sending to the void.', 'error');
            return;
        }

        // Simulate sending with loading state
        const sendBtn = document.getElementById('send-btn');
        const originalText = sendBtn.querySelector('span').textContent;
        
        sendBtn.querySelector('span').textContent = 'Sending to the void...';
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.6';

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

        // Random success/failure (70% success rate)
        const isSuccess = Math.random() > 0.3;
        
        if (isSuccess) {
            const successMessages = [
                'Your message has been sent to the void ✨',
                'The void has accepted your message 🌌',
                'Your thoughts now drift through the cosmos 🌟',
                'The universe has received your message ⭐',
                'Your words echo through infinity 🌙'
            ];
            const message = successMessages[Math.floor(Math.random() * successMessages.length)];
            this.showStatusMessage(message, 'success');
            this.clearForm();
        } else {
            const failureMessages = [
                'The void rejected your message. Try again 🌑',
                'The cosmic winds scattered your words. Please retry 💫',
                'The universe seems busy. Try sending again 🌌',
                'Your message was lost in the void. Please resend 🌟',
                'The void is currently unreachable. Try later 🌙'
            ];
            const message = failureMessages[Math.floor(Math.random() * failureMessages.length)];
            this.showStatusMessage(message, 'error');
        }

        // Reset button
        sendBtn.querySelector('span').textContent = originalText;
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
    }

    showStatusMessage(message, type) {
        const statusElement = document.getElementById('status-message');
        
        // Reset classes
        statusElement.className = 'status-message';
        statusElement.classList.add(type);
        statusElement.textContent = message;
        
        // Show with animation
        setTimeout(() => {
            statusElement.classList.remove('hidden');
            statusElement.classList.add('slide-up');
        }, 100);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.hideStatusMessage();
            }, 5000);
        }
    }

    hideStatusMessage() {
        const statusElement = document.getElementById('status-message');
        statusElement.classList.add('hidden');
        statusElement.classList.remove('slide-up');
    }

    clearForm() {
        document.getElementById('message-text').value = '';
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 7);
        document.getElementById('delivery-date').value = defaultDate.toISOString().split('T')[0];
        this.validateForm();
    }

    // Utility method for future API integration
    formatMessageData() {
        return {
            message: document.getElementById('message-text').value.trim(),
            deliveryDate: document.getElementById('delivery-date').value,
            timestamp: new Date().toISOString(),
            theme: this.currentTheme
        };
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoidMail();
});

// Add some ambient interaction effects
document.addEventListener('mousemove', (e) => {
    // Subtle cursor effects for dark theme
    if (document.documentElement.getAttribute('data-theme') !== 'light') {
        const cursor = document.querySelector('.cursor-glow');
        if (!cursor) {
            const glowElement = document.createElement('div');
            glowElement.className = 'cursor-glow';
            glowElement.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: radial-gradient(circle, var(--accent-glow), transparent);
                pointer-events: none;
                z-index: 9999;
                opacity: 0.3;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(glowElement);
        }
        
        const glow = document.querySelector('.cursor-glow');
        if (glow) {
            glow.style.left = (e.clientX - 10) + 'px';
            glow.style.top = (e.clientY - 10) + 'px';
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + T for theme toggle
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        document.getElementById('theme-toggle').click();
    }
    
    // Ctrl/Cmd + Enter to send message (when in main app)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const mainApp = document.getElementById('main-app');
        if (mainApp.classList.contains('active')) {
            e.preventDefault();
            document.getElementById('send-btn').click();
        }
    }
});