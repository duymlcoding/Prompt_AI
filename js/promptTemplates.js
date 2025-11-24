// Prompt Templates - Base template and assembly logic

const promptTemplates = {
    // Generate the final prompt based on user selections
    generatePrompt: function(selections) {
        let promptParts = [];

        // Process each step and its sections
        promptSteps.forEach(step => {
            const stepSelections = selections[step.id] || {};

            step.sections.forEach(section => {
                // Get section title and content
                let sectionContent = this.getSectionContent(section, stepSelections[section.id]);

                if (sectionContent) {
                    promptParts.push({
                        title: section.componentTarget || section.title.toUpperCase().replace(/ & /g, ' AND '),
                        content: sectionContent
                    });
                }
            });
        });

        // Build the final prompt
        return this.buildFinalPrompt(promptParts);
    },

    getSectionContent: function(section, selectionValue) {
        if (section.type === 'fixed') {
            // Fixed sections - combine rules and banned phrases
            return this.getFixedSectionContent(section);
        } else if (section.type === 'range') {
            // Range slider - replace {VALUE} placeholder with actual value
            return this.getRangeContent(section, selectionValue);
        } else if (section.type === 'multi') {
            // Multi-select - combine multiple selected options
            return this.getMultiSelectContent(section, selectionValue);
        } else {
            // Single-select - find the selected option
            return this.getSingleSelectContent(section, selectionValue);
        }
    },

    getRangeContent: function(section, selectedValue) {
        if (selectedValue === undefined || selectedValue === null) {
            return '';
        }

        // Replace {VALUE} placeholder with actual value
        return section.promptFragment.replace(/{VALUE}/g, selectedValue);
    },

    getFixedSectionContent: function(section) {
        let content = [];

        if (section.rules) {
            content.push(...section.rules);
        }

        if (section.bannedPhrases) {
            content.push(`\nAVOID these AI-common phrases: ${section.bannedPhrases.join(', ')}`);
        }

        return content.join('\n');
    },

    getMultiSelectContent: function(section, selectedValues) {
        if (!selectedValues || selectedValues.length === 0) {
            return '';
        }

        let fragments = [];
        selectedValues.forEach(value => {
            const option = section.options.find(opt => opt.value === value);
            if (option && option.promptFragment) {
                fragments.push(option.promptFragment);
            }
        });

        return fragments.join('\n\n');
    },

    getSingleSelectContent: function(section, selectedValue) {
        if (!selectedValue) {
            return '';
        }

        // Handle grouped-single sections (with subsections)
        if (section.subsections) {
            for (const subsection of section.subsections) {
                const option = subsection.options.find(opt => opt.value === selectedValue);
                if (option) {
                    return option.promptFragment;
                }
            }
            return '';
        }

        // Handle regular single-select sections
        const option = section.options.find(opt => opt.value === selectedValue);
        return option ? option.promptFragment : '';
    },

    buildFinalPrompt: function(promptParts) {
        let prompt = '';

        // Group sections by their component targets for better organization
        const sectionGroups = this.groupSections(promptParts);

        // Build each section
        Object.keys(sectionGroups).forEach(title => {
            const content = sectionGroups[title];
            if (content) {
                prompt += `[${title}]\n${content}\n\n`;
            }
        });

        // Add final output instructions
        prompt += `[FINAL OUTPUT]\n`;
        prompt += `Produce a cohesive piece with appropriate headings. Ensure every sentence advances the argument or improves clarity. Keep a professional academic register while sounding human and engaged.\n`;
        prompt += `\nIMPORTANT: Follow ALL the requirements above, especially the writing style controls and banned phrases. Your writing should be indistinguishable from human academic writing.`;

        return prompt.trim();
    },

    groupSections: function(promptParts) {
        const grouped = {
            'WORD COUNT REQUIREMENT': '',
            'ROLE': '',
            'WRITING TYPE': '',
            'INPUTS YOU WILL RECEIVE': '',
            'SOURCE USAGE AND EVIDENCE': '',
            'CITATION FORMAT AND STYLE': '',
            'ACADEMIC RIGOR AND DEPTH': '',
            'WRITING STYLE CONTROLS': '',
            'HUMANIZATION FEATURES': '',
            'STRUCTURE AND ORGANIZATION': '',
            'ADDITIONAL FEATURES': ''
        };

        promptParts.forEach(part => {
            // Map section titles to grouped categories
            if (part.title.includes('WORD_COUNT') || part.title.includes('WORD COUNT')) {
                grouped['WORD COUNT REQUIREMENT'] += (grouped['WORD COUNT REQUIREMENT'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('ROLE') || part.title.includes('WRITER')) {
                grouped['ROLE'] += (grouped['ROLE'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('WRITING TYPE') || part.title.includes('WRITING_TYPE')) {
                grouped['WRITING TYPE'] += (grouped['WRITING TYPE'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('INPUT')) {
                grouped['INPUTS YOU WILL RECEIVE'] += (grouped['INPUTS YOU WILL RECEIVE'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('SOURCE') || part.title.includes('EVIDENCE')) {
                grouped['SOURCE USAGE AND EVIDENCE'] += (grouped['SOURCE USAGE AND EVIDENCE'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('CITATION') || part.title.includes('QUOTATION')) {
                grouped['CITATION FORMAT AND STYLE'] += (grouped['CITATION FORMAT AND STYLE'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('QUALITY') || part.title.includes('DEPTH') || part.title.includes('RIGOR')) {
                grouped['ACADEMIC RIGOR AND DEPTH'] += (grouped['ACADEMIC RIGOR AND DEPTH'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('STYLE') || part.title.includes('CORE')) {
                grouped['WRITING STYLE CONTROLS'] += (grouped['WRITING STYLE CONTROLS'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('HUMANIZATION') || part.title.includes('BANNED')) {
                grouped['HUMANIZATION FEATURES'] += (grouped['HUMANIZATION FEATURES'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('ORGANIZATION') || part.title.includes('STRUCTURE')) {
                grouped['STRUCTURE AND ORGANIZATION'] += (grouped['STRUCTURE AND ORGANIZATION'] ? '\n\n' : '') + part.content;
            } else if (part.title.includes('ADDITIONAL') || part.title.includes('FEATURES')) {
                grouped['ADDITIONAL FEATURES'] += (grouped['ADDITIONAL FEATURES'] ? '\n\n' : '') + part.content;
            } else {
                // Fallback: use the part title as-is
                if (!grouped[part.title]) {
                    grouped[part.title] = '';
                }
                grouped[part.title] += (grouped[part.title] ? '\n\n' : '') + part.content;
            }
        });

        // Remove empty sections
        Object.keys(grouped).forEach(key => {
            if (!grouped[key] || grouped[key].trim() === '') {
                delete grouped[key];
            }
        });

        return grouped;
    },

    // Calculate statistics about the generated prompt
    getPromptStats: function(promptText) {
        const words = promptText.trim().split(/\s+/).length;
        const characters = promptText.length;
        const sections = (promptText.match(/\[.*?\]/g) || []).length;

        return {
            wordCount: words,
            charCount: characters,
            componentCount: sections
        };
    }
};
