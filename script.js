// Compulsory Subjects
const compulsorySubjects = [
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
        name: "Social Studies & Life Skill Education",
        icon: "🌍",
        files: [
            { name: "0061 Social Studies.pdf", path: "Social Studies & Life Skill Education/0061 Social Studies.pdf" },
            { name: "Social-0061.pdf", path: "Social Studies & Life Skill Education/Social-0061.pdf" }
        ]
    }
];

// Optional Subjects
const optionalSubjects = [
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
    }
];

// Combined subjects data for search functionality
const subjectsData = [...compulsorySubjects, ...optionalSubjects];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderSubjects(compulsorySubjects, optionalSubjects);
    updateStats();
    setupSearch();
});

// Render all subjects with sections
function renderSubjects(compulsory = [], optional = [], isSearchMode = false) {
    const container = document.getElementById('subjectsContainer');
    
    // If search mode, render all subjects together
    if (isSearchMode) {
        const allSubjects = [...compulsory, ...optional];
        if (allSubjects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-text">No subjects found matching your search.</div>
                </div>
            `;
            return;
        }
        container.innerHTML = allSubjects.map(subject => renderSubjectCard(subject)).join('');
        return;
    }
    
    // Normal mode: render with sections
    let html = '';
    
    // Compulsory Subjects Section
    if (compulsory.length > 0) {
        html += `
            <div class="subject-section">
                <h2 class="section-title">
                    <span class="section-icon">📋</span>
                    Compulsory Subjects
                </h2>
                <div class="section-subjects">
                    ${compulsory.map((subject, index) => `
                        <div class="subject-card numbered-card">
                            <div class="subject-number">${index + 1}.</div>
                            <div class="subject-content">
                                <div class="subject-header">
                                    <span class="subject-icon">${subject.icon}</span>
                                    <h3 class="subject-title">${subject.name}</h3>
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
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Optional Subjects Section
    if (optional.length > 0) {
        html += `
            <div class="subject-section">
                <h2 class="section-title">
                    <span class="section-icon">📚</span>
                    Optional Subjects
                </h2>
                <div class="section-subjects">
                    ${optional.map(subject => renderSubjectCard(subject)).join('')}
                </div>
            </div>
        `;
    }
    
    if (html === '') {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-text">No subjects found matching your search.</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = html;
}

// Render individual subject card
function renderSubjectCard(subject) {
    return `
        <div class="subject-card">
            <div class="subject-header">
                <span class="subject-icon">${subject.icon}</span>
                <h3 class="subject-title">${subject.name}</h3>
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
    `;
}

// Update statistics
function updateStats() {
    const totalSubjects = subjectsData.length;
    const totalFiles = subjectsData.reduce((sum, subject) => sum + subject.files.length, 0);
    
    document.getElementById('totalSubjects').textContent = totalSubjects;
    document.getElementById('totalFiles').textContent = totalFiles;
}

// Setup search functionality with instant results
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    // Real-time search on every keystroke
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim();
        
        // Show/hide clear button
        if (searchTerm.length > 0) {
            clearButton.style.display = 'flex';
        } else {
            clearButton.style.display = 'none';
        }
        
        // Instant search - no debouncing needed for better UX
        performSearch(searchTerm);
    });
    
    // Clear search functionality
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        clearButton.style.display = 'none';
        performSearch('');
    });
    
    // Also search on paste
    searchInput.addEventListener('paste', function(e) {
        setTimeout(() => {
            const searchTerm = e.target.value.trim();
            if (searchTerm.length > 0) {
                clearButton.style.display = 'flex';
            } else {
                clearButton.style.display = 'none';
            }
            performSearch(searchTerm);
        }, 10);
    });
    
    // Clear search with Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            clearButton.style.display = 'none';
            performSearch('');
        }
    });
}

// Perform the actual search
function performSearch(searchTerm) {
    if (searchTerm === '') {
        renderSubjects(compulsorySubjects, optionalSubjects, false);
        updateStats();
        return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
    
    // Filter compulsory subjects
    const filteredCompulsory = filterSubjects(compulsorySubjects, searchLower, searchWords);
    
    // Filter optional subjects
    const filteredOptional = filterSubjects(optionalSubjects, searchLower, searchWords);
    
    // Render in search mode (no sections)
    renderSubjects(filteredCompulsory, filteredOptional, true);
    
    // Update stats with filtered results
    const totalSubjects = filteredCompulsory.length + filteredOptional.length;
    const totalFiles = [...filteredCompulsory, ...filteredOptional].reduce((sum, subject) => sum + subject.files.length, 0);
    document.getElementById('totalSubjects').textContent = totalSubjects;
    document.getElementById('totalFiles').textContent = totalFiles;
}

// Helper function to filter subjects
function filterSubjects(subjects, searchLower, searchWords) {
    return subjects.map(subject => {
        const subjectNameLower = subject.name.toLowerCase();
        
        // Check if all search words match the subject name (for better partial matching)
        const subjectMatches = searchWords.every(word => 
            subjectNameLower.includes(word) || 
            subjectNameLower.split(/[\s&.,-]+/).some(part => part.startsWith(word))
        );
        
        // Also check if subject name starts with search term (priority matching)
        const startsWithMatch = subjectNameLower.startsWith(searchLower);
        
        // Check if any word in subject name starts with search term
        const wordStartsWithMatch = subjectNameLower.split(/[\s&.,-]+/).some(word => 
            word.startsWith(searchLower)
        );
        
        // Filter files that match
        const matchingFiles = subject.files.filter(file => {
            const fileNameLower = file.name.toLowerCase();
            return searchWords.some(word => fileNameLower.includes(word));
        });
        
        // Calculate match score for sorting (higher is better)
        let matchScore = 0;
        if (startsWithMatch) matchScore += 100;
        else if (wordStartsWithMatch) matchScore += 50;
        else if (subjectMatches) matchScore += 25;
        if (matchingFiles.length > 0) matchScore += 10;
        
        // Include subject if name matches or has matching files
        if (subjectMatches || startsWithMatch || wordStartsWithMatch || matchingFiles.length > 0) {
            return {
                ...subject,
                files: (subjectMatches || startsWithMatch || wordStartsWithMatch) ? subject.files : matchingFiles,
                matchScore: matchScore
            };
        }
        
        return null;
    })
    .filter(subject => subject !== null && subject.files.length > 0)
    .sort((a, b) => b.matchScore - a.matchScore); // Sort by relevance
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

