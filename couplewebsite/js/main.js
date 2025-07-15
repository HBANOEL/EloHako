/**
 * Hakan ❤️ Elif - Özel Aşk Websitesi
 * Tüm fonksiyonlar ve interaktif öğeler
 */

// ==================== GENEL FONKSİYONLAR ====================
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function setupScrollBehavior() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#') && 
                window.location.pathname.endsWith('index.html')) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function startPageLoadAnimation() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = 1;
    }, 100);
}

// ==================== KALP & XP SİSTEMİ ====================
window.spawnHeart = function() {
    const heart = document.createElement('div');
    heart.className = 'heart-spawn';
    
    const xPos = Math.random() * (window.innerWidth - 50);
    const yPos = (Math.random() * (window.innerHeight / 2)) + (window.innerHeight / 2);
    
    heart.style.left = `${xPos}px`;
    heart.style.top = `${yPos}px`;
    
    heart.addEventListener('click', function() {
        heart.style.animation = 'heartExplode 0.5s forwards';
        
        let xp = localStorage.getItem('loveXP') ? parseInt(localStorage.getItem('loveXP')) : 0;
        const xpNeeded = 100;
        xp = Math.min(xp + 10, xpNeeded);
        localStorage.setItem('loveXP', xp);
        
        updateXpDisplay(xp, xpNeeded);
        
        setTimeout(() => heart.remove(), 500);
    });
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
};

window.randomHeartSpawn = function() {
    const delay = Math.floor(Math.random() * 30000) + 30000; // 30-60 saniye
    setTimeout(() => {
        if (typeof spawnHeart === 'function') {
            spawnHeart();
            randomHeartSpawn();
        }
    }, delay);
};

function updateXpDisplay(xp, xpNeeded) {
    const xpCount = document.querySelector('.xp-count');
    const xpProgress = document.querySelector('.xp-progress');
    const treasureChest = document.querySelector('.treasure-chest');
    
    if (xpCount) xpCount.textContent = `${xp}/${xpNeeded} XP`;
    if (xpProgress) xpProgress.style.width = `${(xp/xpNeeded)*100}%`;
    if (treasureChest) treasureChest.style.display = xp >= xpNeeded ? 'block' : 'none';
}

window.openTreasureChest = function() {
    const chest = document.querySelector('.treasure-chest');
    if (!chest) return;

    // Animasyonu başlat
    chest.style.animation = 'chestOpen 0.5s';
    
    // Sürpriz mesaj içeriği
    const surprises = [
        {
            iltifat: "Tebrikler! Bugün Elif'e 'Gözlerin yıldızları kıskandırıyor' deyin ❤️",
            sarki: "Öneri: Ed Sheeran - Perfect"
        },
        {
            iltifat: "Sürpriz! Hakan'a 'Seninle her anım bir rüya gibi' mesajı atın 🌟",
            sarki: "Öneri: John Legend - All of Me"
        },
        {
            iltifat: "Ödülünüz: Birbirinize 'Sen benim en güzel şansımsın' deyin 💫",
            sarki: "Öneri: Elvis Presley - Can't Help Falling in Love"
        },
        {
            iltifat: "Kazandınız! Bugün 'Seni seviyorum' demeyi unutmayın 😘",
            sarki: "Öneri: Whitney Houston - I Will Always Love You"
        },
        {
            iltifat: "Özel Ödül: Birbirinize sarılıp 'İyi ki varsın' deyin 🤗",
            sarki: "Öneri: The Beatles - Something"
        }
    ];
    
    const surprise = surprises[Math.floor(Math.random() * surprises.length)];
    
    // Sürpriz mesajını oluştur
    const surpriseDiv = document.createElement('div');
    surpriseDiv.className = 'surprise-message';
    surpriseDiv.innerHTML = `
        <div class="surprise-content">
            <h3>🎉 Sürpriz Ödül! 🎉</h3>
            <div class="surprise-iltifat">
                <i class="fas fa-heart"></i>
                <p>${surprise.iltifat}</p>
            </div>
            <div class="surprise-sarki">
                <i class="fas fa-music"></i>
                <p>${surprise.sarki}</p>
            </div>
            <button class="close-surprise">Teşekkürler ❤️</button>
        </div>
    `;
    
    document.body.appendChild(surpriseDiv);
    
    // Kapat butonu işlevselliği
    surpriseDiv.querySelector('.close-surprise').addEventListener('click', function() {
        surpriseDiv.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => surpriseDiv.remove(), 500);
    });
    
    // XP'yi sıfırla
    localStorage.setItem('loveXP', 0);
    updateXpDisplay(0, 100);
    
    // Sandığı gizle
    setTimeout(() => {
        chest.style.display = 'none';
        chest.style.animation = '';
    }, 500);
};

