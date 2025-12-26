// Subject data with their PDF files
const subjectsData = [
    {
        name: "Accounting",
        icon: "📊",
        files: [
            { name: "1041-Accounting.pdf", path: "Accounting/1041-Accounting.pdf" },
            { name: "Account-1041.pdf", path: "Accounting/Account-1041.pdf" }
        ]
    },
    {
        name: "Business",
        icon: "💼",
        files: [
            { name: "2161-Business.pdf", path: "Business/2161-Business.pdf" },
            { name: "Business-2161.pdf", path: "Business/Business-2161.pdf" }
        ]
    },
    {
        name: "Com. English",
        icon: "📝",
        files: [
            { name: "English-0041.pdf", path: "Com. English/English-0041.pdf" },
            { name: "English-0041(Regular).pdf", path: "Com. English/English-0041(Regular).pdf" },
            { name: "English-old.pdf", path: "Com. English/English-old.pdf" },
            { name: "English(0041 Partial).pdf", path: "Com. English/English(0041 Partial).pdf" }
        ]
    },
    {
        name: "Com. Nepali",
        icon: "📖",
        files: [
            { name: "0021 Nepali.pdf", path: "Com. Nepali/0021 Nepali.pdf" },
            { name: "Nepali-0021.pdf", path: "Com. Nepali/Nepali-0021.pdf" }
        ]
    },
    {
        name: "Economics",
        icon: "📈",
        files: [
            { name: "3041-Economics.pdf", path: "Economics/3041-Economics.pdf" },
            { name: "Economics-3041.pdf", path: "Economics/Economics-3041.pdf" }
        ]
    },
    {
        name: "Education & Development",
        icon: "🎓",
        files: [
            { name: "2041-Education & Development.pdf", path: "Education & Devlopment/2041-Education & Development.pdf" },
            { name: "Education & Development-2041.pdf", path: "Education & Devlopment/Education & Development-2041.pdf" }
        ]
    },
    {
        name: "Health and Physical Education",
        icon: "🏃",
        files: [
            { name: "4441 Health.pdf", path: "Health and Physical Education/4441 Health.pdf" },
            { name: "Health-4441.pdf", path: "Health and Physical Education/Health-4441.pdf" }
        ]
    },
    {
        name: "Instructional Pedagogy",
        icon: "👨‍🏫",
        files: [
            { name: "1181 Instructional Pedagogy.pdf", path: "Instructional Pedagogy/1181 Instructional Pedagogy.pdf" },
            { name: "Instructional Pedagogy.pdf", path: "Instructional Pedagogy/Instructional Pedagogy.pdf" }
        ]
    },
    {
        name: "Mathematics",
        icon: "🔢",
        files: [
            { name: "4021 Maths set-A.pdf", path: "Mathematics/4021 Maths set-A.pdf" }
        ]
    },
    {
        name: "Optional Nepali",
        icon: "📚",
        files: [
            { name: "3321-Nepali.pdf", path: "Optinal Nepali/3321-Nepali.pdf" },
            { name: "Nepali-3321.pdf", path: "Optinal Nepali/Nepali-3321.pdf" }
        ]
    },
    {
        name: "Optional English",
        icon: "📄",
        files: [
            { name: "3341-OPT English.pdf", path: "Optional English/3341-OPT English.pdf" },
            { name: "Opt-English-3341.pdf", path: "Optional English/Opt-English-3341.pdf" }
        ]
    },
    {
        name: "Population",
        icon: "👥",
        files: [
            { name: "2241-Population.pdf", path: "Population/2241-Population.pdf" },
            { name: "Population Studies-2241.pdf", path: "Population/Population Studies-2241.pdf" }
        ]
    },
    {
        name: "Social Studies & Life Skill Education",
        icon: "🌍",
        files: [
            { name: "0061 Social Studies.pdf", path: "Social Studies & Life Skill Education/0061 Social Studies.pdf" },
            { name: "Social-0061.pdf", path: "Social Studies & Life Skill Education/Social-0061.pdf" }
        ]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderSubjects(subjectsData);
    updateStats();
    setupSearch();
});

// Render all subjects
function renderSubjects(subjects) {
    const container = document.getElementById('subjectsContainer');
    
    if (subjects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-text">No subjects found matching your search.</div>
            </div>
        `;
        return;
    }

    container.innerHTML = subjects.map(subject => `
        <div class="subject-card">
            <div class="subject-header">
                <span class="subject-icon">${subject.icon}</span>
                <h2 class="subject-title">${subject.name}</h2>
            </div>
            <div class="pdf-files">
                ${subject.files.map(file => `
                    <div class="pdf-item">
                        <div class="pdf-name">
                            <span class="pdf-icon">📄</span>
                            <span>${file.name}</span>
                        </div>
                        <a href="${file.path}" class="download-btn" download="${file.name}">
                            <span>⬇️</span>
                            Download
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    const totalSubjects = subjectsData.length;
    const totalFiles = subjectsData.reduce((sum, subject) => sum + subject.files.length, 0);
    
    document.getElementById('totalSubjects').textContent = totalSubjects;
    document.getElementById('totalFiles').textContent = totalFiles;
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderSubjects(subjectsData);
            return;
        }
        
        const filteredSubjects = subjectsData.map(subject => {
            // Check if subject name matches
            const subjectMatches = subject.name.toLowerCase().includes(searchTerm);
            
            // Filter files that match
            const matchingFiles = subject.files.filter(file => 
                file.name.toLowerCase().includes(searchTerm)
            );
            
            // Include subject if name matches or has matching files
            if (subjectMatches || matchingFiles.length > 0) {
                return {
                    ...subject,
                    files: subjectMatches ? subject.files : matchingFiles
                };
            }
            
            return null;
        }).filter(subject => subject !== null && subject.files.length > 0);
        
        renderSubjects(filteredSubjects);
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

