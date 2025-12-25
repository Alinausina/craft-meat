// Компонент Header
class Header {
    constructor() {
        this.isMobileMenuOpen = false;
        this.isModalOpen = false;
        this.init();
    }
    
    init() {
        this.renderHeader();
        this.renderMobileMenu();
        this.renderModal();
        this.setupEventListeners();
        this.setupResizeListener();
    }
    
    renderHeader() {
        const headerHTML = `
            <header class="main-header">
                <div class="header-container">
                    <div class="logo-section">
                        <div class="logo-container">
                            <!-- МЕСТО ДЛЯ ВАШЕГО ЛОГОТИПА -->
                            <!-- Раскомментируйте строку ниже и укажите путь к вашему логотипу -->
                            <!-- <img src="your-logo.png" alt="Крафт Рёбра" class="logo-image"> -->
                            <div class="logo-placeholder">
                                <i class="fas fa-utensils"></i>
                            </div>
                        </div>
                        <div class="logo-text">КРАФТ РЁБРА</div>
                    </div>
                    
                    <nav class="main-nav">
                        <ul class="nav-links">
                            <li><a href="#" class="nav-link active">Главная</a></li>
                            <li><a href="#" class="nav-link">Меню</a></li>
                        </ul>
                    </nav>
                    
                    <button class="book-btn" id="bookTableBtn">Забронировать столик</button>
                    
                    <button class="burger-menu" id="burgerMenu" aria-label="Меню">
                        <span class="burger-line"></span>
                        <span class="burger-line"></span>
                        <span class="burger-line"></span>
                    </button>
                </div>
            </header>
        `;
        
        document.getElementById('header-container').innerHTML = headerHTML;
    }
    