window.initXPSystem = function() {
    let xp = localStorage.getItem('loveXP') ? parseInt(localStorage.getItem('loveXP')) : 0;
    const xpNeeded = 100;
    
    if (!document.querySelector('.xp-container')) {
        const xpContainer = document.createElement('div');
        xpContainer.className = 'xp-container';
        xpContainer.innerHTML = `
            <div class="xp-count">${xp}/${xpNeeded} XP</div>
            <div class="xp-bar">
                <div class="xp-progress" style="width: ${(xp/xpNeeded)*100}%"></div>
            </div>
            <div class="treasure-chest" title="Sandığı Aç" style="${xp >= xpNeeded ? 'display:block' : 'display:none'}"></div>
        `;
        document.body.appendChild(xpContainer);
    }

    document.querySelector('.treasure-chest')?.addEventListener('click', openTreasureChest);
    
    setTimeout(() => {
        spawnHeart();
        randomHeartSpawn();
    }, 5000);
};

// ==================== FİL ASİSTANI ====================
function initFilAsistan() {
    const filAsistan = document.getElementById('filAsistan');
    const filGorsel = document.getElementById('filGorsel');
    const filBalonu = document.getElementById('filBalonu');
    
    if (!filAsistan || !filGorsel || !filBalonu) return;

    const mesajlar = [
        "Seni seviyorum! ❤️",
        "Hadi bir öpücük! 😘",
        "Bugün ne yapsak? 🌸",
        "Filler gibi güçlü aşkımız! 🐘",
        "Benim güzel insanım... 💕",
        "Hakan & Elif sonsuza dek! ✨"
    ];

    filAsistan.addEventListener('click', function() {
        const hareketler = ['filSalla', 'filZipla'];
        const hareket = hareketler[Math.floor(Math.random() * hareketler.length)];
        
        filGorsel.classList.add(hareket);
        filBalonu.textContent = mesajlar[Math.floor(Math.random() * mesajlar.length)];
        filBalonu.classList.remove('balon-gizli');
        filBalonu.classList.add('balon-goster');
        
        setTimeout(() => {
            filBalonu.classList.remove('balon-goster');
            filBalonu.classList.add('balon-gizli');
        }, 3000);
        
        filGorsel.addEventListener('animationend', () => {
            filGorsel.classList.remove(hareket);
        }, { once: true });
    });

    setTimeout(() => {
        filBalonu.textContent = "Merhaba aşkımlar! 🐘❤️";
        filBalonu.classList.remove('balon-gizli');
        filBalonu.classList.add('balon-goster');
        
        setTimeout(() => {
            filBalonu.classList.remove('balon-goster');
            filBalonu.classList.add('balon-gizli');
        }, 3000);
    }, 2000);
}

// ==================== ANA SAYFA ÖZEL FONKSİYONLAR ====================
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentIndex = 0;
    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    };

    showSlide(0);
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);
}

function initCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    if (!countdownElement) return;

    const now = new Date();
    let targetYear = now.getFullYear();
    const targetDate = new Date(targetYear, 11, 10).getTime();
    
    if (now.getTime() > targetDate) {
        targetYear += 1;
    }
    
    const finalTarget = new Date(targetYear, 11, 10).getTime();
    
    const update = () => {
        const now = new Date().getTime();
        const diff = finalTarget - now;
        
        if (diff < 0) {
            countdownElement.innerHTML = `
                <div class="anniversary-message">
                    <h3>Mutlu Yıl Dönümümüz!</h3>
                    <p>Bugün bizim için çok özel bir gün ❤️</p>
                </div>
            `;
            return;
        }
        
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-box">
                <div class="countdown-value">${months}</div>
                <div class="countdown-label">Ay</div>
            </div>
            <div class="countdown-box">
                <div class="countdown-value">${days}</div>
                <div class="countdown-label">Gün</div>
            </div>
            <div class="countdown-box">
                <div class="countdown-value">${hours}</div>
                <div class="countdown-label">Saat</div>
            </div>
            <div class="countdown-box">
                <div class="countdown-value">${minutes}</div>
                <div class="countdown-label">Dakika</div>
            </div>
            <div class="countdown-box">
                <div class="countdown-value">${seconds}</div>
                <div class="countdown-label">Saniye</div>
            </div>
        `;
    };
    
    update();
    setInterval(update, 1000);
}

function initInteractiveButtons() {
    const loveBtn = document.getElementById('loveBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (loveBtn) {
        loveBtn.addEventListener('click', function() {
            const messages = [
                "Ben de seni çok seviyorum ❤️ Sonsuza kadar seninle olmak istiyorum...",
                "Sen benim her şeyimsin 💍 Hayatımın anlamısın...",
                "Seni sevmek hayatımdaki en güzel şey 🌟",
                "Kalp atışlarımın sebebi, nefes alışımın anlamısın 💖",
                "Seninle her an özel, seninle her şey güzel... 🌈",
                "Bir ömür boyu seninle olmak en büyük hayalim 💫",
                "Seni her gün daha çok seviyorum 🌹",
                "Aşkımız zamanla büyüyen bir çınar gibi 🌳"
            ];
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            const loveMessage = document.getElementById('loveMessage');
            
            if (loveMessage) {
                loveMessage.textContent = message;
                loveMessage.classList.add('show');
                setTimeout(() => loveMessage.classList.remove('show'), 5000);
            }
        });
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const phoneNumber = "905442949744";
            const message = "Merhaba, web sitesini gördüm ve seninle iletişime geçmek istedim.";
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }
    
    const secretInput = document.getElementById('secretInput');
    if (secretInput) {
        secretInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkSecret();
        });
    }
}

function checkSecret() {
    const secretInput = document.getElementById('secretInput');
    if (!secretInput) return;

    const secretMessage = document.createElement('div');
    secretMessage.className = 'secret-message';

    if (secretInput.value.toLowerCase() === 'mavikoltuklar') {
        secretMessage.innerHTML = `
            <h4>Sevgilim Elif,</h4>
            <p>Seni çok seviyorum Kıbrısta bir köyde çirkin bir mavi koltuğun üstünde başlayan beni çok çok mutlu biri yapan bu güzel ilişkimiz umarım hep böyle sevgi dolu geçer iyi ki varsın iyi ki doğdun. ❤️</p>
            <p>Seni sonsuza kadar seveceğim...</p>
            <p>- Hakan</p>
            <div class="secret-image">
                <img src="fotolar/ozel-foto.jpeg" alt="Özel Anımız" style="max-width: 100%; border-radius: 10px; margin-top: 15px;">
            </div>
        `;
    } else {
        secretMessage.textContent = 'Şifre yanlış! İpucu: Her şeyin başladığı yer.';
        secretMessage.style.color = '#ff6b6b';
    }

    const existingMessage = document.querySelector('.secret-message');
    if (existingMessage) existingMessage.remove();
    
    secretInput.insertAdjacentElement('afterend', secretMessage);
    secretInput.value = '';
}

// ==================== SAYFA YÜKLENME ====================
document.addEventListener('DOMContentLoaded', function() {
    // Tüm sayfalarda çalışacak fonksiyonlar
    updateCurrentYear();
    initXPSystem();
    initFilAsistan();
    
    // Sadece ana sayfada çalışacak fonksiyonlar
    if (document.querySelector('.slide')) {
        initSlideshow();
        initCountdown();
        initInteractiveButtons();
        setupScrollBehavior();
        startPageLoadAnimation();
    }
});

// Aşk testi sayfası için özel başlatıcı
if (document.querySelector('.love-test-section')) {
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof initXPSystem === 'function') initXPSystem();
        if (typeof initFilAsistan === 'function') initFilAsistan();
    });
}