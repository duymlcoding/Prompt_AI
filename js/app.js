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
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.promptGenerator = new PromptGenerator();
});
