// ============================================
// Firebase Configuration
// ============================================
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, push, child, update, remove, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBLqVzpdX0uq59aHeWFCaNzKaCTH4gmCPk",
  authDomain: "quickhire2-ec757.firebaseapp.com",
  projectId: "quickhire2-ec757",
  storageBucket: "quickhire2-ec757.firebasestorage.app",
  messagingSenderId: "442786756976",
  appId: "1:442786756976:web:23918db53dd619d9d5f7b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============================================
// DATA
// ============================================
const MOCK_DATA = {
    workers: [
        {
            id: 1,
            name: 'Prakrit S.',
            initials: 'PS',
            title: 'Accountant',
            experience: '3yrs',
            rating: 0.5,
            reviews: 21,
            available: true,
            image: null,
            location: '2.1 km away',
            hourlyRate: 25,
            skills: ['Event Setup', 'Customer Service', 'Crowd Management'],
            experienceDetails: [
                { title: 'Event Coordinator Helper', company: 'ExpoEvents Co.', period: '2022-Present' },
                { title: 'Retail Staff (Part-time)', company: 'CityMart', period: '2021-2022' }
            ],
            reviewsData: [
                { user: 'James', text: 'Very professional and punctual. Highly recommend!', rating: 5 }
            ]
        },
        {
            id: 2,
            name: 'Rohan Raj Karki',
            initials: 'RRK',
            title: 'Manager',
            experience: '2yrs',
            rating: 2.0,
            reviews: 29,
            available: true,
            image: null,
            location: '3.5 km away',
            hourlyRate: 30,
            skills: ['Team Leadership', 'Project Management', 'Customer Service'],
            experienceDetails: [
                { title: 'Team Lead', company: 'TechCorp', period: '2022-Present' },
                { title: 'Assistant Manager', company: 'RetailMax', period: '2020-2022' }
            ],
            reviewsData: [
                { user: 'Sarah', text: 'Great leader and very organized.', rating: 5 }
            ]
        },
        {
            id: 3,
            name: 'Anish Kunwar',
            initials: 'AK',
            title: 'Tutor',
            experience: '4yrs',
            rating: 2.5,
            reviews: 42,
            available: true,
            image: null,
            location: '1.8 km away',
            hourlyRate: 20,
            skills: ['Mathematics', 'Physics', 'Chemistry'],
            experienceDetails: [
                { title: 'Senior Tutor', company: 'TutorHub', period: '2021-Present' },
                { title: 'Teaching Assistant', company: 'University', period: '2019-2021' }
            ],
            reviewsData: [
                { user: 'Mike', text: 'Excellent tutor, very patient.', rating: 5 }
            ]
        },
        {
            id: 4,
            name: 'Sita Sharma',
            initials: 'SS',
            title: 'Event Assistant',
            experience: '2yrs',
            rating: 1.5,
            reviews: 15,
            available: true,
            image: null,
            location: '4.2 km away',
            hourlyRate: 22,
            skills: ['Event Planning', 'Customer Service', 'Communication'],
            experienceDetails: [
                { title: 'Event Assistant', company: 'EventPro', period: '2022-Present' }
            ],
            reviewsData: [
                { user: 'David', text: 'Very helpful and professional.', rating: 4 }
            ]
        }
    ],
    jobs: [
        {
            id: 1,
            title: 'Event Helper Needed',
            employer: 'Tech Conference 2026',
            duration: '1 Day',
            location: 'Convention Center, NYC',
            distance: '2.3 km',
            pay: '$90 Fixed',
            category: 'Event Assistant'
        },
        {
            id: 2,
            title: 'Math Tutor',
            employer: 'Family in Brooklyn',
            duration: '2 hrs/week',
            location: 'Brooklyn, NYC',
            distance: '4.1 km',
            pay: '$16/hr',
            category: 'Tutor'
        },
        {
            id: 3,
            title: 'Cleaner Needed',
            employer: 'Office Solutions Inc.',
            duration: 'Weekend',
            location: 'Financial District, NYC',
            distance: '1.2 km',
            pay: '$25/hr',
            category: 'Cleaner'
        }
    ]
};

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    currentPage: 'home',
    selectedWorker: null,
    searchQuery: '',
    filter: 'All',
    workers: [],
    jobs: [],
    isFirebaseConnected: false,
    loading: false,
    currentConversation: null
};

// ============================================
// DOM REFERENCES
// ============================================
const mainContent = document.getElementById('mainContent');
const searchInput = document.getElementById('globalSearch');
const searchContainer = document.getElementById('globalSearchContainer');
const navItems = document.querySelectorAll('.nav-item');

