// storage.js - Untuk menyimpan dan mengambil data dari localStorage

class DataStorage {
    constructor() {
        this.storageKey = 'ppdb_data';
        this.currentUserKey = 'ppdb_current_user';
        this.initStorage();
    }

    // Di dalam class DataStorage di storage.js
    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.currentUserKey);
        }
    }

    initStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            // Initialize with empty data structure
            const initialData = {
                users: [],
                pendaftaran: [],
                pengumuman: []
            };
            localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // User methods
    saveUser(userData) {
        const data = this.getData();
        // Check if user already exists
        const existingUserIndex = data.users.findIndex(user => user.email === userData.email);

        if (existingUserIndex !== -1) {
            // Update existing user
            userData.id = data.users[existingUserIndex].id;
            userData.createdAt = data.users[existingUserIndex].createdAt;
            userData.updatedAt = new Date().toISOString();
            data.users[existingUserIndex] = userData;
        } else {
            // Add new user
            userData.id = Date.now();
            userData.createdAt = new Date().toISOString();
            data.users.push(userData);
        }

        this.saveData(data);
        return userData;
    }

    getUser(email) {
        const data = this.getData();
        return data.users.find(user => user.email === email);
    }

    getCurrentUser() {
        const userJson = localStorage.getItem(this.currentUserKey);
        return userJson ? JSON.parse(userJson) : null;
    }

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.currentUserKey);
        }
    }

    // Pendaftaran methods
    savePendaftaran(pendaftaranData) {
        const data = this.getData();
        const user = this.getCurrentUser();

        if (!user) {
            alert('Silakan login terlebih dahulu!');
            return null;
        }

        pendaftaranData.id = Date.now();
        pendaftaranData.userId = user.email;
        pendaftaranData.createdAt = new Date().toISOString();
        pendaftaranData.status = 'diproses';

        data.pendaftaran.push(pendaftaranData);
        this.saveData(data);

        // Update user data
        user.hasPendaftaran = true;
        this.setCurrentUser(user);

        return pendaftaranData;
    }

    getUserPendaftaran() {
        const user = this.getCurrentUser();
        if (!user) return [];

        const data = this.getData();
        return data.pendaftaran.filter(p => p.userId === user.email);
    }

    // Pengumuman methods
    addPengumuman(pengumumanData) {
        const data = this.getData();
        pengumumanData.id = Date.now();
        pengumumanData.createdAt = new Date().toISOString();
        data.pengumuman.push(pengumumanData);
        this.saveData(data);
    }

    getPengumuman() {
        const data = this.getData();
        return data.pengumuman.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Admin only - untuk menambahkan pengumuman
    addPengumumanByAdmin(title, content) {
        if (!confirm('Anda yakin ingin menambahkan pengumuman?')) return;

        const pengumumanData = {
            title: title,
            content: content,
            date: new Date().toLocaleDateString('id-ID'),
            important: false
        };

        this.addPengumuman(pengumumanData);
        alert('Pengumuman berhasil ditambahkan!');
    }

    logout() {
        // Hapus data user yang sedang login
        localStorage.removeItem(this.currentUserKey);
        console.log('User logged out successfully');
    }

    clearAllData() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.currentUserKey);
        this.initStorage();
        console.log('All data cleared');
    }
}

// Create global instance
const dataStorage = new DataStorage();