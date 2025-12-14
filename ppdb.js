// register.js - Khusus untuk halaman registrasi
document.addEventListener('DOMContentLoaded', function () {
    // Form validation and submission
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak sama!');
                return;
            }

            // Get form data
            const userData = {
                nama: document.getElementById('nama').value,
                email: document.getElementById('email').value,
                telepon: document.getElementById('telepon').value,
                password: password,
                tanggalLahir: document.getElementById('tanggalLahir').value,
                alamat: document.getElementById('alamat').value,
                asalSekolah: document.getElementById('asalSekolah').value,
                nisn: document.getElementById('nisn').value,
                namaOrtu: document.getElementById('namaOrtu').value,
                registeredAt: new Date().toISOString(),
                status: 'aktif'
            };

            // Save user to database
            const savedUser = dataStorage.saveUser(userData);
            
            // Set as current user
            dataStorage.setCurrentUser(savedUser);

            // Langsung redirect ke profile.html
            window.location.href = 'profile.html';
        });
    }
});