// ============================================
// FIREBASE FUNCTIONS
// ============================================
async function loadWorkersFromFirebase() {
    try {
        AppState.loading = true;
        const workersRef = ref(db, 'workers');
        const snapshot = await get(workersRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            const workersList = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            AppState.workers = workersList;
            AppState.isFirebaseConnected = true;
            console.log('✅ Workers loaded from Firebase:', workersList.length);
        } else {
            console.log('📦 No workers in Firebase, using mock data');
            AppState.workers = MOCK_DATA.workers;
            await seedFirebaseWithMockData();
        }
    } catch (error) {
        console.error('❌ Error loading workers from Firebase:', error);
        AppState.workers = MOCK_DATA.workers;
        AppState.isFirebaseConnected = false;
        showToast('Using offline data', 'info');
    } finally {
        AppState.loading = false;
    }
}

async function loadJobsFromFirebase() {
    try {
        const jobsRef = ref(db, 'jobs');
        const snapshot = await get(jobsRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            const jobsList = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            AppState.jobs = jobsList;
        } else {
            AppState.jobs = MOCK_DATA.jobs;
            await seedFirebaseWithMockJobs();
        }
    } catch (error) {
        console.error('❌ Error loading jobs from Firebase:', error);
        AppState.jobs = MOCK_DATA.jobs;
    }
}

async function seedFirebaseWithMockData() {
    try {
        console.log('🌱 Seeding Firebase with mock worker data...');
        const workersRef = ref(db, 'workers');
        
        for (const worker of MOCK_DATA.workers) {
            const newWorkerRef = push(workersRef);
            await set(newWorkerRef, {
                name: worker.name,
                initials: worker.initials,
                title: worker.title,
                experience: worker.experience,
                rating: worker.rating,
                reviews: worker.reviews,
                available: worker.available,
                location: worker.location,
                hourlyRate: worker.hourlyRate || 25,
                skills: worker.skills,
                experienceDetails: worker.experienceDetails,
                reviewsData: worker.reviewsData
            });
        }
        console.log('✅ Mock data seeded successfully!');
        showToast('Data synced with Firebase', 'success');
    } catch (error) {
        console.error('❌ Error seeding Firebase:', error);
    }
}

async function seedFirebaseWithMockJobs() {
    try {
        console.log('🌱 Seeding Firebase with mock job data...');
        const jobsRef = ref(db, 'jobs');
        
        for (const job of MOCK_DATA.jobs) {
            const newJobRef = push(jobsRef);
            await set(newJobRef, {
                title: job.title,
                employer: job.employer,
                duration: job.duration,
                location: job.location,
                distance: job.distance,
                pay: job.pay,
                category: job.category
            });
        }
        console.log('✅ Mock jobs seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding jobs:', error);
    }
}

function getWorkerById(workerId) {
    return AppState.workers.find(w => w.id === workerId);
}

