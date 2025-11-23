// Main Application Logic for Academic Prompt Generator

class PromptGenerator {
    constructor() {
        this.currentStep = 0; // 0 = welcome screen
        this.totalSteps = promptSteps.length;
        this.selections = {};
        this.init();
    }

    init() {
        this.attachInitialListeners();
        this.renderStepIndicators();
        this.updateHeaderStats();
        this.initTheme();
        this.initSaveLoad();
    }

    attachInitialListeners() {
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startJourney());
        }

        document.getElementById('prevBtn').addEventListener('click', () => this.prevStep());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('generateBtn').addEventListener('click', () => this.generatePrompt());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadPrompt());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('saveLoadBtn').addEventListener('click', () => this.openSaveLoadModal());
    }

    startJourney() {
        this.currentStep = 1;
        document.getElementById('navigation').style.display = 'flex';
        this.renderStep();
        this.updateProgress();
        this.updateButtons();
    }

    renderStepIndicators() {
        const container = document.getElementById('stepIndicators');
        container.innerHTML = '';

        promptSteps.forEach((step, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'step-indicator';
            indicator.textContent = `${index + 1}. ${step.title}`;
            indicator.dataset.step = index + 1;
            container.appendChild(indicator);
        });
    }

    updateStepIndicators() {
        const indicators = document.querySelectorAll('.step-indicator');
        indicators.forEach((indicator, index) => {
            const stepNum = index + 1;
            indicator.classList.remove('active', 'completed');

            if (stepNum < this.currentStep) {
                indicator.classList.add('completed');
            } else if (stepNum === this.currentStep) {
                indicator.classList.add('active');
            }
        });
    }

    renderStep() {
        if (this.currentStep === 0 || this.currentStep > this.totalSteps) {
            return;
        }

        const step = promptSteps[this.currentStep - 1];
        const mainContent = document.getElementById('mainContent');

        let html = `
            <div class="step-content">
                <h2>Step ${step.id}: ${step.title}</h2>
                <p class="step-description">${step.description}</p>
                <div class="options-grid">
        `;

        step.options.forEach(option => {
            const isSelected = this.selections[step.id] === option.value;
            html += `
                <div class="option-card ${isSelected ? 'selected' : ''}"
                     data-step="${step.id}"
                     data-value="${option.value}">
                    <h3>${option.label}</h3>
                    <p>${option.description}</p>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        mainContent.innerHTML = html;
        this.attachOptionListeners();
        this.updateStepIndicators();

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    attachOptionListeners() {
        const cards = document.querySelectorAll('.option-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const step = parseInt(card.dataset.step);
                const value = card.dataset.value;

                // Remove selection from siblings
                document.querySelectorAll(`[data-step="${step}"]`).forEach(c => {
                    c.classList.remove('selected');
                });

                // Mark this as selected
                card.classList.add('selected');

                // Store selection
                this.selections[step] = value;

                // Update UI
                this.updateHeaderStats();
                this.updateButtons();

                // Add subtle animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            });
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.renderStep();
            this.updateProgress();
            this.updateButtons();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.renderStep();
            this.updateProgress();
            this.updateButtons();
        }
    }

    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('progressPercentage').textContent = `${Math.round(progress)}%`;

        const step = promptSteps[this.currentStep - 1];
        if (step) {
            document.getElementById('progressTitle').textContent = `Step ${this.currentStep}: ${step.title}`;
        }
    }

    updateButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const generateBtn = document.getElementById('generateBtn');

        prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-flex';

        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
            generateBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            generateBtn.style.display = 'none';
        }

        // Enable/disable next button based on selection
        const hasSelection = this.selections[this.currentStep] !== undefined;
        nextBtn.disabled = !hasSelection;
        generateBtn.disabled = !hasSelection;
    }

    updateHeaderStats() {
        const selectionCount = Object.keys(this.selections).length;
        document.getElementById('stepCount').textContent = this.currentStep;
        document.getElementById('selectionCount').textContent = `${selectionCount}/${this.totalSteps}`;
    }

    generatePrompt() {
        // Ensure all steps have selections
        const selectionCount = Object.keys(this.selections).length;
        if (selectionCount < this.totalSteps) {
            alert('Please complete all steps before generating your prompt.');
            return;
        }

        // Generate the prompt
        const generatedPrompt = promptTemplates.generatePrompt(this.selections);

        // Calculate stats
        const stats = promptTemplates.getPromptStats(generatedPrompt);

        // Display output
        this.displayOutput(generatedPrompt, stats);
    }

    displayOutput(prompt, stats) {
        // Hide main content and navigation
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('navigation').style.display = 'none';
        document.querySelector('.progress-section').style.display = 'none';

        // Show output section
        const outputSection = document.getElementById('outputSection');
        outputSection.style.display = 'block';

        // Set prompt text
        document.getElementById('promptOutput').textContent = prompt;

        // Set stats
        document.getElementById('wordCount').textContent = stats.wordCount.toLocaleString();
        document.getElementById('charCount').textContent = stats.charCount.toLocaleString();
        document.getElementById('componentCount').textContent = stats.componentCount;

        // Store prompt for later use
        this.generatedPrompt = prompt;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Add celebration animation
        this.celebrateGeneration();
    }

    celebrateGeneration() {
        // Simple confetti effect or animation could go here
        const header = document.querySelector('.output-header h2');
        if (header) {
            header.style.animation = 'fadeInUp 0.6s ease';
        }
    }

    copyToClipboard() {
        const promptText = this.generatedPrompt;

        navigator.clipboard.writeText(promptText).then(() => {
            const btn = document.getElementById('copyBtn');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Copied!
            `;

            btn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        }).catch(err => {
            alert('Failed to copy to clipboard. Please copy manually.');
            console.error('Copy failed:', err);
        });
    }

    downloadPrompt() {
        const promptText = this.generatedPrompt;
        const blob = new Blob([promptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'academic-prompt-' + new Date().toISOString().split('T')[0] + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Provide feedback
        const btn = document.getElementById('downloadBtn');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Downloaded!
        `;

        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    }

    reset() {
        // Confirm reset
        if (!confirm('Are you sure you want to start over? All selections will be lost.')) {
            return;
        }

        // Reset state
        this.currentStep = 0;
        this.selections = {};
        this.generatedPrompt = null;

        // Reset UI
        document.getElementById('mainContent').innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-icon">📝</div>
                <h2>Welcome to Academic Prompt Generator</h2>
                <p>Create customized, humanized writing prompts for academic work in just 9 simple steps.</p>
                <button class="btn btn-primary btn-large" id="startBtn">
                    Start Building Your Prompt
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🎯</div>
                        <h3>Purpose-Driven</h3>
                        <p>Choose from reflection, methodology, results, and more</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">✍️</div>
                        <h3>Humanized Writing</h3>
                        <p>15+ options for natural, authentic academic voice</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📚</div>
                        <h3>Citation Control</h3>
                        <p>APA, Harvard, Chicago, and custom formats</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h3>Instant Generation</h3>
                        <p>Copy-ready prompts in seconds</p>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('navigation').style.display = 'none';
        document.getElementById('outputSection').style.display = 'none';
        document.querySelector('.progress-section').style.display = 'block';

        // Re-attach start button listener
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startJourney());
        }

        // Reset progress
        document.getElementById('progressBar').style.width = '0%';
        document.getElementById('progressPercentage').textContent = '0%';
        document.getElementById('progressTitle').textContent = 'Getting Started';

        // Reset header stats
        this.updateHeaderStats();

        // Reset step indicators
        this.renderStepIndicators();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== THEME MANAGEMENT =====
    initTheme() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            this.updateThemeIcon(true);
        }
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateThemeIcon(isDark);
    }

    updateThemeIcon(isDark) {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');

        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // ===== SAVE/LOAD CONFIGURATION =====
    initSaveLoad() {
        this.savedConfigs = JSON.parse(localStorage.getItem('savedConfigs') || '[]');
    }

    openSaveLoadModal() {
        const modal = document.getElementById('saveLoadModal');
        modal.innerHTML = this.renderSaveLoadModal();
        modal.style.display = 'block';
        this.attachModalListeners();
    }

    renderSaveLoadModal() {
        const hasCurrentConfig = Object.keys(this.selections).length > 0;

        return `
            <div class="modal-overlay" id="modalOverlay">
                <div class="modal">
                    <div class="modal-header">
                        <h2>💾 Save & Load Configurations</h2>
                        <button class="modal-close" id="modalClose">×</button>
                    </div>
                    <div class="modal-body">
                        ${hasCurrentConfig ? `
                            <div class="modal-section">
                                <h3>Save Current Configuration</h3>
                                <p>Save your current selections to load them later.</p>
                                <div style="display: flex; gap: 8px;">
                                    <input type="text" id="configName" placeholder="Configuration name..." style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: var(--radius-sm); font-family: 'Inter', sans-serif; color: var(--text-primary); background: var(--bg-light);">
                                    <button class="btn btn-primary" id="saveConfigBtn">Save</button>
                                </div>
                            </div>
                        ` : ''}

                        <div class="modal-section">
                            <h3>Saved Configurations</h3>
                            ${this.renderSavedConfigs()}
                        </div>

                        <div class="modal-section">
                            <h3>Quick Start Presets</h3>
                            <p>Load a preset configuration to get started quickly.</p>
                            ${this.renderPresets()}
                        </div>

                        <div class="modal-section">
                            <h3>Import / Export</h3>
                            <p>Share configurations by exporting to JSON or importing from a file.</p>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${hasCurrentConfig ? '<button class="btn btn-secondary" id="exportConfigBtn">📤 Export Current</button>' : ''}
                                <button class="btn btn-secondary" id="importConfigBtn">📥 Import from File</button>
                                <input type="file" id="importFileInput" accept=".json" style="display: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSavedConfigs() {
        if (this.savedConfigs.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-state-icon">📂</div>
                    <p>No saved configurations yet. Save your current selections above!</p>
                </div>
            `;
        }

        return `
            <div class="config-list">
                ${this.savedConfigs.map((config, index) => `
                    <div class="config-item">
                        <div class="config-info">
                            <h4>${config.name}</h4>
                            <p>Saved ${new Date(config.timestamp).toLocaleDateString()}</p>
                        </div>
                        <div class="config-actions">
                            <button class="config-load" data-index="${index}">Load</button>
                            <button class="config-delete" data-index="${index}">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderPresets() {
        const presets = [
            {
                name: 'Graduate Thesis',
                icon: '🎓',
                description: 'Formal academic writing for dissertations',
                config: {
                    1: 'lit_review_thematic',
                    2: 'phd_candidate',
                    3: 'high_natural',
                    4: 'apa_standard',
                    5: 'thesis_driven',
                    6: 'high_dissertation',
                    7: 'formal_standard',
                    8: 'standard_sections',
                    9: 'research_gaps'
                }
            },
            {
                name: 'ESL Student Essay',
                icon: '✍️',
                description: 'Natural, humanized academic writing',
                config: {
                    1: 'argumentative',
                    2: 'international_grad',
                    3: 'max_esl',
                    4: 'apa_standard',
                    5: 'progressive',
                    6: 'strong_graduate',
                    7: 'esl_formal',
                    8: 'standard_sections',
                    9: 'none'
                }
            },
            {
                name: 'Reflection Paper',
                icon: '🔍',
                description: 'Personal academic reflection',
                config: {
                    1: 'reflection',
                    2: 'reflective_practitioner',
                    3: 'personal_voice',
                    4: 'apa_standard',
                    5: 'question_driven',
                    6: 'moderate_undergrad',
                    7: 'readable_academic',
                    8: 'reflective_5r',
                    9: 'none'
                }
            },
            {
                name: 'Research Proposal',
                icon: '📊',
                description: 'Rigorous research planning document',
                config: {
                    1: 'research_proposal',
                    2: 'research_scholar',
                    3: 'subtle_polished',
                    4: 'apa_heavy',
                    5: 'problem_solution',
                    6: 'maximum_research',
                    7: 'formal_standard',
                    8: 'standard_sections',
                    9: 'methodological_focus'
                }
            }
        ];

        return `
            <div class="preset-grid">
                ${presets.map((preset, index) => `
                    <div class="preset-card" data-preset="${index}">
                        <div class="preset-icon">${preset.icon}</div>
                        <h4>${preset.name}</h4>
                        <p>${preset.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    attachModalListeners() {
        // Close modal
        const closeBtn = document.getElementById('modalClose');
        const overlay = document.getElementById('modalOverlay');

        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal();
        });

        // Save config
        const saveBtn = document.getElementById('saveConfigBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveCurrentConfig());
        }

        // Load configs
        document.querySelectorAll('.config-load').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.loadConfig(index);
            });
        });

        // Delete configs
        document.querySelectorAll('.config-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.deleteConfig(index);
            });
        });

        // Load presets
        document.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.preset);
                this.loadPreset(index);
            });
        });

        // Export config
        const exportBtn = document.getElementById('exportConfigBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportConfig());
        }

        // Import config
        const importBtn = document.getElementById('importConfigBtn');
        const fileInput = document.getElementById('importFileInput');

        if (importBtn) {
            importBtn.addEventListener('click', () => fileInput.click());
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.importConfig(e));
        }
    }

    saveCurrentConfig() {
        const nameInput = document.getElementById('configName');
        const name = nameInput.value.trim();

        if (!name) {
            alert('Please enter a name for this configuration.');
            return;
        }

        const config = {
            name: name,
            selections: this.selections,
            timestamp: new Date().toISOString()
        };

        this.savedConfigs.push(config);
        localStorage.setItem('savedConfigs', JSON.stringify(this.savedConfigs));

        // Refresh modal
        this.openSaveLoadModal();
    }

    loadConfig(index) {
        const config = this.savedConfigs[index];
        this.selections = { ...config.selections };
        this.closeModal();

        // Navigate to first step if not there already
        if (this.currentStep === 0) {
            this.startJourney();
        } else {
            this.renderStep();
            this.updateHeaderStats();
            this.updateButtons();
        }

        alert(`Configuration "${config.name}" loaded successfully!`);
    }

    deleteConfig(index) {
        const config = this.savedConfigs[index];
        if (confirm(`Delete configuration "${config.name}"?`)) {
            this.savedConfigs.splice(index, 1);
            localStorage.setItem('savedConfigs', JSON.stringify(this.savedConfigs));
            this.openSaveLoadModal();
        }
    }

    loadPreset(index) {
        const presets = [
            {
                name: 'Graduate Thesis',
                config: {
                    1: 'lit_review_thematic',
                    2: 'phd_candidate',
                    3: 'high_natural',
                    4: 'apa_standard',
                    5: 'thesis_driven',
                    6: 'high_dissertation',
                    7: 'formal_standard',
                    8: 'standard_sections',
                    9: 'research_gaps'
                }
            },
            {
                name: 'ESL Student Essay',
                config: {
                    1: 'argumentative',
                    2: 'international_grad',
                    3: 'max_esl',
                    4: 'apa_standard',
                    5: 'progressive',
                    6: 'strong_graduate',
                    7: 'esl_formal',
                    8: 'standard_sections',
                    9: 'none'
                }
            },
            {
                name: 'Reflection Paper',
                config: {
                    1: 'reflection',
                    2: 'reflective_practitioner',
                    3: 'personal_voice',
                    4: 'apa_standard',
                    5: 'question_driven',
                    6: 'moderate_undergrad',
                    7: 'readable_academic',
                    8: 'reflective_5r',
                    9: 'none'
                }
            },
            {
                name: 'Research Proposal',
                config: {
                    1: 'research_proposal',
                    2: 'research_scholar',
                    3: 'subtle_polished',
                    4: 'apa_heavy',
                    5: 'problem_solution',
                    6: 'maximum_research',
                    7: 'formal_standard',
                    8: 'standard_sections',
                    9: 'methodological_focus'
                }
            }
        ];

        const preset = presets[index];
        this.selections = { ...preset.config };
        this.closeModal();

        // Navigate to first step
        if (this.currentStep === 0) {
            this.startJourney();
        } else {
            this.renderStep();
            this.updateHeaderStats();
            this.updateButtons();
        }

        alert(`Preset "${preset.name}" loaded! You can review and modify selections.`);
    }

    exportConfig() {
        const config = {
            name: "Exported Configuration",
            selections: this.selections,
            timestamp: new Date().toISOString(),
            version: "1.0"
        };

        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `prompt-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Configuration exported successfully!');
    }

    importConfig(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);

                if (!config.selections) {
                    throw new Error('Invalid configuration file');
                }

                this.selections = { ...config.selections };
                this.closeModal();

                if (this.currentStep === 0) {
                    this.startJourney();
                } else {
                    this.renderStep();
                    this.updateHeaderStats();
                    this.updateButtons();
                }

                alert('Configuration imported successfully!');
            } catch (error) {
                alert('Error importing configuration: ' + error.message);
            }
        };

        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    closeModal() {
        const modal = document.getElementById('saveLoadModal');
        modal.style.display = 'none';
        modal.innerHTML = '';
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.promptGenerator = new PromptGenerator();
});
