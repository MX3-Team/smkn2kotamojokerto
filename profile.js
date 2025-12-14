// profile.js - Khusus untuk halaman profile/dashboard

// Fungsi untuk navigasi sidebar
function setupSidebarNavigation() {
    const sidebarButtons = document.querySelectorAll('.sidebar button');
    const contentSections = document.querySelectorAll('.content-section');

    function switchContent(targetId) {
        // Sembunyikan semua konten
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Tampilkan konten yang dipilih
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update button aktif
        sidebarButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-target') === targetId) {
                button.classList.add('active');
            }
        });
    }

    // Tambahkan event listener ke setiap button
    sidebarButtons.forEach(button => {
        // Skip logout button (akan ditangani terpisah)
        if (button.classList.contains('logout')) return;

        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            switchContent(targetId);
        });
    });
}

// Fungsi utama
document.addEventListener('DOMContentLoaded', function () {
    // Setup sidebar navigation
    setupSidebarNavigation();
    
    // Cek apakah user sudah login
    const user = dataStorage.getCurrentUser();
    
    if (!user) {
        // Redirect ke register page if no user
        alert('Silakan daftar terlebih dahulu!');
        window.location.href = 'ppdb.html';
        return;
    }

    // Display user info di halaman profile
    updateProfileDisplay(user);
    
    // Setup form pendaftaran
    setupPendaftaranForm();
    
    // Setup logout button
    setupLogoutButton();
    
    // Load pengumuman
    loadPengumuman();
    
    // Periksa status pendaftaran
    checkPendaftaranStatus();
});

// Fungsi untuk menampilkan data user di profile
function updateProfileDisplay(user) {
    // Update profile section
    document.getElementById('profileName').textContent = user.nama || '-';
    document.getElementById('profileEmail').textContent = user.email || '-';
    
    // Update akun section
    document.getElementById('akunEmail').textContent = user.email || '-';
    document.getElementById('akunTelepon').textContent = user.telepon || '-';
    document.getElementById('akunAlamat').textContent = user.alamat || '-';
    document.getElementById('akunSekolah').textContent = user.asalSekolah || '-';
    
    // Update beranda info
    const berandaInfo = document.getElementById('berandaInfo');
    if (berandaInfo) {
        berandaInfo.innerHTML = `
            <div class="info-item">
                <span class="info-label">Nama</span>
                <span class="info-value">${user.nama || '-'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${user.email || '-'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Nomor Telepon</span>
                <span class="info-value">${user.telepon || '-'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Asal Sekolah</span>
                <span class="info-value">${user.asalSekolah || '-'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Status Akun</span>
                <span class="info-value badge bg-success">Aktif</span>
            </div>
        `;
    }
}

// Setup form pendaftaran
function setupPendaftaranForm() {
    const jalurSelect = document.getElementById('jalur');
    const piagamField = document.getElementById('piagamField');
    
    if (jalurSelect && piagamField) {
        jalurSelect.addEventListener('change', function () {
            if (this.value === 'prestasi') {
                piagamField.classList.remove('d-none');
            } else {
                piagamField.classList.add('d-none');
            }
        });
    }
    
    const pendaftaranForm = document.getElementById('pendaftaranForm');
    if (pendaftaranForm) {
        // Isi form dengan data user jika ada
        const user = dataStorage.getCurrentUser();
        if (user) {
            pendaftaranForm.querySelector('[name="nama"]').value = user.nama || '';
            pendaftaranForm.querySelector('[name="email"]').value = user.email || '';
            pendaftaranForm.querySelector('[name="no_telp"]').value = user.telepon || '';
            pendaftaranForm.querySelector('[name="alamat"]').value = user.alamat || '';
            pendaftaranForm.querySelector('[name="asal_sekolah"]').value = user.asalSekolah || '';
        }
        
        pendaftaranForm.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (!this.checkValidity()) {
                this.classList.add('was-validated');
                return;
            }

            const formData = new FormData(this);
            const pendaftaranData = {};

            for (let [key, value] of formData.entries()) {
                pendaftaranData[key] = value;
            }

            // Save pendaftaran
            const saved = dataStorage.savePendaftaran(pendaftaranData);

            if (saved) {
                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById('pendaftaranSuccessModal'));
                successModal.show();

                // Update UI setelah 2 detik
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        });
    }
}

// Setup logout button
function setupLogoutButton() {
    const logoutBtn = document.querySelector('.logout');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            performLogout();
        });
    }
}

// Fungsi logout
function performLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Logout dan hapus data user yang sedang login
        dataStorage.logout();
        
        // Redirect ke halaman registrasi
        setTimeout(() => {
            window.location.href = 'ppdb.html';
        }, 500);
    }
}

// Load pengumuman
function loadPengumuman() {
    const pengumumanList = document.getElementById('pengumumanList');
    if (!pengumumanList) return;
    
    const pengumuman = dataStorage.getPengumuman();

    if (pengumuman.length === 0) {
        pengumumanList.innerHTML = `
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Belum ada pengumuman untuk saat ini.
            </div>
        `;
        return;
    }

    let html = '';
    pengumuman.forEach(item => {
        html += `
            <div class="card mb-3 ${item.important ? 'border-warning' : ''}">
                <div class="card-body">
                    ${item.important ? '<span class="badge bg-warning float-end">Penting</span>' : ''}
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.content}</p>
                    <div class="text-muted small">
                        <i class="bi bi-calendar me-1"></i> ${item.date}
                    </div>
                </div>
            </div>
        `;
    });

    pengumumanList.innerHTML = html;
}

// Periksa status pendaftaran
function checkPendaftaranStatus() {
    const user = dataStorage.getCurrentUser();
    if (!user) return;
    
    const pendaftaran = dataStorage.getUserPendaftaran();
    const pendaftaranStatus = document.getElementById('pendaftaranStatus');
    const statusText = document.getElementById('statusText');
    
    if (pendaftaran.length > 0 && pendaftaranStatus && statusText) {
        pendaftaranStatus.style.display = 'block';
        const lastPendaftaran = pendaftaran[pendaftaran.length - 1];
        statusText.innerHTML = `Anda sudah mengisi formulir pendaftaran. Status: <strong>${lastPendaftaran.status || 'Diproses'}</strong>`;
        
        // Update step progress di beranda
        updateStepProgress();
    }
}

// Update progress langkah pendaftaran
function updateStepProgress() {
    const step2 = document.getElementById('step2');
    if (step2) {
        step2.classList.add('completed');
    }
}