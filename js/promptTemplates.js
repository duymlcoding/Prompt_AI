// Prompt Templates - Base template and assembly logic

const promptTemplates = {
    // Base template with placeholders
    baseTemplate: `[ROLE]
{{ROLE}}

[WRITING TYPE]
{{WRITING_TYPE}}

[INPUTS YOU WILL RECEIVE]
1) An outline or idea
2) Optional sources (readings, annotated bibliographies, datasets)
Do not search the web. Cite only sources the user supplies. If a claim needs evidence and no source is provided, state that evidence would be needed rather than inventing a reference.

[CONTENT DEVELOPMENT]
{{CONTENT_DEVELOPMENT}}

[ACADEMIC RIGOR]
{{ACADEMIC_RIGOR}}

[CITATIONS AND REFERENCES]
{{CITATIONS}}

[WRITING STYLE CONTROLS]
{{STYLE_CONTROLS}}

[HUMANIZATION]
{{HUMANIZATION}}

[STRUCTURE AND HEADINGS]
{{STRUCTURE}}

[SPECIAL REQUIREMENTS]
{{SPECIAL_REQUIREMENTS}}

[BANNED WORDS/PHRASES]
Do not use: delineate, embark on, explore, master the art of, unlock the power of, navigate, uncover, delve into, aesthetic, artistic exploration, rich tapestry, captivating, compelling, this article serves as, aims to provide, explore the realm/world of, within the confines of this article, serves as your compass/roadmap, important to note, stands out as, testament to, navigate a complex, unravel mysteries, traverse diverse, technological marvel, in conclusion, to summarize, our journey promises, this guide is your companion, elevate, facets of our lives, navigate uncharted waters, converge to forge/carve a path, burgeon, delve, embark.

[FINAL OUTPUT]
Produce a cohesive piece with appropriate headings. Ensure every sentence advances the argument or improves clarity. Keep a professional academic register while sounding human and engaged.`,

    // Mapping of step IDs to template placeholders
    stepMapping: {
        1: 'WRITING_TYPE',
        2: 'ROLE',
        3: 'HUMANIZATION',
        4: 'CITATIONS',
        5: 'CONTENT_DEVELOPMENT',
        6: 'ACADEMIC_RIGOR',
        7: 'STYLE_CONTROLS',
        8: 'STRUCTURE',
        9: 'SPECIAL_REQUIREMENTS'
    },

    // Generate the final prompt based on user selections
    generatePrompt: function(selections) {
        let template = this.baseTemplate;
        let placeholders = {
            WRITING_TYPE: '',
            ROLE: '',
            HUMANIZATION: '',
            CITATIONS: '',
            CONTENT_DEVELOPMENT: '',
            ACADEMIC_RIGOR: '',
            STYLE_CONTROLS: '',
            STRUCTURE: '',
            SPECIAL_REQUIREMENTS: ''
        };

        // Populate placeholders based on selections
        promptSteps.forEach(step => {
            const selectedValue = selections[step.id];
            const selectedOption = step.options.find(opt => opt.value === selectedValue);

            if (selectedOption && selectedOption.promptFragment) {
                const placeholderKey = this.stepMapping[step.id];
                if (placeholderKey) {
                    placeholders[placeholderKey] = selectedOption.promptFragment;
                }
            }
        });

        // Replace all placeholders in template
        Object.keys(placeholders).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, placeholders[key]);
        });

        // Clean up any empty sections (if special requirements is empty)
        template = template.replace(/\[SPECIAL REQUIREMENTS\]\s*\n\n/g, '');

        return template.trim();
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
