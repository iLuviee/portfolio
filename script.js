// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-quad'
});

// --- STARFIELD BACKGROUND CANVAS ANIMATION ---
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const numStars = 150;
const stars = [];

// Create stars coordinates and sizes
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.2 + 0.05
    });
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background subtle color tint
    ctx.fillStyle = 'rgba(11, 7, 30, 1)';
    
    // Animate each particle
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.6})`; // Twinkle effect
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move star upward slightly to resemble space traveling
        star.y -= star.speed;
        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
        }
    });
    
    requestAnimationFrame(animateStars);
}

// Handle window resizing cleanly
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Start galaxy motion
animateStars();

// --- INTERACTIVE NAVIGATION & UI ---
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('bg-[#0b071e]/90', 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]', 'py-3');
        nav.classList.remove('py-4', 'bg-[#0b071e]/40');
    } else {
        nav.classList.add('py-4', 'bg-[#0b071e]/40');
        nav.classList.remove('bg-[#0b071e]/90', 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]', 'py-3');
    }
});

// --- MOBILE MENU INTERACTIVE FLOATING PANEL ---
// START FROM HERE
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    // Mengecek apakah menu sedang tertutup
    const isClosed = mobileMenu.classList.contains('pointer-events-none');
    
    if (isClosed) {
        // Buka menu dengan efek pop-up estetik
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        mobileMenu.classList.add('opacity-100', 'scale-100');
        
        // Animasi Ikon
        menuIcon.classList.remove('fa-bars-staggered');
        menuIcon.classList.add('fa-xmark');
        menuIcon.style.transform = 'rotate(90deg)';
    } else {
        // Tutup menu
        mobileMenu.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        mobileMenu.classList.remove('opacity-100', 'scale-100');
        
        // Kembalikan Ikon
        menuIcon.classList.add('fa-bars-staggered');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.style.transform = 'rotate(0deg)';
    }
}

// Event klik tombol hamburger
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah event bubble agar tidak langsung tertutup otomatis
    toggleMenu();
});

// Tutup otomatis jika link diklik
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('pointer-events-none')) {
            toggleMenu();
        }
    });
});

// Fitur Pintar: Klik di luar menu mana saja untuk menutup panel secara otomatis
document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('pointer-events-none') && !mobileMenu.contains(e.target) && e.target !== menuBtn) {
        toggleMenu();
    }
});
// END HERE

// --- AUTOMATIC SNAKE LINE TIMELINE ANIMATION ---
// START HERE
// --- AUTOMATIC SNAKE LINE TIMELINE ANIMATION ---
document.addEventListener("DOMContentLoaded", () => {
    const educationSection = document.getElementById("education");
    const timelineBody = document.getElementById("timeline-body");
    
    // 1. ANIMASI UTAMA SAAT SCROLL (Hanya Berjalan Sekali Saat Terbuka Pertama Kali)
    if (educationSection && timelineBody) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Langkah A: Garis menyatu mulai memanjang turun dari atas
                    timelineBody.classList.add("line-grow");
                    
                    // Langkah B: Poin-poin sekolah bermunculan urut kebawah (sequenced)
                    const eduItems = ["edu-ta", "edu-tk", "edu-sd", "edu-smp", "edu-sma"];
                    const baseDelay = 300; // Jeda antar poin (milidetik)

                    eduItems.forEach((id, index) => {
                        setTimeout(() => {
                            const element = document.getElementById(id);
                            if (element) element.classList.add("reveal-active");
                        }, index * baseDelay + 150); // Jeda awal tunggu garis meluncur
                    });

                    // Matikan observer setelah dijalankan agar tidak re-animasi saat di-scroll ulang
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 }); // Berjalan ketika 15% section masuk layar

        observer.observe(educationSection);
    }

    // 2. LOGIKA INTERAKTIF DROPDOWN WITH REPLAY ANIMATION
    const dropdownHeader = document.getElementById("edu-dropdown-header");
    const dropdownContent = document.getElementById("edu-dropdown-content");
    const arrowIcon = document.getElementById("edu-arrow-icon");

    // Catatan: Baris duplikat 'const timelineBody' di sini sudah dihapus agar tidak memicu error global

    if (dropdownHeader && dropdownContent && arrowIcon && timelineBody) {
        dropdownHeader.addEventListener("click", () => {
            // Pengecekan status menggunakan kondisi opacity agar lebih stabil di browser
            const isCurrentlyOpen = dropdownContent.style.opacity !== "0";

            if (isCurrentlyOpen) {
                // A. PROSES MENUTUP DROPDOWN
                dropdownContent.style.maxHeight = "0px";
                dropdownContent.style.opacity = "0";
                arrowIcon.classList.remove("rotate-180");

                // Tunggu melipat selesai (500ms), baru bersihkan class animasi agar kembali kosong
                setTimeout(() => {
                    timelineBody.classList.remove("line-grow");
                    const eduItems = ["edu-ta", "edu-tk", "edu-sd", "edu-smp", "edu-sma"];
                    eduItems.forEach(id => {
                        const element = document.getElementById(id);
                        if (element) element.classList.remove("reveal-active");
                    });
                }, 500);

            } else {
                // B. PROSES MEMBUKA DROPDOWN (ANIMASI DIULANG)
                dropdownContent.style.maxHeight = "2000px";
                dropdownContent.style.opacity = "1";
                arrowIcon.classList.add("rotate-180");

                // Berikan jeda 200ms agar panel terbuka dulu, baru garis dan poin meluncur runtut
                setTimeout(() => {
                    timelineBody.classList.add("line-grow");
                    
                    const eduItems = ["edu-ta", "edu-tk", "edu-sd", "edu-smp", "edu-sma"];
                    const baseDelay = 300; 

                    eduItems.forEach((id, index) => {
                        setTimeout(() => {
                            const element = document.getElementById(id);
                            if (element) element.classList.add("reveal-active");
                        }, index * baseDelay + 150);
                    });
                }, 200);
            }
        });
    }
});
// END HERE



// --- AUTOMATIC GALLERY CAROUSEL SLIDER ---
// START HERE
document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery-container");
    const counterDisplay = document.getElementById("gallery-counter");
    const prevBtn = document.getElementById("prev-gallery");
    const nextBtn = document.getElementById("next-gallery");
    
    if (!galleryContainer) return;

    // KETENTUAN: Masukkan jumlah total foto kamu di folder lokal
    const totalPhotos = 3; 
    const folderPath = "./source/Gallery/"; 
    let currentIndex = 0; // Mulai dari foto pertama (index 0)

    // 1. Suntikkan semua foto ke dalam satu container tunggal
    for (let i = 1; i <= totalPhotos; i++) {
        const img = document.createElement("img");
        img.src = `${folderPath}${i}.jpg`; // Format panggil: 1.jpg, 2.jpg, dst.
        img.alt = `Cosmic Memory ${i}`;
        img.className = "single-slide-img";
        
        // Foto pertama (index 0 / i=1) langsung jadikan aktif secara default
        if (i === 1) img.classList.add("active");

        img.onerror = function() {
            this.style.display = 'none'; 
        };

        galleryContainer.appendChild(img);
    }

    // Ambil daftar node gambar yang berhasil di-render
    const slides = galleryContainer.getElementsByClassName("single-slide-img");

    // 2. Fungsi Utama untuk Memperbarui Tampilan Slide
    function updateGallery(newIndex) {
        // Hapus class active dari foto yang sedang tayang saat ini
        slides[currentIndex].classList.remove("active");
        
        // Set indeks baru ke variabel utama
        currentIndex = newIndex;
        
        // Berikan class active ke foto yang baru terpilih
        slides[currentIndex].classList.add("active");
        
        // Update teks indikator angka (misal: 2 / 6)
        if (counterDisplay) {
            counterDisplay.innerText = `${currentIndex + 1} / ${totalPhotos}`;
        }
    }

    // 3. Logika Klik Tombol NAVIGASI DENGAN LOOPING ABADI
    if (nextBtn && prevBtn) {
        
        // Tombol SEBELUMNYA (Kiri)
        prevBtn.addEventListener("click", () => {
            // Jika berada di foto pertama (0), loop putar balik ke foto terakhir (total - 1)
            const targetIndex = (currentIndex === 0) ? (totalPhotos - 1) : (currentIndex - 1);
            updateGallery(targetIndex);
        });

        // Tombol SELANJUTNYA (Kanan)
        nextBtn.addEventListener("click", () => {
            // Jika berada di foto terakhir, loop putar balik kembali ke foto pertama (0)
            const targetIndex = (currentIndex === totalPhotos - 1) ? 0 : (currentIndex + 1);
            updateGallery(targetIndex);
        });
    }

    // Inisialisasi teks counter pertama kali saat web dimuat
    if (counterDisplay && totalPhotos > 0) {
        counterDisplay.innerText = `1 / ${totalPhotos}`;
    }
});
// END HERE

// cursor start here
const cursor = document.querySelector('.custom-cursor');
const tail = document.querySelector('.cursor-tail');

window.addEventListener('mousemove', (e) => {
  // Pindahkan posisi kursor sesuai koordinat mouse
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  tail.style.left = e.clientX + 'px';
  tail.style.top = e.clientY + 'px';
});

// Efek interaktif saat mouse menyentuh link atau tombol (hover)
const hoverElements = document.querySelectorAll('a, button, .clickable');
hoverElements.forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    tail.classList.add('hover');
  });
  elem.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    tail.classList.remove('hover');
  });
});
//end here