function listenForWorkerUpdates() {
    const workersRef = ref(db, 'workers');
    onValue(workersRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const workersList = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            AppState.workers = workersList;
            if (AppState.currentPage === 'workers' || AppState.currentPage === 'profile') {
                renderPage(AppState.currentPage);
            }
        }
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderHomePage() {
    const searchQuery = AppState.searchQuery.toLowerCase();
    const filteredWorkers = AppState.workers.filter(w => 
        w.name.toLowerCase().includes(searchQuery) ||
        w.title.toLowerCase().includes(searchQuery)
    ).slice(0, 3);

    const stats = [
        { value: AppState.workers.length + 'K', label: 'Active Workers' },
        { value: '320', label: 'Jobs Posted Today' },
        { value: '98K', label: 'Successful Hires' },
        { value: '4.8', label: 'Average Rating' }
    ];

    const whyChoose = [
        { icon: 'fa-user-check', label: 'Verified Workers', color: '#22C55E' },
        { icon: 'fa-bolt', label: 'Fast Hiring', color: '#1E3A5F' },
        { icon: 'fa-lock', label: 'Secure Payments', color: '#0EA5E9' },
        { icon: 'fa-clock', label: 'Flexible Scheduling', color: '#F59E0B' }
    ];

    const categories = [
        { id: 1, name: 'Grocery Staff', icon: 'fa-store' },
        { id: 2, name: 'Accountant', icon: 'fa-calculator' },
        { id: 3, name: 'Tutor', icon: 'fa-graduation-cap' },
        { id: 4, name: 'Delivery Helper', icon: 'fa-truck' },
        { id: 5, name: 'Event Assistant', icon: 'fa-calendar-check' },
        { id: 6, name: 'Customer Service', icon: 'fa-headset' },
        { id: 7, name: 'Cleaner', icon: 'fa-broom' },
        { id: 8, name: 'Office Assistant', icon: 'fa-briefcase' }
    ];

    return `
        <div class="page active" id="homePage">
            <div class="welcome-banner">
                <h2>Good Morning, Sashi</h2>
                <p>Hire trusted workers for an hour, a day, or whenever you need help.</p>
                <button class="banner-btn" onclick="showToast('Starting hiring process...', 'success')">
                    Start Hiring Now <i class="fas fa-arrow-right"></i>
                </button>
            </div>

            <div class="section">
                <div class="section-header">
                    <h3 class="section-title">Quick Categories</h3>
                    <a class="section-link" onclick="navigateTo('workers')">See All</a>
                </div>
                <div class="categories-scroll">
                    ${categories.map(cat => `
                        <div class="category-card" onclick="searchByCategory('${cat.name}')">
                            <div class="category-icon"><i class="fas ${cat.icon}"></i></div>
                            <span class="category-name">${cat.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <div class="section-header">
                    <h3 class="section-title">Featured Workers</h3>
                    <a class="section-link" onclick="navigateTo('workers')">See All</a>
                </div>
                <div class="workers-list">
                    ${filteredWorkers.length > 0 ? filteredWorkers.map(worker => `
                        <div class="worker-card" onclick="viewWorkerProfile('${worker.id}')">
                            <div class="worker-card-header">
                                ${worker.image ? 
                                    `<img src="${worker.image}" alt="${worker.name}" class="worker-avatar" />` :
                                    `<div class="worker-avatar-initials">${worker.initials || getInitials(worker.name)}</div>`
                                }
                                <div class="worker-info">
                                    <div class="worker-name">${worker.name}</div>
                                    <div class="worker-title">${worker.title}</div>
                                    <div class="worker-rating">
                                        <i class="fas fa-star"></i>
                                        <span>${worker.rating}</span>
                                        <span class="review-count">(${worker.reviews} reviews)</span>
                                    </div>
                                </div>
                                <div class="worker-availability ${worker.available ? '' : 'busy'}">
                                    ${worker.available ? 'Available' : 'Busy'}
                                </div>
                            </div>
                            <div class="worker-card-footer">
                                <div class="worker-experience">
                                    <i class="fas fa-briefcase"></i>
                                    <span>${worker.experience}</span>
                                </div>
                                <div class="worker-rate">
                                    <span class="amount">$${worker.hourlyRate || 25}</span>
                                    <span class="period">/hr</span>
                                </div>
                                <button class="hire-btn-small" onclick="event.stopPropagation(); hireWorker('${worker.id}')">
                                    Hire Now
                                </button>
                            </div>
                        </div>
                    `).join('') : `
                        <div style="text-align: center; padding: 20px; color: var(--gray-300);">
                            <p>No workers found</p>
                        </div>
                    `}
                </div>
            </div>

            <div class="section">
                <h3 class="section-title" style="padding: 0 16px; margin-bottom: 12px;">Platform Statistics</h3>
                <div class="stats-grid">
                    ${stats.map(stat => `
                        <div class="stat-card">
                            <div class="stat-value">${stat.value}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section" style="margin-bottom: 20px;">
                <h3 class="section-title" style="padding: 0 16px; margin-bottom: 12px;">Why Choose Us</h3>
                <div class="why-choose-grid">
                    ${whyChoose.map(item => `
                        <div class="why-choose-item">
                            <div class="icon" style="color: ${item.color}"><i class="fas ${item.icon}"></i></div>
                            <div class="label">${item.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderBrowseWorkersPage() {
    const searchQuery = AppState.searchQuery.toLowerCase();
    
    let filteredWorkers = AppState.workers.filter(w => {
        const matchesSearch = w.name.toLowerCase().includes(searchQuery) ||
                             w.title.toLowerCase().includes(searchQuery) ||
                             (w.skills && w.skills.some(skill => skill.toLowerCase().includes(searchQuery)));
        const matchesFilter = AppState.filter === 'All' ||
                             (AppState.filter === 'Available Now' && w.available) ||
                             (AppState.filter === 'Top Rated' && w.rating >= 2.0);
        return matchesSearch && matchesFilter;
    });

    const filters = ['All', 'Nearby', 'Top Rated', 'Available Now'];

    return `
        <div class="page active" id="workersPage">
            <div class="browse-header">
                <h2>Browse Workers</h2>
                <div class="filter-chips">
                    ${filters.map(filter => `
                        <button class="filter-chip ${AppState.filter === filter ? 'active' : ''}" 
                                onclick="setFilter('${filter}')">
                            ${filter}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div style="padding-top: 8px;">
                ${filteredWorkers.length > 0 ? filteredWorkers.map(worker => `
                    <div class="browse-worker-card">
                        <div class="browse-worker-header">
                            <div class="browse-worker-avatar">
                                ${worker.initials || getInitials(worker.name)}
                            </div>
                            <div class="browse-worker-info">
                                <div class="browse-worker-name">${worker.name}</div>
                                <div class="browse-worker-title">${worker.title}: ${worker.experience}</div>
                                <div class="browse-worker-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${worker.rating}</span>
                                    <span class="review-count">(${worker.reviews})</span>
                                </div>
                            </div>
                            <div class="browse-worker-availability ${worker.available ? '' : 'busy'}">
                                ${worker.available ? 'Available' : 'Busy'}
                            </div>
                        </div>
                        <div class="browse-worker-footer">
                            <div class="browse-worker-experience">
                                <i class="fas fa-briefcase"></i> ${worker.experience}
                            </div>
                            <button class="view-profile-btn" onclick="viewWorkerProfile('${worker.id}')">
                                View Profile & Hire
                            </button>
                        </div>
                    </div>
                `).join('') : `
                    <div style="text-align: center; padding: 40px; color: var(--gray-300);">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                        <p>No workers found matching your criteria</p>
                        <button onclick="clearSearch()" style="margin-top: 12px; padding: 8px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Clear Search
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
}

function renderWorkerProfilePage(workerId) {
    const worker = getWorkerById(workerId);
    if (!worker) {
        showToast('Worker not found', 'error');
        navigateTo('workers');
        return '';
    }

    const rating = worker.rating || 0;

    return `
        <div class="page active" id="profilePage">
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar-large">
                        ${worker.initials || getInitials(worker.name)}
                    </div>
                    <div class="profile-name">${worker.name}</div>
                    <div class="profile-title">${worker.title}: ${worker.experience}</div>
                    <div class="profile-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${worker.location || '2.1 km away'}</span>
                    </div>
                    <div class="profile-rating">
                        <i class="fas fa-star"></i>
                        <span class="rating-number">${rating}</span>
                        <span class="reviews-count">(${worker.reviews || 0} reviews)</span>
                    </div>
                </div>

                <div class="profile-section-card">
                    <h3>Skills</h3>
                    <div class="skills-container">
                        ${(worker.skills || []).map(skill => `
                            <span class="skill-tag">${skill}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="profile-section-card">
                    <h3>Experience</h3>
                    ${(worker.experienceDetails || []).map(exp => `
                        <div class="experience-item">
                            <div class="experience-dot"></div>
                            <div class="experience-content">
                                <div class="experience-title">${exp.title}</div>
                                <div class="experience-company">${exp.company || ''}</div>
                                <div class="experience-period">${exp.period}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="profile-section-card">
                    <h3>Recent Reviews</h3>
                    ${(worker.reviewsData || []).map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <span class="review-user">${review.user}</span>
                                <span class="review-rating">${'⭐'.repeat(review.rating || 5)}</span>
                            </div>
                            <div class="review-text">
                                <i class="fas fa-quote-left" style="margin-right: 4px; opacity: 0.5;"></i>
                                ${review.text}
                                <i class="fas fa-quote-right" style="margin-left: 4px; opacity: 0.5;"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="profile-actions">
                    <button class="btn-hire" onclick="hireWorker('${worker.id}')">
                        <i class="fas fa-handshake"></i> Hire Now
                    </button>
                    <button class="btn-message" onclick="openConversation('${worker.id}')">
                        <i class="fas fa-comment"></i> Message
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderBrowseJobsPage() {
    const searchQuery = AppState.searchQuery.toLowerCase();
    const filteredJobs = AppState.jobs.filter(j => {
        const matchesSearch = j.title.toLowerCase().includes(searchQuery) ||
                             j.employer.toLowerCase().includes(searchQuery) ||
                             j.category.toLowerCase().includes(searchQuery);
        const matchesFilter = AppState.filter === 'All' ||
                             (AppState.filter === 'Today' && j.duration.includes('Day')) ||
                             (AppState.filter === 'High Pay' && parseInt(j.pay) > 20);
        return matchesSearch && matchesFilter;
    });

    const filters = ['All', 'Today', 'High Pay', 'Nearby'];

    return `
        <div class="page active" id="jobsPage">
            <div class="browse-header">
                <h2>Browse Jobs</h2>
                <div class="filter-chips">
                    ${filters.map(filter => `
                        <button class="filter-chip ${AppState.filter === filter ? 'active' : ''}" 
                                onclick="setFilter('${filter}')">
                            ${filter}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="jobs-list">
                ${filteredJobs.length > 0 ? filteredJobs.map(job => `
                    <div class="job-card" onclick="showToast('Viewing: ${job.title}', 'info')">
                        <div class="job-title">${job.title}</div>
                        <div class="job-employer">${job.employer}</div>
                        <div class="job-duration">${job.duration}</div>
                        <div class="job-details">
                            <div class="job-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${job.location}</span>
                            </div>
                            <div class="job-detail">
                                <i class="fas fa-route"></i>
                                <span>${job.distance}</span>
                            </div>
                        </div>
                        <div class="job-footer">
                            <div class="job-pay">${job.pay}</div>
                            <button class="apply-btn" onclick="event.stopPropagation(); applyForJob('${job.id}')">
                                Apply Now
                            </button>
                        </div>
                    </div>
                `).join('') : `
                    <div style="text-align: center; padding: 40px; color: var(--gray-300);">
                        <i class="fas fa-briefcase" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                        <p>No jobs found matching your criteria</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function renderMessagesPage() {
    const messages = [
        {
            id: 1,
            sender: 'Prakrit S.',
            senderInitials: 'PS',
            lastMessage: 'I am available for the event tomorrow!',
            time: '2 min ago',
            unread: true,
            online: true
        },
        {
            id: 2,
            sender: 'Rohan Raj Karki',
            senderInitials: 'RRK',
            lastMessage: 'Yes, I can start next week.',
            time: '1 hour ago',
            unread: false,
            online: false
        },
        {
            id: 3,
            sender: 'Anish Kunwar',
            senderInitials: 'AK',
            lastMessage: 'Thank you for the opportunity!',
            time: '3 hours ago',
            unread: false,
            online: true
        },
        {
            id: 4,
            sender: 'Sita Sharma',
            senderInitials: 'SS',
            lastMessage: 'I\'ll be there at 9 AM.',
            time: 'Yesterday',
            unread: false,
            online: false
        },
        {
            id: 5,
            sender: 'Tech Conference 2026',
            senderInitials: 'TC',
            lastMessage: 'Your application has been approved!',
            time: 'Yesterday',
            unread: true,
            online: false
        }
    ];

    return `
        <div class="page active" id="messagesPage">
            <div class="messages-header">
                <h2>Messages</h2>
                <button class="new-message-btn" onclick="showToast('New message feature coming soon!', 'info')">
                    <i class="fas fa-pen"></i>
                </button>
            </div>
            
            <div class="messages-list">
                ${messages.map(msg => `
                    <div class="message-item ${msg.unread ? 'unread' : ''}" onclick="openConversation('${msg.id}')">
                        <div class="message-avatar">
                            <div class="message-avatar-initials">${msg.senderInitials}</div>
                            ${msg.online ? '<div class="online-dot"></div>' : ''}
                        </div>
                        <div class="message-content">
                            <div class="message-sender">
                                <span class="sender-name">${msg.sender}</span>
                                <span class="message-time">${msg.time}</span>
                            </div>
                            <div class="message-preview">
                                ${msg.unread ? '<span class="unread-dot"></span>' : ''}
                                <span class="preview-text">${msg.lastMessage}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderConversationPage(conversationId) {
    const conversations = {
        '1': {
            name: 'Prakrit S.',
            initials: 'PS',
            online: true,
            messages: [
                { sender: 'them', text: 'Hello! I\'m available for the event tomorrow.', time: '10:30 AM' },
                { sender: 'me', text: 'Great! Can you be there at 8 AM?', time: '10:32 AM' },
                { sender: 'them', text: 'Yes, I\'ll be there on time.', time: '10:33 AM' },
                { sender: 'me', text: 'Perfect, I\'ll send you the details.', time: '10:35 AM' }
            ]
        },
        '2': {
            name: 'Rohan Raj Karki',
            initials: 'RRK',
            online: false,
            messages: [
                { sender: 'them', text: 'Yes, I can start next week.', time: '2:00 PM' },
                { sender: 'me', text: 'Great! Let\'s discuss the schedule.', time: '2:05 PM' },
                { sender: 'them', text: 'Sure, I\'m available anytime.', time: '2:10 PM' }
            ]
        },
        '3': {
            name: 'Anish Kunwar',
            initials: 'AK',
            online: true,
            messages: [
                { sender: 'them', text: 'Thank you for the opportunity!', time: '11:00 AM' },
                { sender: 'me', text: 'You\'re welcome! Looking forward to working with you.', time: '11:05 AM' }
            ]
        },
        '4': {
            name: 'Sita Sharma',
            initials: 'SS',
            online: false,
            messages: [
                { sender: 'them', text: 'I\'ll be there at 9 AM.', time: '9:00 AM' },
                { sender: 'me', text: 'Perfect, see you then!', time: '9:05 AM' }
            ]
        },
        '5': {
            name: 'Tech Conference 2026',
            initials: 'TC',
            online: false,
            messages: [
                { sender: 'them', text: 'Your application has been approved!', time: 'Yesterday' },
                { sender: 'me', text: 'Thank you! I\'m excited to participate.', time: 'Yesterday' }
            ]
        }
    };

    const conversation = conversations[conversationId] || conversations['1'];

    return `
        <div class="page active" id="conversationPage">
            <div class="conversation-header">
                <button class="back-btn" onclick="navigateTo('messages')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="conversation-user">
                    <div class="conversation-avatar">
                        <div class="conversation-avatar-initials">${conversation.initials}</div>
                        ${conversation.online ? '<div class="online-dot"></div>' : ''}
                    </div>
                    <div class="conversation-user-info">
                        <span class="conversation-user-name">${conversation.name}</span>
                        <span class="conversation-user-status">${conversation.online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
                <button class="conversation-actions" onclick="showToast('More options coming soon!', 'info')">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>

            <div class="conversation-messages">
                ${conversation.messages.map(msg => `
                    <div class="message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}">
                        <p>${msg.text}</p>
                        <span class="message-time">${msg.time}</span>
                    </div>
                `).join('')}
            </div>

            <div class="conversation-input">
                <button class="attach-btn" onclick="showToast('Attachment feature coming soon!', 'info')">
                    <i class="fas fa-paperclip"></i>
                </button>
                <input type="text" 
                       class="message-input" 
                       placeholder="Type a message..." 
                       id="messageInput"
                       onkeydown="if(event.key==='Enter') sendMessage('${conversationId}')" />
                <button class="send-btn" onclick="sendMessage('${conversationId}')">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
}

function renderProfilePage() {
    const user = {
        name: 'Sashi Bhushan Yadav',
        email: 'sashi@gmail.com',
        phone: '+977 9862552921',
        location: 'Kathmandu, Nepal',
        memberSince: 'January 2024',
        avatar: 'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2020/12/16173152/2021-Hennessey-Venom-F5-Exterior-Static-Shots-18-1200x1742-1.jpg',
        stats: {
            jobsCompleted: 47,
            rating: 4.8,
            reviews: 89,
            savedWorkers: 12
        },
        recentHires: [
            { name: 'Prakrit S.', title: 'Accountant', date: '2 days ago', rating: 5 },
            { name: 'Anish Kunwar', title: 'Tutor', date: '1 week ago', rating: 4 },
            { name: 'Rohan Raj Karki', title: 'Manager', date: '2 weeks ago', rating: 5 }
        ]
    };

    return `
        <div class="page active" id="profilePage">
            <div class="profile-header-section">
                <div class="profile-cover">
                    <div class="profile-cover-image"></div>
                    <div class="profile-avatar-large">
                        <img src="${user.avatar}" alt="${user.name}" class="profile-avatar-img" />
                    </div>
                </div>
                <div class="profile-info">
                    <h2 class="profile-display-name">${user.name}</h2>
                    <p class="profile-display-email"><i class="fas fa-envelope"></i> ${user.email}</p>
                    <p class="profile-display-location"><i class="fas fa-map-marker-alt"></i> ${user.location}</p>
                    <p class="profile-display-member"><i class="fas fa-calendar-alt"></i> Member since ${user.memberSince}</p>
                </div>
            </div>

            <div class="profile-stats-grid">
                <div class="profile-stat-card">
                    <div class="profile-stat-value">${user.stats.jobsCompleted}</div>
                    <div class="profile-stat-label">Jobs Done</div>
                </div>
                <div class="profile-stat-card">
                    <div class="profile-stat-value">${user.stats.rating}</div>
                    <div class="profile-stat-label">Rating</div>
                </div>
                <div class="profile-stat-card">
                    <div class="profile-stat-value">${user.stats.reviews}</div>
                    <div class="profile-stat-label">Reviews</div>
                </div>
                <div class="profile-stat-card">
                    <div class="profile-stat-value">${user.stats.savedWorkers}</div>
                    <div class="profile-stat-label">Saved</div>
                </div>
            </div>

            <div class="profile-section-card">
                <div class="profile-section-header">
                    <h3><i class="fas fa-clock"></i> Recent Hires</h3>
                    <button class="profile-section-action" onclick="showToast('View all hires', 'info')">See All</button>
                </div>
                ${user.recentHires.map(hire => `
                    <div class="recent-hire-item">
                        <div class="recent-hire-info">
                            <div class="recent-hire-name">${hire.name}</div>
                            <div class="recent-hire-title">${hire.title}</div>
                        </div>
                        <div class="recent-hire-meta">
                            <span class="recent-hire-date">${hire.date}</span>
                            <span class="recent-hire-rating">${'⭐'.repeat(hire.rating)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="profile-actions-grid">
                <button class="profile-action-btn" onclick="navigateTo('profile', { edit: true })">
                    <i class="fas fa-user-edit"></i>
                    <span>Edit Profile</span>
                </button>
                <button class="profile-action-btn" onclick="showToast('Payment methods coming soon!', 'info')">
                    <i class="fas fa-credit-card"></i>
                    <span>Payment</span>
                </button>
                <button class="profile-action-btn" onclick="showToast('Settings coming soon!', 'info')">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </button>
                <button class="profile-action-btn" onclick="showToast('Help & support coming soon!', 'info')">
                    <i class="fas fa-headset"></i>
                    <span>Help</span>
                </button>
            </div>

            <button class="profile-signout-btn" onclick="showToast('Signing out...', 'info')">
                <i class="fas fa-sign-out-alt"></i> Sign Out
            </button>
        </div>
    `;
}

function renderEditProfilePage() {
    const user = {
        name: 'Sashi Bhushan Yadav',
        email: 'sashi@gmail.com',
        phone: '+977 9862552921',
        location: 'Kathmandu, Nepal'
    };

    return `
        <div class="page active" id="editProfilePage">
            <div class="edit-profile-header">
                <button class="back-btn" onclick="navigateTo('profile')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2>Edit Profile</h2>
                <button class="save-btn" onclick="saveProfile()">Save</button>
            </div>

            <div class="edit-profile-form">
                <div class="form-group">
                    <label>Profile Photo</label>
                    <div class="profile-photo-upload">
                        <div class="profile-photo-preview">
                            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
                        </div>
                        <button class="photo-upload-btn" onclick="showToast('Photo upload coming soon!', 'info')">
                            <i class="fas fa-camera"></i> Change Photo
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-input" value="${user.name}" />
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" value="${user.email}" />
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="form-input" value="${user.phone}" />
                </div>

                <div class="form-group">
                    <label>Location</label>
                    <input type="text" class="form-input" value="${user.location}" />
                </div>

                <div class="form-group">
                    <label>Bio</label>
                    <textarea class="form-textarea" rows="4" placeholder="Tell us about yourself...">Experienced professional looking for short-term opportunities.</textarea>
                </div>
            </div>
        </div>
    `;
}

function renderPlaceholderPage(title, icon = 'fa-construction') {
    return `
        <div class="page active">
            <div class="placeholder-page">
                <i class="fas ${icon}"></i>
                <h2>${title}</h2>
                <p>This feature is coming soon!</p>
            </div>
        </div>
    `;
}

// ============================================
// PAGE MANAGEMENT
// ============================================
function renderPage(page, data = null) {
    let html = '';
    
    // Show/hide search bar based on page
    if (page === 'home' || page === 'workers' || page === 'jobs') {
        searchContainer.style.display = 'flex';
    } else {
        searchContainer.style.display = 'none';
    }
    
    // Update search placeholder based on page
    if (page === 'jobs') {
        searchInput.placeholder = 'Search jobs near you...';
    } else if (page === 'workers') {
        searchInput.placeholder = 'Search by skill or name...';
    } else {
        searchInput.placeholder = 'Find workers or jobs...';
    }
    
    switch(page) {
        case 'home':
            html = renderHomePage();
            break;
        case 'workers':
            html = renderBrowseWorkersPage();
            break;
        case 'jobs':
            html = renderBrowseJobsPage();
            break;
        case 'profile':
            if (data && data.edit) {
                html = renderEditProfilePage();
            } else if (data && data.workerId) {
                html = renderWorkerProfilePage(data.workerId);
            } else {
                html = renderProfilePage();
            }
            break;
        case 'messages':
            if (data && data.conversationId) {
                html = renderConversationPage(data.conversationId);
            } else {
                html = renderMessagesPage();
            }
            break;
        case 'hire':
            html = renderPlaceholderPage('Hire a Worker', 'fa-plus-circle');
            break;
        default:
            html = renderPlaceholderPage('Page Not Found', 'fa-exclamation-circle');
    }
    
    mainContent.innerHTML = html;
    updateActiveNav(page);
}

function navigateTo(page, data = null) {
    AppState.currentPage = page;
    renderPage(page, data);
}

function updateActiveNav(page) {
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
}

function setFilter(filter) {
    AppState.filter = filter;
    renderPage(AppState.currentPage);
}

// ============================================
// SEARCH FUNCTIONS
// ============================================
function handleBrowseSearch(query) {
    AppState.searchQuery = query;
    document.getElementById('globalSearch').value = query;
    renderPage('workers');
}

function handleJobsSearch(query) {
    AppState.searchQuery = query;
    document.getElementById('globalSearch').value = query;
    renderPage('jobs');
}

function searchByCategory(category) {
    AppState.searchQuery = category;
    document.getElementById('globalSearch').value = category;
    navigateTo('workers');
    showToast(`Showing ${category} workers`, 'info');
}

function clearSearch() {
    AppState.searchQuery = '';
    document.getElementById('globalSearch').value = '';
    renderPage('workers');
}

// ============================================
// ACTION FUNCTIONS
// ============================================
function viewWorkerProfile(workerId) {
    navigateTo('profile', { workerId });
}

function hireWorker(workerId) {
    const worker = getWorkerById(workerId);
    if (worker) {
        showToast(`✅ Hiring ${worker.name}`, 'success');
    }
}

function applyForJob(jobId) {
    const job = AppState.jobs.find(j => j.id === jobId);
    if (job) {
        showToast(`✅ Applied for: ${job.title}`, 'success');
    }
}

function messageWorker(workerId) {
    const worker = getWorkerById(workerId);
    if (worker) {
        showToast(`💬 Messaging ${worker.name}`, 'info');
    }
}

function openConversation(conversationId) {
    navigateTo('messages', { conversationId });
}

function sendMessage(conversationId) {
    const input = document.getElementById('messageInput');
    if (!input || !input.value.trim()) return;
    
    const message = input.value.trim();
    input.value = '';
    
    const messagesContainer = document.querySelector('.conversation-messages');
    if (messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-bubble sent';
        messageDiv.innerHTML = `
            <p>${message}</p>
            <span class="message-time">Just now</span>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        setTimeout(() => {
            showToast('✅ Message sent!', 'success');
        }, 500);
    }
}

function saveProfile() {
    showToast('✅ Profile updated successfully!', 'success');
    setTimeout(() => {
        navigateTo('profile');
    }, 500);
}

// ============================================
// EVENT LISTENERS
// ============================================
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        if (page === 'profile') {
            navigateTo('profile');
        } else if (page === 'messages') {
            navigateTo('messages');
        } else if (page === 'hire') {
            navigateTo('hire');
        } else {
            navigateTo(page);
        }
    });
});

searchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    if (AppState.currentPage === 'workers' || AppState.currentPage === 'jobs') {
        renderPage(AppState.currentPage);
    } else if (AppState.currentPage === 'home') {
        renderPage('home');
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.value = '';
        AppState.searchQuery = '';
        renderPage(AppState.currentPage);
    }
    if (e.key === 'Enter' && AppState.searchQuery.length > 0) {
        if (AppState.currentPage !== 'workers' && AppState.currentPage !== 'jobs') {
            navigateTo('workers');
        }
    }
});

// ============================================
// INITIALIZATION
// ============================================
async function init() {
    console.log('🚀 QuickHire App Initializing...');
    
    await loadWorkersFromFirebase();
    await loadJobsFromFirebase();
    listenForWorkerUpdates();
    
    navigateTo('home');
    showToast('👋 Welcome to QuickHire!', 'success');
    
    window.addEventListener('popstate', () => {
        navigateTo('home');
    });
    
    console.log('✅ QuickHire App Ready!');
    console.log(`📊 ${AppState.workers.length} workers loaded`);
    console.log(`💼 ${AppState.jobs.length} jobs loaded`);
}

// Make functions globally accessible
window.navigateTo = navigateTo;
window.setFilter = setFilter;
window.viewWorkerProfile = viewWorkerProfile;
window.hireWorker = hireWorker;
window.applyForJob = applyForJob;
window.messageWorker = messageWorker;
window.handleBrowseSearch = handleBrowseSearch;
window.handleJobsSearch = handleJobsSearch;
window.searchByCategory = searchByCategory;
window.clearSearch = clearSearch;
window.showToast = showToast;
window.openConversation = openConversation;
window.sendMessage = sendMessage;
window.saveProfile = saveProfile;

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);