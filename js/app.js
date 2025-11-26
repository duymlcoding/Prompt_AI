// Main Application Logic for Academic Prompt Generator

class PromptGenerator {
    constructor() {
        this.currentStep = 0; // 0 = welcome screen
        this.totalSteps = promptSteps.length;
        this.selections = {}; // Format: { stepId: { sectionId: value or [values] } }
        this.init();
    }

    init() {
        this.attachInitialListeners();
        this.renderStepIndicators();
        this.updateHeaderStats();
        this.initTheme();
        this.initSaveLoad();
        this.renderWelcomePresets();
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
            indicator.style.cursor = 'pointer';

            // Add click handler for navigation
            indicator.addEventListener('click', () => {
                if (this.currentStep > 0) {  // Only allow navigation after starting
                    this.navigateToStep(index + 1);
                }
            });

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

        // Initialize selections for this step if not exists
        if (!this.selections[step.id]) {
            this.selections[step.id] = {};
        }

        // Auto-initialize range sliders with default values
        step.sections.forEach(section => {
            if (section.type === 'range' && this.selections[step.id][section.id] === undefined) {
                this.selections[step.id][section.id] = section.default || section.min;
            }
        });

        let html = `
            <div class="step-content">
                <h2>Step ${step.id}: ${step.title}</h2>
                <p class="step-description">${step.description}</p>
        `;

        // Render each section within the step
        step.sections.forEach(section => {
            html += this.renderSection(step.id, section);
        });

        html += `</div>`;

        mainContent.innerHTML = html;
        this.attachOptionListeners();
        this.updateStepIndicators();

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderSection(stepId, section) {
        let html = `
            <div class="section-container" data-section="${section.id}">
                <div class="section-header">
                    <h3>${section.title}</h3>
                    ${section.required ? '<span class="required-badge">Required</span>' : ''}
                </div>
        `;

        // Filter options based on previous selections
        const filteredSection = this.filterSectionOptions(section);

        if (section.type === 'fixed') {
            // Fixed sections - display as informational, always applied
            html += this.renderFixedSection(section);
        } else if (section.type === 'range') {
            // Range slider
            html += this.renderRangeSlider(stepId, section);
        } else if (section.type === 'grouped-single') {
            // Single-select with subsections (like writing_type)
            html += this.renderGroupedSingleSelect(stepId, filteredSection);
        } else if (section.type === 'multi') {
            // Check if it has subsections
            if (section.subsections) {
                html += this.renderGroupedMultiSelect(stepId, filteredSection);
            } else {
                html += this.renderMultiSelect(stepId, filteredSection);

                // Add stealth dashboard for humanization section
                if (section.id === 'humanization_markers') {
                    html += this.renderStealthDashboard(stepId);
                }
            }
        } else {
            // Single-select - radio buttons (styled as cards)
            html += this.renderSingleSelect(stepId, filteredSection);
        }

        html += `</div>`;
        return html;
    }

    filterSectionOptions(section) {
        // Create a copy of the section to avoid modifying the original
        const filteredSection = { ...section };

        if (!section.options && !section.subsections) {
            return filteredSection;
        }

        // Get previous selections
        const writingType = this.selections[1]?.writing_type;
        const writerRole = this.selections[1]?.writer_role;
        const writerVoice = this.selections[1]?.writer_voice;

        // Define comprehensive filtering rules based on writing type
        const filteringRules = {
            // REFLECTION ESSAY - Personal, introspective writing
            'reflection': {
                hideInSections: {
                    'evidence_handling': ['hedge_appropriately', 'address_alternative_interpretations'],
                    'rigor_requirements': ['show_methodological_awareness', 'identify_research_gaps', 'engage_counterarguments'],
                    'special_elements': ['methodological_reflection', 'interdisciplinary_connections']
                }
            },
            // METHODOLOGY SECTION - Detailed, objective methods description
            'methodology': {
                hideInSections: {
                    'humanization_markers': ['contextual_informality', 'first_person_appropriate'],
                    'special_elements': ['emphasize_gaps']
                }
            },
            // RESULTS SECTION - Objective data presentation
            'results': {
                hideInSections: {
                    'evidence_handling': ['address_alternative_interpretations'],
                    'humanization_markers': ['first_person_appropriate', 'contextual_informality', 'meta_cognitive_markers'],
                    'special_elements': ['historical_context', 'ethical_dimensions', 'practical_implications']
                }
            },
            // DISCUSSION SECTION - Interpretation and implications
            'discussion': {
                hideInSections: {
                    // Discussion needs most options, only hide a few
                    'document_structure': ['reflective_5r']
                }
            },
            // LITERATURE REVIEW (Both types) - Synthesis and analysis
            'lit_review_thematic': {
                hideInSections: {
                    'humanization_markers': ['first_person_appropriate'],
                    'document_structure': ['reflective_5r', 'question_based'],
                    'special_elements': ['practical_implications']
                }
            },
            'lit_review_chronological': {
                hideInSections: {
                    'humanization_markers': ['first_person_appropriate'],
                    'document_structure': ['reflective_5r', 'question_based'],
                    'special_elements': ['practical_implications']
                }
            },
            // INTRODUCTION SECTION - Context and framing
            'introduction': {
                hideInSections: {
                    'special_elements': ['methodological_reflection']
                }
            },
            // ARGUMENTATIVE ESSAY - Position and evidence
            'argumentative': {
                hideInSections: {
                    'document_structure': ['reflective_5r'],
                    'special_elements': ['methodological_reflection']
                }
            },
            // CRITICAL ANALYSIS - Evaluation and critique
            'critical_analysis': {
                hideInSections: {
                    'document_structure': ['reflective_5r'],
                    'special_elements': ['practical_implications']
                }
            },
            // COMPARATIVE ANALYSIS - Systematic comparison
            'comparative': {
                hideInSections: {
                    'document_structure': ['reflective_5r', 'question_based']
                }
            },
            // CASE STUDY - In-depth examination
            'case_study': {
                hideInSections: {
                    'document_structure': ['reflective_5r']
                }
            },
            // RESEARCH PROPOSAL - Planning and justification
            'research_proposal': {
                hideInSections: {
                    // Research proposal needs most options
                    'document_structure': ['reflective_5r']
                }
            }
        };

        // Get the filtering rules for the current writing type
        const currentRules = writingType ? filteringRules[writingType] : null;

        // Determine which options to hide based on writing type
        let optionsToHide = [];
        if (currentRules && currentRules.hideInSections && currentRules.hideInSections[section.id]) {
            optionsToHide = currentRules.hideInSections[section.id];
        }

        // Apply filtering to options (for non-subsection sections)
        if (section.options && optionsToHide.length > 0) {
            filteredSection.options = section.options.filter(option =>
                !optionsToHide.includes(option.value)
            );
        }

        // Apply filtering to subsections (for grouped sections)
        if (section.subsections) {
            filteredSection.subsections = section.subsections.map(subsection => {
                if (optionsToHide.length > 0) {
                    return {
                        ...subsection,
                        options: subsection.options.filter(option =>
                            !optionsToHide.includes(option.value)
                        )
                    };
                }
                return subsection;
            }).filter(subsection => subsection.options.length > 0); // Remove empty subsections
        }

        return filteredSection;
    }

    renderFixedSection(section) {
        let html = `
            <div class="fixed-section">
        `;

        if (section.rules) {
            html += `<ul class="fixed-rules-list">`;
            section.rules.forEach(rule => {
                html += `<li>${rule}</li>`;
            });
            html += `</ul>`;
        }

        if (section.bannedPhrases) {
            html += `
                <div class="banned-words-container">
                    <p class="banned-words-title">Banned AI-Common Phrases (${section.bannedPhrases.length} phrases):</p>
                    <div class="banned-words-grid">
                        ${section.bannedPhrases.slice(0, 30).map(phrase =>
                            `<span class="banned-word">${phrase}</span>`
                        ).join('')}
                        ${section.bannedPhrases.length > 30 ?
                            `<span class="banned-word-more">+${section.bannedPhrases.length - 30} more...</span>`
                            : ''}
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    }

    renderRangeSlider(stepId, section) {
        const currentValue = this.selections[stepId]?.[section.id] || section.default || section.min;
        const showBudgetBar = section.showBudgetBar;
        const writingScope = this.selections[stepId]?.writing_scope;

        let html = `
            <div class="range-slider-container">
                <div class="range-value-display">
                    <span class="range-current-value" id="range-${stepId}-${section.id}">${currentValue}</span>
                    <span class="range-label">words</span>
                </div>
                <input type="range"
                       class="range-slider"
                       id="slider-${stepId}-${section.id}"
                       data-step="${stepId}"
                       data-section="${section.id}"
                       min="${section.min}"
                       max="${section.max}"
                       step="${section.step}"
                       value="${currentValue}">
                <div class="range-labels">
                    <span>${section.min}</span>
                    <span>${section.max}</span>
                </div>
                ${showBudgetBar && writingScope ? this.renderBudgetBar(stepId, currentValue, writingScope) : ''}
            </div>
        `;

        return html;
    }

    renderBudgetBar(stepId, totalWords, scopeValue) {
        // Find the writing scope option
        const scopeSection = promptSteps[stepId - 1].sections.find(s => s.id === 'writing_scope');
        if (!scopeSection) return '';

        const scopeOption = scopeSection.options.find(o => o.value === scopeValue);
        if (!scopeOption || !scopeOption.budget) return '';

        const budget = scopeOption.budget;
        const sections = Object.keys(budget);

        let html = `
            <div class="budget-bar-container">
                <h5 class="budget-bar-title">📊 Word Budget Breakdown</h5>
                <div class="budget-bar">
        `;

        sections.forEach(sectionName => {
            const percentage = budget[sectionName];
            const words = Math.round((totalWords * percentage) / 100);

            html += `
                <div class="budget-segment" style="width: ${percentage}%" title="${sectionName}: ${words} words">
                    <span class="budget-label">${this.capitalize(sectionName)}</span>
                    <span class="budget-words">${words}w</span>
                </div>
            `;
        });

        html += `
                </div>
                <div class="budget-legend">
        `;

        sections.forEach(sectionName => {
            const percentage = budget[sectionName];
            const words = Math.round((totalWords * percentage) / 100);

            html += `
                <div class="budget-legend-item">
                    <span class="budget-dot"></span>
                    <span class="budget-legend-text">${this.capitalize(sectionName)}: ${words} words (${percentage}%)</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    renderStealthDashboard(stepId) {
        const humanizationSelections = this.selections[stepId]?.humanization_markers || [];
        const coreStyleSelections = this.selections[stepId]?.core_style_rules || [];

        // Calculate stealth score
        const stealthScore = this.calculateStealthScore(humanizationSelections, coreStyleSelections);
        const riskLevel = this.getRiskLevel(stealthScore);

        let html = `
            <div class="stealth-dashboard" id="stealthDashboard">
                <div class="stealth-header">
                    <h4>🛡️ AI Detection Stealth Analysis</h4>
                    <p class="stealth-subtitle">Real-time assessment of human-like writing patterns</p>
                </div>

                <div class="stealth-meter-container">
                    <div class="stealth-meter">
                        <div class="stealth-meter-fill ${riskLevel.class}" style="width: ${stealthScore}%">
                            <span class="stealth-score">${stealthScore}%</span>
                        </div>
                    </div>
                    <div class="stealth-labels">
                        <span>High Risk</span>
                        <span>Moderate</span>
                        <span>Low Risk</span>
                    </div>
                </div>

                <div class="stealth-status ${riskLevel.class}">
                    <div class="stealth-icon">${riskLevel.icon}</div>
                    <div class="stealth-status-content">
                        <h5>${riskLevel.title}</h5>
                        <p>${riskLevel.message}</p>
                    </div>
                </div>

                <div class="stealth-features">
                    <h5>Active Humanization Features (${humanizationSelections.length}/8)</h5>
                    <div class="stealth-feature-grid">
                        ${this.renderStealthFeatures(humanizationSelections)}
                    </div>
                </div>

                ${humanizationSelections.length < 3 ? `
                    <div class="stealth-recommendation">
                        <strong>💡 Tip:</strong> Select at least 3-4 humanization features for optimal stealth. Consider adding: ${this.getSuggestedFeatures(humanizationSelections).join(', ')}
                    </div>
                ` : ''}
            </div>
        `;

        return html;
    }

    calculateStealthScore(humanizationSelections, coreStyleSelections) {
        let score = 30; // Base score

        // Each humanization feature adds stealth
        const featureWeights = {
            'esl_patterns': 15,
            'rhythm_variation': 12,
            'subtle_imperfections': 18,
            'meta_cognitive_markers': 10,
            'contextual_informality': 8,
            'first_person_appropriate': 7,
            'honest_hedging': 10,
            'conversational_transitions': 10
        };

        humanizationSelections.forEach(feature => {
            score += featureWeights[feature] || 5;
        });

        // Core style rules also contribute
        score += coreStyleSelections.length * 2;

        // Cap at 95%
        return Math.min(95, score);
    }

    getRiskLevel(score) {
        if (score >= 70) {
            return {
                class: 'risk-low',
                icon: '✅',
                title: 'Low Detection Risk',
                message: 'Your writing will appear highly human-like. Excellent humanization configuration!'
            };
        } else if (score >= 50) {
            return {
                class: 'risk-moderate',
                icon: '⚠️',
                title: 'Moderate Detection Risk',
                message: 'Good humanization, but consider adding more features for better stealth.'
            };
        } else {
            return {
                class: 'risk-high',
                icon: '🚨',
                title: 'High Detection Risk',
                message: 'Limited humanization. Add more features to reduce AI detection probability.'
            };
        }
    }

    renderStealthFeatures(selectedFeatures) {
        const featureLabels = {
            'esl_patterns': { label: 'ESL Patterns', impact: 'High' },
            'rhythm_variation': { label: 'Rhythm Variation', impact: 'High' },
            'subtle_imperfections': { label: 'Natural Imperfections', impact: 'Very High' },
            'meta_cognitive_markers': { label: 'Thinking Markers', impact: 'Medium' },
            'contextual_informality': { label: 'Informal Touch', impact: 'Medium' },
            'first_person_appropriate': { label: 'First Person', impact: 'Medium' },
            'honest_hedging': { label: 'Hedging Language', impact: 'Medium' },
            'conversational_transitions': { label: 'Natural Transitions', impact: 'Medium' }
        };

        if (selectedFeatures.length === 0) {
            return '<p class="no-features">No humanization features selected yet</p>';
        }

        return selectedFeatures.map(feature => {
            const info = featureLabels[feature] || { label: feature, impact: 'Low' };
            return `
                <div class="stealth-feature-badge">
                    <span class="feature-name">${info.label}</span>
                    <span class="feature-impact impact-${info.impact.toLowerCase().replace(' ', '-')}">${info.impact}</span>
                </div>
            `;
        }).join('');
    }

    getSuggestedFeatures(currentSelections) {
        const allFeatures = [
            'Rhythm Variation',
            'Subtle Imperfections',
            'Meta-Cognitive Markers',
            'ESL Patterns'
        ];

        const suggestions = allFeatures.filter((f, i) => {
            const values = ['rhythm_variation', 'subtle_imperfections', 'meta_cognitive_markers', 'esl_patterns'];
            return !currentSelections.includes(values[i]);
        });

        return suggestions.slice(0, 2);
    }

    renderMultiSelect(stepId, section) {
        const selectedValues = this.selections[stepId]?.[section.id] || [];

        let html = `<div class="options-grid multi-select">`;

        section.options.forEach(option => {
            const isSelected = selectedValues.includes(option.value);
            const hasTooltip = option.helpText;
            const hasIcon = option.icon;
            const hasBestFor = option.bestFor;
            const isAdvanced = option.advanced;

            html += `
                <div class="option-card checkbox-card ${isSelected ? 'selected' : ''} ${isAdvanced ? 'advanced-option' : ''}"
                     data-step="${stepId}"
                     data-section="${section.id}"
                     data-value="${option.value}"
                     data-type="multi"
                     data-advanced="${isAdvanced || false}">
                    <div class="checkbox-indicator">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M5 10L8 13L15 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    ${hasIcon ? `<div class="option-icon-multi">${option.icon}</div>` : ''}
                    <div class="option-content">
                        <div class="option-header">
                            <h4>${option.label}${isAdvanced ? ' <span class="advanced-badge">Advanced</span>' : ''}</h4>
                            ${hasTooltip ? `
                                <button class="help-icon" data-tooltip="${this.escapeHtml(option.helpText)}" type="button">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M8 11.5V11M8 5C7.17157 5 6.5 5.67157 6.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                </button>
                            ` : ''}
                        </div>
                        ${hasBestFor ? `<div class="best-for-tag">Best for: ${option.bestFor}</div>` : ''}
                        <p>${option.description}</p>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }

    renderSingleSelect(stepId, section) {
        const selectedValue = this.selections[stepId]?.[section.id];

        let html = `<div class="options-grid single-select">`;

        section.options.forEach(option => {
            const isSelected = selectedValue === option.value;
            const hasTooltip = option.helpText;
            const hasIcon = option.icon;
            const hasBestFor = option.bestFor;

            html += `
                <div class="option-card ${isSelected ? 'selected' : ''}"
                     data-step="${stepId}"
                     data-section="${section.id}"
                     data-value="${option.value}"
                     data-type="single">
                    ${hasIcon ? `<div class="option-icon">${option.icon}</div>` : ''}
                    <div class="option-header">
                        <h4>${option.label}</h4>
                        ${hasTooltip ? `
                            <button class="help-icon" data-tooltip="${this.escapeHtml(option.helpText)}" type="button">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                                    <path d="M8 11.5V11M8 5C7.17157 5 6.5 5.67157 6.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                    ${hasBestFor ? `<div class="best-for-tag">Best for: ${option.bestFor}</div>` : ''}
                    <p>${option.description}</p>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }

    renderGroupedSingleSelect(stepId, section) {
        const selectedValue = this.selections[stepId]?.[section.id];
        let html = '';

        section.subsections.forEach(subsection => {
            html += `
                <div class="subsection-container">
                    <h4 class="subsection-title">${subsection.title}</h4>
                    <div class="options-grid single-select">
            `;

            subsection.options.forEach(option => {
                const isSelected = selectedValue === option.value;
                const hasTooltip = option.helpText;
                const hasIcon = option.icon;
                const hasBestFor = option.bestFor;

                html += `
                    <div class="option-card ${isSelected ? 'selected' : ''}"
                         data-step="${stepId}"
                         data-section="${section.id}"
                         data-value="${option.value}"
                         data-type="single">
                        ${hasIcon ? `<div class="option-icon">${option.icon}</div>` : ''}
                        <div class="option-header">
                            <h4>${option.label}</h4>
                            ${hasTooltip ? `
                                <button class="help-icon" data-tooltip="${this.escapeHtml(option.helpText)}" type="button">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M8 11.5V11M8 5C7.17157 5 6.5 5.67157 6.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                </button>
                            ` : ''}
                        </div>
                        ${hasBestFor ? `<div class="best-for-tag">Best for: ${option.bestFor}</div>` : ''}
                        <p>${option.description}</p>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        return html;
    }

    renderGroupedMultiSelect(stepId, section) {
        const selectedValues = this.selections[stepId]?.[section.id] || [];
        let html = '';

        section.subsections.forEach(subsection => {
            html += `
                <div class="subsection-container">
                    <h4 class="subsection-title">${subsection.title}</h4>
                    <div class="options-grid multi-select">
            `;

            subsection.options.forEach(option => {
                const isSelected = selectedValues.includes(option.value);
                html += `
                    <div class="option-card checkbox-card ${isSelected ? 'selected' : ''}"
                         data-step="${stepId}"
                         data-section="${section.id}"
                         data-value="${option.value}"
                         data-type="multi">
                        <div class="checkbox-indicator">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 10L8 13L15 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="option-content">
                            <h4>${option.label}</h4>
                            <p>${option.description}</p>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        return html;
    }

    attachOptionListeners() {
        // Handle option cards
        const cards = document.querySelectorAll('.option-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't toggle if clicking on help icon
                if (e.target.closest('.help-icon')) {
                    return;
                }

                const stepId = parseInt(card.dataset.step);
                const sectionId = card.dataset.section;
                const value = card.dataset.value;
                const type = card.dataset.type;

                if (type === 'multi') {
                    // Multi-select: toggle selection
                    if (!this.selections[stepId][sectionId]) {
                        this.selections[stepId][sectionId] = [];
                    }

                    const index = this.selections[stepId][sectionId].indexOf(value);
                    if (index > -1) {
                        // Deselect
                        this.selections[stepId][sectionId].splice(index, 1);
                        card.classList.remove('selected');
                    } else {
                        // Select
                        this.selections[stepId][sectionId].push(value);
                        card.classList.add('selected');
                    }
                } else {
                    // Single-select: replace selection
                    // Remove selection from siblings
                    document.querySelectorAll(`[data-step="${stepId}"][data-section="${sectionId}"]`).forEach(c => {
                        c.classList.remove('selected');
                    });

                    // Mark this as selected
                    card.classList.add('selected');

                    // Store selection
                    this.selections[stepId][sectionId] = value;
                }

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

        // Handle help icon tooltips
        this.attachTooltipListeners();

        // Handle range sliders
        const sliders = document.querySelectorAll('.range-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const stepId = parseInt(slider.dataset.step);
                const sectionId = slider.dataset.section;
                const value = parseInt(slider.value);

                // Update display
                const display = document.getElementById(`range-${stepId}-${sectionId}`);
                if (display) {
                    display.textContent = value;
                }

                // Store selection
                this.selections[stepId][sectionId] = value;

                // Update UI
                this.updateHeaderStats();
                this.updateButtons();
            });
        });
    }

    attachTooltipListeners() {
        const helpIcons = document.querySelectorAll('.help-icon');
        helpIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showTooltip(icon);
            });
        });
    }

    showTooltip(iconElement) {
        // Remove any existing tooltips
        document.querySelectorAll('.tooltip').forEach(t => t.remove());

        const tooltipText = iconElement.dataset.tooltip;
        if (!tooltipText) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);

        // Position the tooltip
        const iconRect = iconElement.getBoundingClientRect();
        tooltip.style.left = `${iconRect.left + iconRect.width / 2}px`;
        tooltip.style.top = `${iconRect.top - 10}px`;

        // Add click outside listener to close
        setTimeout(() => {
            const closeTooltip = (e) => {
                if (!tooltip.contains(e.target) && !iconElement.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            };
            document.addEventListener('click', closeTooltip);
        }, 100);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    navigateToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            this.currentStep = stepNumber;
            this.renderStep();
            this.updateProgress();
            this.updateButtons();
        }
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

        // Enable/disable buttons based on whether all required sections are filled
        const currentStepConfig = promptSteps[this.currentStep - 1];
        const hasAllRequiredSelections = this.validateStep(currentStepConfig);

        nextBtn.disabled = !hasAllRequiredSelections;
        generateBtn.disabled = !hasAllRequiredSelections;
    }

    validateStep(stepConfig) {
        const stepSelections = this.selections[stepConfig.id] || {};

        // Check all required sections
        for (const section of stepConfig.sections) {
            if (section.required) {
                const value = stepSelections[section.id];

                // For range, must have a value
                if (section.type === 'range' && (value === undefined || value === null)) {
                    return false;
                }

                // For single-select, must have a value
                if (section.type === 'single' && !value) {
                    return false;
                }

                // For multi-select, must have at least one selection
                if (section.type === 'multi' && (!value || value.length === 0)) {
                    return false;
                }
            }
        }

        return true;
    }

    updateHeaderStats() {
        // Count completed steps (all required sections filled)
        let completedSteps = 0;
        for (let i = 0; i < this.totalSteps; i++) {
            const step = promptSteps[i];
            if (this.validateStep(step)) {
                completedSteps++;
            }
        }

        document.getElementById('stepCount').textContent = this.currentStep;
        document.getElementById('selectionCount').textContent = `${completedSteps}/${this.totalSteps}`;
    }

    generatePrompt() {
        // Ensure all steps are completed
        const allCompleted = promptSteps.every(step => this.validateStep(step));

        if (!allCompleted) {
            alert('Please complete all required selections before generating your prompt.');
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
                <p>Create customized, humanized writing prompts for academic work in just 5 simple steps.</p>
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
                        <p>17+ humanization features for natural voice</p>
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
        const presets = this.getPresets();

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

    getPresets() {
        return [
            {
                name: 'Graduate Thesis',
                icon: '🎓',
                description: 'Formal academic writing for dissertations',
                config: {
                    1: {
                        writing_type: 'lit_review_thematic',
                        writer_role: 'phd_researcher'
                    },
                    2: {
                        input_type: 'outline_provided',
                        source_usage: ['provided_sources', 'verify_accuracy'],
                        evidence_claims: ['substantiate_claims', 'explain_relevance']
                    },
                    3: {
                        citation_format: 'apa_7th',
                        quotation_balance: 'balanced',
                        quality_depth: ['comprehensive_evidence', 'critical_evaluation', 'counterarguments']
                    },
                    4: {
                        humanization_features: ['rhythm_variation', 'subtle_imperfections']
                    },
                    5: {
                        organization: 'standard_academic',
                        additional_features: ['research_gaps', 'methodological_focus']
                    }
                }
            },
            {
                name: 'ESL Student Essay',
                icon: '✍️',
                description: 'Natural, humanized academic writing',
                config: {
                    1: {
                        writing_type: 'argumentative',
                        writer_role: 'esl_student'
                    },
                    2: {
                        input_type: 'topic_only',
                        source_usage: ['never_fabricate', 'acknowledge_limits'],
                        evidence_claims: ['substantiate_claims', 'hedge_appropriately']
                    },
                    3: {
                        citation_format: 'apa_7th',
                        quotation_balance: 'paraphrase_heavy',
                        quality_depth: ['comprehensive_evidence']
                    },
                    4: {
                        humanization_features: ['esl_patterns', 'rhythm_variation', 'subtle_imperfections', 'personal_touch']
                    },
                    5: {
                        organization: 'standard_academic',
                        additional_features: []
                    }
                }
            },
            {
                name: 'Reflection Paper',
                icon: '🔍',
                description: 'Personal academic reflection',
                config: {
                    1: {
                        writing_type: 'reflection',
                        writer_role: 'reflective_practitioner'
                    },
                    2: {
                        input_type: 'topic_only',
                        source_usage: ['acknowledge_limits'],
                        evidence_claims: ['hedge_appropriately']
                    },
                    3: {
                        citation_format: 'apa_7th',
                        quotation_balance: 'minimal_quotes',
                        quality_depth: ['comprehensive_evidence']
                    },
                    4: {
                        humanization_features: ['personal_touch', 'rhythm_variation', 'authentic_voice']
                    },
                    5: {
                        organization: 'reflective_5r',
                        additional_features: []
                    }
                }
            },
            {
                name: 'Research Proposal',
                icon: '📊',
                description: 'Rigorous research planning document',
                config: {
                    1: {
                        writing_type: 'research_proposal',
                        writer_role: 'phd_researcher'
                    },
                    2: {
                        input_type: 'outline_provided',
                        source_usage: ['provided_sources', 'verify_accuracy'],
                        evidence_claims: ['substantiate_claims', 'explain_relevance', 'address_alternatives']
                    },
                    3: {
                        citation_format: 'apa_7th',
                        quotation_balance: 'quote_heavy',
                        quality_depth: ['comprehensive_evidence', 'critical_evaluation', 'counterarguments', 'methodological_awareness', 'research_gaps']
                    },
                    4: {
                        humanization_features: ['rhythm_variation', 'subtle_imperfections']
                    },
                    5: {
                        organization: 'problem_solution',
                        additional_features: ['methodological_focus', 'research_gaps']
                    }
                }
            }
        ];
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
        this.selections = JSON.parse(JSON.stringify(config.selections)); // Deep copy
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
        const presets = this.getPresets();
        const preset = presets[index];
        this.selections = JSON.parse(JSON.stringify(preset.config)); // Deep copy
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
            version: "2.0"
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

                this.selections = JSON.parse(JSON.stringify(config.selections)); // Deep copy
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

    renderWelcomePresets() {
        const presetsContainer = document.getElementById('welcomePresets');
        if (!presetsContainer) return;

        const presets = this.getPresets();

        presetsContainer.innerHTML = presets.map((preset, index) => `
            <div class="preset-welcome-card" data-preset-index="${index}">
                <div class="preset-welcome-icon">${preset.icon}</div>
                <h4>${preset.name}</h4>
                <p>${preset.description}</p>
                <button class="btn btn-secondary btn-small">Use Template</button>
            </div>
        `).join('');

        // Attach listeners
        document.querySelectorAll('.preset-welcome-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const index = parseInt(card.dataset.presetIndex);
                this.loadPreset(index);
            });
        });
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.promptGenerator = new PromptGenerator();
});