    renderMobileMenu() {
        const mobileMenuHTML = `
            <div class="mobile-menu-overlay" id="mobileMenuOverlay">
                <div class="mobile-menu-content">
                    <div class="mobile-menu-header">
                        <div class="mobile-logo-container">
                            <div class="mobile-logo-placeholder">
                                <i class="fas fa-utensils"></i>
                            </div>
                            <div class="mobile-logo-text">КРАФТ РЁБРА</div>
                        </div>
                        <button class="close-mobile-menu" id="closeMobileMenu">&times;</button>
                    </div>
                    <nav class="mobile-nav">
                        <ul class="mobile-nav-links">
                            <li><a href="#" class="mobile-nav-link active">Главная</a></li>
                            <li><a href="#" class="mobile-nav-link">Меню</a></li>
                            <li>
                                <button class="mobile-book-btn" id="mobileBookBtn">Забронировать столик</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
        
        document.getElementById('mobile-menu-container').innerHTML = mobileMenuHTML;
    }
    
    renderModal() {
        // Установка даты (сегодня + 1 день)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-overlay" id="modalOverlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Бронирование стола</h2>
                        <button class="close-btn" id="closeModalBtn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="bookingForm">
                            <div class="form-group">
                                <label for="name">Имя *</label>
                                <input type="text" id="name" placeholder="Ваше имя" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="phone">Телефон *</label>
                                <div class="phone-input">
                                    <span>+7</span>
                                    <input type="tel" id="phone" placeholder="(999) 999-99-99" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="date">Дата *</label>
                                <input type="date" id="date" min="${minDate}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="time">Время *</label>
                                <select id="time" required>
                                    <option value="">---</option>
                                    <option value="18:00">18:00</option>
                                    <option value="18:30">18:30</option>
                                    <option value="19:00">19:00</option>
                                    <option value="19:30">19:30</option>
                                    <option value="20:00">20:00</option>
                                    <option value="20:30">20:30</option>
                                    <option value="21:00">21:00</option>
                                    <option value="21:30">21:30</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="guests">Количество гостей *</label>
                                <select id="guests" required>
                                    <option value="2">2 гостя</option>
                                    <option value="3">3 гостя</option>
                                    <option value="4">4 гостя</option>
                                    <option value="5">5 гостей</option>
                                    <option value="6">6 гостей</option>
                                    <option value="7">7 гостей</option>
                                    <option value="8">8 гостей</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="comment">Комментарий</label>
                                <textarea id="comment" rows="3" placeholder="Особые пожелания..."></textarea>
                            </div>
                            
                            <div class="form-actions">
                                <button type="submit" class="submit-btn">Забронировать</button>
                                <button type="button" class="cancel-btn" id="cancelBookingBtn">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').innerHTML = modalHTML;
    }
    
    setupEventListeners() {
        // Бургер-меню
        document.addEventListener('click', (e) => {
            if (e.target.closest('#burgerMenu')) {
                this.openMobileMenu();
            }
            
            if (e.target.closest('#closeMobileMenu') || 
                (e.target.closest('#mobileMenuOverlay') && !e.target.closest('.mobile-menu-content'))) {
                this.closeMobileMenu();
            }
        });
        
        // Кнопки бронирования
        document.addEventListener('click', (e) => {
            if (e.target.closest('#bookTableBtn') || e.target.closest('#mobileBookBtn')) {
                this.openModal();
                this.closeMobileMenu();
            }
        });
        
        // Модальное окно
        document.addEventListener('click', (e) => {
            if (e.target.closest('#closeModalBtn') || 
                e.target.closest('#cancelBookingBtn') ||
                (e.target.closest('#modalOverlay') && !e.target.closest('.modal-content'))) {
                this.closeModal();
            }
        });
        
        // Форма бронирования
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Маска для телефона
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    value = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                    e.target.value = !value[2] ? value[1] : '(' + value[1] + ') ' + value[2] + 
                                    (value[3] ? '-' + value[3] : '') + (value[4] ? '-' + value[4] : '');
                }
            });
        }
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
                if (this.isModalOpen) {
                    this.closeModal();
                }
            }
        });
    }
    
    setupResizeListener() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    openMobileMenu() {
        document.getElementById('mobileMenuOverlay').classList.add('active');
        document.getElementById('burgerMenu').classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isMobileMenuOpen = true;
    }
    
    closeMobileMenu() {
        document.getElementById('mobileMenuOverlay').classList.remove('active');
        document.getElementById('burgerMenu').classList.remove('active');
        document.body.style.overflow = 'auto';
        this.isMobileMenuOpen = false;
    }
    
    openModal() {
        document.getElementById('modalOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isModalOpen = true;
    }
    
    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
        document.body.style.overflow = 'auto';
        this.isModalOpen = false;
        
        // Сброс формы
        const form = document.getElementById('bookingForm');
        if (form) {
            form.reset();
        }
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Сбор данных
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            comment: document.getElementById('comment').value
        };
        
        console.log('Данные бронирования:', formData);
        
        // Сообщение об успехе
        alert(`Спасибо, ${formData.name}! Ваш столик на ${formData.date} в ${formData.time} для ${formData.guests} гостей забронирован. Мы свяжемся с вами для подтверждения.`);
        
        // Закрытие модального окна
        this.closeModal();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Header();
    
    // Добавляем инструкцию по добавлению логотипа
    const instructions = document.createElement('div');
    instructions.className = 'demo-instructions';
    instructions.innerHTML = `
        <h3>Как добавить свой логотип:</h3>
        <ol>
            <li>Откройте файл <strong>components/header.js</strong></li>
            <li>В функции renderHeader() найдите блок с логотипом</li>
            <li>Замените div с классом logo-placeholder на:<br>
                <code>&lt;img src="путь/к/вашему/логотипу.png" alt="Крафт Рёбра" class="logo-image"&gt;</code>
            </li>
            <li>Повторите то же самое в функции renderMobileMenu()</li>
        </ol>
    `;
    
    document.querySelector('.main-content').appendChild(instructions);
});