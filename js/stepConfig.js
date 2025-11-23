// Step Configuration for Academic Prompt Generator
// Each step contains options that populate specific parts of the final prompt

const promptSteps = [
    {
        id: 1,
        title: "Writing Purpose",
        description: "Select the type of academic writing you need",
        componentTarget: "WRITING_TYPE",
        options: [
            {
                value: "reflection",
                label: "Reflection Essay",
                description: "Personal academic reflection on learning/experience",
                promptFragment: "This is a reflective essay examining personal learning and professional development."
            },
            {
                value: "methodology",
                label: "Methodology Section",
                description: "Research methods and procedures",
                promptFragment: "This is a methodology section describing research design, data collection, and analysis procedures."
            },
            {
                value: "results",
                label: "Results Section",
                description: "Present research findings and data",
                promptFragment: "This is a results section presenting empirical findings, data analysis, and key outcomes."
            },
            {
                value: "discussion",
                label: "Discussion Section",
                description: "Interpret findings and implications",
                promptFragment: "This is a discussion section interpreting results, connecting to literature, and exploring implications."
            },
            {
                value: "introduction",
                label: "Introduction Section",
                description: "Set context and establish research direction",
                promptFragment: "This is an introduction section establishing context, reviewing literature, and presenting the research question or thesis."
            },
            {
                value: "lit_review_thematic",
                label: "Literature Review (Thematic)",
                description: "Organizes research by themes and concepts",
                promptFragment: "This is a thematic literature review organizing sources by key themes and concepts rather than chronology or author."
            },
            {
                value: "lit_review_chronological",
                label: "Literature Review (Chronological)",
                description: "Traces development over time",
                promptFragment: "This is a chronological literature review showing how research has evolved over time and building understanding progressively."
            },
            {
                value: "lit_review_methodological",
                label: "Literature Review (Methodological)",
                description: "Focuses on research methods",
                promptFragment: "This is a methodological literature review organizing research by methodological approaches and comparing different ways of studying the topic."
            },
            {
                value: "theoretical_framework",
                label: "Theoretical Framework",
                description: "Establish theoretical foundations",
                promptFragment: "This is a theoretical framework section establishing the conceptual and theoretical foundations that guide the research."
            },
            {
                value: "critical_analysis",
                label: "Critical Analysis Essay",
                description: "Evaluate arguments and evidence",
                promptFragment: "This is a critical analysis essay evaluating arguments, examining evidence, and presenting an analytical perspective."
            },
            {
                value: "argumentative",
                label: "Argumentative Essay",
                description: "Present and defend a position",
                promptFragment: "This is an argumentative essay presenting a clear position and defending it with evidence and reasoning."
            },
            {
                value: "comparative",
                label: "Comparative Analysis",
                description: "Compare cases, theories, or concepts",
                promptFragment: "This is a comparative analysis systematically comparing and contrasting cases, theories, or concepts."
            },
            {
                value: "case_study",
                label: "Case Study Analysis",
                description: "In-depth examination of specific case",
                promptFragment: "This is a case study analysis providing in-depth examination of a specific case and extracting broader principles."
            },
            {
                value: "research_proposal",
                label: "Research Proposal",
                description: "Propose new research project",
                promptFragment: "This is a research proposal outlining a planned study, its significance, methodology, and expected contributions."
            }
        ]
    },
    {
        id: 2,
        title: "Role & Voice",
        description: "Choose who the AI should write as",
        componentTarget: "ROLE",
        options: [
            {
                value: "professor",
                label: "University Professor",
                description: "Expert academic voice with teaching awareness",
                promptFragment: "You are a university professor with extensive teaching and research experience. Write with authority, clarity, and pedagogical awareness. Your voice balances expertise with accessibility."
            },
            {
                value: "research_scholar",
                label: "Research Scholar",
                description: "Focused on advancing knowledge",
                promptFragment: "You are a research scholar focused on advancing knowledge in your field. Write with precision, analytical depth, and critical engagement with existing literature."
            },
            {
                value: "phd_candidate",
                label: "PhD Candidate",
                description: "Developing expertise and independent thinking",
                promptFragment: "You are a PhD candidate developing expertise in your field. Write with careful attention to scholarly conventions while showing emerging independent thinking."
            },
            {
                value: "masters_student",
                label: "Advanced Master's Student",
                description: "Demonstrating competence in academic writing",
                promptFragment: "You are an advanced master's student demonstrating competence in academic writing. Show engagement with literature and developing analytical skills."
            },
            {
                value: "international_grad",
                label: "International Graduate Student",
                description: "Advanced ESL academic writer",
                promptFragment: "You are an international graduate student writing in English. Maintain academic standards while using slightly careful phrasing typical of advanced ESL writers."
            },
            {
                value: "honors_undergrad",
                label: "Undergraduate Honors Student",
                description: "Strong academic ability, developing voice",
                promptFragment: "You are an undergraduate honors student showing strong academic ability. Write clearly and thoughtfully, demonstrating understanding without claiming expert-level sophistication."
            },
            {
                value: "independent_researcher",
                label: "Independent Researcher",
                description: "Outside traditional academia",
                promptFragment: "You are an independent researcher outside traditional academia. Write with intellectual curiosity, clear reasoning, and engagement with scholarly sources."
            },
            {
                value: "policy_analyst",
                label: "Policy Analyst",
                description: "Evidence-based policy writing",
                promptFragment: "You are a policy analyst writing evidence-based analysis. Balance academic rigor with practical applicability and clear policy implications."
            },
            {
                value: "practitioner_scholar",
                label: "Professional Practitioner-Scholar",
                description: "Connecting theory with practice",
                promptFragment: "You are a working professional pursuing advanced study. Connect theoretical concepts with real-world practice and professional experience."
            },
            {
                value: "early_career",
                label: "Early-Career Researcher",
                description: "Building scholarly voice",
                promptFragment: "You are an early-career researcher building your scholarly voice. Write with careful attention to methodology and literature while developing your analytical perspective."
            },
            {
                value: "interdisciplinary",
                label: "Interdisciplinary Scholar",
                description: "Working across disciplinary boundaries",
                promptFragment: "You are a scholar working across disciplinary boundaries. Synthesize perspectives from multiple fields while maintaining analytical coherence."
            },
            {
                value: "human_conversational",
                label: "Human Writer (Conversational Academic)",
                description: "Authentic, conversational content creator",
                promptFragment: "You are a human writer who creates authentic, conversational content that feels like a real dialogue with someone you genuinely care about helping. You write to connect, not to impress. Maintain a clear flow of ideas with a humanized touch."
            },
            {
                value: "critical_theorist",
                label: "Critical Theorist",
                description: "Examining power and assumptions",
                promptFragment: "You are a scholar working in critical theoretical traditions. Write with analytical sharpness, questioning assumptions and examining power relations."
            },
            {
                value: "empirical_researcher",
                label: "Empirical Researcher",
                description: "Data and evidence focused",
                promptFragment: "You are an empirical researcher focused on data and evidence. Ground arguments in observable phenomena and measurable outcomes."
            },
            {
                value: "reflective_practitioner",
                label: "Reflective Practitioner",
                description: "Examining professional development",
                promptFragment: "You are a reflective practitioner examining your own professional development. Write with honest self-assessment, connecting experience to theory."
            }
        ]
    },
    {
        id: 3,
        title: "Human Writing Markers",
        description: "Control the level and type of humanization in the writing",
        componentTarget: "HUMANIZATION",
        options: [
            {
                value: "max_esl",
                label: "Maximum Humanization - ESL Advanced",
                description: "International student patterns with natural imperfection",
                promptFragment: "Human writing shows texture and imperfection. Include phrasing choices common among advanced international students (e.g., 'This shows that...', 'It can be seen that...', 'One possible reason is...'). Allow slight rhythm irregularities, occasional simple phrasing, and minor grammatical quirks that do not harm meaning. Use uneven comma placement occasionally. Avoid mechanical perfection."
            },
            {
                value: "high_natural",
                label: "High Humanization - Natural Academic",
                description: "Natural rhythm with organic variation",
                promptFragment: "Write with natural human rhythm. Vary sentence complexity unpredictably. Include occasional slight repetition or clumsy but understandable phrases. Allow some sentences to be simpler than expected. Use fragments sparingly for emphasis. Let transitions feel organic rather than formulaic."
            },
            {
                value: "moderate_careful",
                label: "Moderate Humanization - Careful Writer",
                description: "Revised but retaining natural imperfection",
                promptFragment: "Demonstrate the profile of a careful human writer who has revised their work but retained some natural imperfection. Vary sentence length and structure. Include transitional phrases that show thinking (e.g., 'Looking back,' 'From this perspective,' 'At the same time'). Avoid over-polished smoothness."
            },
            {
                value: "subtle_polished",
                label: "Subtle Humanization - Near-Polished",
                description: "Mostly polished with subtle variation",
                promptFragment: "Write with mostly polished academic prose but include subtle variation in rhythm and structure that signals human authorship. Occasionally use slightly unexpected word choices or phrasing. Maintain clarity while avoiding robotic uniformity."
            },
            {
                value: "minimal_traditional",
                label: "Minimal Humanization - Traditional Academic",
                description: "Traditional academic standards",
                promptFragment: "Maintain traditional academic writing standards with minimal humanization. Focus on clarity, precision, and formal structure. Allow only natural variation in sentence length and paragraph structure."
            },
            {
                value: "burstiness_focus",
                label: "Burstiness Focus - Varied Sentence Length",
                description: "Dramatic length variation for rhythm",
                promptFragment: "Prioritize high burstiness. Alternate dramatically between very short sentences (8-12 words) and longer, complex constructions (25-35 words). Create rhythm through length variation. Short sentences for emphasis. Longer sentences develop complex ideas with multiple clauses, showing the natural flow of academic reasoning."
            },
            {
                value: "perplexity_focus",
                label: "Perplexity Focus - Lexical Variation",
                description: "Diverse vocabulary and unexpected choices",
                promptFragment: "Maximize perplexity through diverse vocabulary and unexpected but appropriate word choices. Avoid predictable academic phrases. Use synonyms creatively. Choose less common but accurate terms where appropriate. Let language feel slightly surprising while remaining clear."
            },
            {
                value: "authentic_imperfection",
                label: "Authentic Imperfection - Controlled Errors",
                description: "Small, realistic imperfections",
                promptFragment: "Include very small, realistic imperfections: an optional comma missing here, a slightly awkward but grammatically correct construction there, minor redundancy that a real writer might leave after revision. Never break meaning or introduce spelling errors in key terms. Aim for 1-2 tiny quirks per 300 words."
            },
            {
                value: "spontaneous_thinking",
                label: "Spontaneous Thinking - Meta-Commentary",
                description: "Show thinking process through markers",
                promptFragment: "Include brief meta-cognitive markers that show real thinking: 'To be honest,' 'Looking back, I realize,' 'At that moment, I did not see,' 'This suggests that,' 'One way to interpret this.' These phrases reveal the writer processing ideas rather than presenting polished conclusions."
            },
            {
                value: "conversational_transitions",
                label: "Conversational Transitions - Natural Flow",
                description: "Natural transitional phrases",
                promptFragment: "Use conversational transitional phrases between ideas. Instead of rigid 'Furthermore' or 'Moreover,' use 'At the same time,' 'Building on this point,' 'From another angle,' 'This connects to,' 'What this means is.' Let ideas flow as if explaining to an engaged colleague."
            },
            {
                value: "hedging_uncertainty",
                label: "Hedging & Uncertainty - Honest Doubt",
                description: "Show intellectual honesty through hedging",
                promptFragment: "Include appropriate hedging that shows intellectual honesty: 'This suggests,' 'It appears that,' 'One possible explanation,' 'While not certain,' 'To some extent,' 'This may indicate.' Show you are thinking carefully rather than claiming absolute certainty."
            },
            {
                value: "personal_voice",
                label: "Personal Voice in Academic Frame",
                description: "First person when appropriate",
                promptFragment: "Use first person when appropriate for reflection or argumentation ('I argue,' 'I observed,' 'From my analysis'). Balance personal voice with academic rigor. Show your thinking while maintaining scholarly standards."
            },
            {
                value: "rhythm_irregularity",
                label: "Rhythm Irregularity - Unpredictable Pacing",
                description: "Avoid predictable patterns",
                promptFragment: "Avoid predictable paragraph and sentence patterns. Some paragraphs short (3-4 sentences), others longer (6-8 sentences). Some sections dense with ideas, others more spacious. Create irregular rhythm that feels human rather than templated."
            },
            {
                value: "contextual_informality",
                label: "Contextual Informality - Selective Casual Phrases",
                description: "Occasional informal but acceptable phrases",
                promptFragment: "While maintaining academic register, include occasional slightly informal but acceptable phrases: 'fairly clear,' 'quite significant,' 'rather complex,' 'pretty much,' 'tends to show.' These add human texture without sacrificing professionalism."
            },
            {
                value: "cultural_linguistic",
                label: "Cultural-Linguistic Markers - Non-Native Patterns",
                description: "Proficient non-native speaker patterns",
                promptFragment: "Include subtle linguistic patterns common among proficient non-native English speakers: careful word order, slightly formal constructions ('It is possible to observe that'), explicit logical connectors ('Therefore,' 'Thus,' 'As a result'), and preference for clear structure over idiomatic brevity."
            },
            {
                value: "revision_traces",
                label: "Authentic Revision Traces - Draft-Like Quality",
                description: "Carefully revised but not perfect",
                promptFragment: "Write as if this is a carefully revised draft, not a perfect final version. Include moments where phrasing is functional rather than elegant. Some sentences clarify or rephrase the previous one. Let the thinking process show slightly."
            },
            {
                value: "emotional_restraint",
                label: "Emotional Restraint - Measured Feeling",
                description: "Express feelings with professional restraint",
                promptFragment: "For reflective or argumentative writing, express feelings or positions with measured language: 'I felt uncertain,' 'This concerned me,' 'I questioned whether,' rather than dramatic or exaggerated emotional language. Show genuine reaction with professional restraint."
            }
        ]
    },
    {
        id: 4,
        title: "Citation Style & Density",
        description: "Choose citation format and frequency",
        componentTarget: "CITATIONS",
        options: [
            {
                value: "apa_standard",
                label: "APA 7th (Standard Density)",
                description: "1 quote per 300-400 words, balanced paraphrase",
                promptFragment: "Use APA 7th edition format. For quotations, include page numbers (Author, Year, p. X). For paraphrases, include author and year only. Include approximately one analyzed quotation per 300-400 words. Prefer paraphrase over direct quotes. Use active citation forms such as 'Smith (2020) argues...' or 'Recent work suggests (Jones, 2021)...'"
            },
            {
                value: "apa_heavy",
                label: "APA 7th (Heavy Citation)",
                description: "Multiple citations per paragraph, evidence-dense",
                promptFragment: "Use APA 7th edition format. Provide heavy citation density with 2-3 sources per paragraph minimum. Include both quotations (with page numbers) and paraphrases. Build arguments through synthesis of multiple sources. Use active voice: 'Smith (2020) argues...' and 'Research demonstrates (Author1, 2019; Author2, 2020)...'"
            },
            {
                value: "apa_minimal",
                label: "APA 7th (Minimal Quotes, Mostly Paraphrase)",
                description: "Rare direct quotes, strong paraphrasing",
                promptFragment: "Use APA 7th edition format. Minimize direct quotations; use them only for key definitions or striking formulations. Rely primarily on paraphrase with author-year citations. Synthesize sources in your own words. When quoting, always include page numbers."
            },
            {
                value: "harvard",
                label: "Harvard Referencing",
                description: "Author-date system with parenthetical citations",
                promptFragment: "Use Harvard referencing style. Format: (Author Year) or Author (Year). For quotes include page numbers: (Author Year, p. X). Use both in-text citations and a reference list. Prefer active integration: 'Smith (2020) demonstrates...' over passive constructions."
            },
            {
                value: "chicago",
                label: "Chicago Style (Author-Date)",
                description: "Chicago author-date format",
                promptFragment: "Use Chicago Manual of Style author-date format. Citations appear as (Author Year) or (Author Year, page). Provide both in-text citations and a reference list. Use active voice when citing: 'As Smith argues (2020, 45)...'"
            },
            {
                value: "mla",
                label: "MLA 9th Edition",
                description: "Parenthetical author-page format",
                promptFragment: "Use MLA 9th edition format. Provide parenthetical citations with author and page number (Author Page). No year in in-text citations. Include a Works Cited page. Integrate sources smoothly: 'Smith argues that... (45).'"
            },
            {
                value: "ieee",
                label: "IEEE Style",
                description: "Numbered citations in brackets",
                promptFragment: "Use IEEE citation style with numbered references in square brackets [1], [2], etc. Number sources in order of appearance. Provide a numbered reference list at the end. Format: 'Research shows [1] that...' or 'Smith et al. [2] demonstrate...'"
            },
            {
                value: "vancouver",
                label: "Vancouver Style",
                description: "Numbered citations for medical/science writing",
                promptFragment: "Use Vancouver citation style with numbered citations in parentheses (1) or superscript. Number references in order of first appearance. Provide a numbered reference list. Common in medical and scientific writing."
            },
            {
                value: "custom",
                label: "Custom Citation Requirements",
                description: "Specify your own citation needs",
                promptFragment: "Follow the specific citation requirements provided by the user. Maintain consistency in citation format throughout. Include both in-text citations and a complete reference list."
            }
        ]
    },
    {
        id: 5,
        title: "Content Development Strategy",
        description: "Choose how ideas should be developed and organized",
        componentTarget: "CONTENT_DEVELOPMENT",
        options: [
            {
                value: "thesis_driven",
                label: "Thesis-Driven Development",
                description: "All content advances central claim",
                promptFragment: "Expand the outline into focused sections that advance a clear central claim. Each paragraph must explicitly connect back to the thesis. Begin sections by stating how they support the overall argument. End sections by reinforcing the thesis connection."
            },
            {
                value: "evidence_first",
                label: "Evidence-First Approach",
                description: "Build arguments from evidence upward",
                promptFragment: "Build arguments from evidence upward. Present data, examples, or research findings first, then derive conclusions. Each paragraph should ground claims in concrete evidence before offering interpretation."
            },
            {
                value: "problem_solution",
                label: "Problem-Solution Structure",
                description: "Frame issues and develop responses",
                promptFragment: "Frame each section around a specific problem or question, then develop a reasoned response. Clearly state the issue, examine its dimensions, evaluate possible approaches, and present the most defensible solution."
            },
            {
                value: "comparative",
                label: "Comparative Analysis Framework",
                description: "Systematic comparison and contrast",
                promptFragment: "Develop content by systematically comparing and contrasting perspectives, cases, theories, or findings. Highlight similarities and differences. Explain why these comparisons matter for understanding the topic."
            },
            {
                value: "progressive",
                label: "Progressive Elaboration",
                description: "Build complexity gradually",
                promptFragment: "Each paragraph has a purpose, starts with a topic sentence, develops with reasoning and evidence, and ends by linking forward to the next idea. Build complexity progressively. Start with foundational concepts and layer on nuance and complication."
            },
            {
                value: "question_driven",
                label: "Question-Driven Exploration",
                description: "Structure around key questions",
                promptFragment: "Structure development around key questions. Pose a significant question, explore multiple angles for answering it, evaluate the strengths and limits of each answer, and justify the most compelling response."
            },
            {
                value: "dialectical",
                label: "Dialectical Development",
                description: "Thesis, antithesis, synthesis",
                promptFragment: "Present a position, then its counter-position, then synthesize or transcend the opposition. Show tension between perspectives before resolving or reframing the conflict at a higher level of analysis."
            },
            {
                value: "chronological_thematic",
                label: "Chronological-Thematic Blend",
                description: "Trace development while highlighting themes",
                promptFragment: "Trace development over time while highlighting persistent themes. Show both evolution and continuity. Connect historical progression to enduring concepts or debates."
            },
            {
                value: "concept_application",
                label: "Concept-Application Pattern",
                description: "Theory followed by practical examples",
                promptFragment: "Introduce a theoretical concept clearly, then demonstrate its application through examples or case analysis. Alternate between abstract definition and concrete illustration."
            },
            {
                value: "layered_analysis",
                label: "Layer-by-Layer Analysis",
                description: "Examine at multiple levels of depth",
                promptFragment: "Examine the topic at multiple levels: surface phenomena, underlying mechanisms, broader implications. Each section should add analytical depth, moving from description to explanation to significance."
            },
            {
                value: "critical_deconstruction",
                label: "Critical Deconstruction",
                description: "Question assumptions and reveal contradictions",
                promptFragment: "Develop content by questioning assumptions, examining hidden premises, identifying contradictions, and revealing what arguments take for granted. Build toward reconstructed understanding."
            },
            {
                value: "synthesis_focused",
                label: "Synthesis-Focused Development",
                description: "Integrate multiple perspectives",
                promptFragment: "Bring together insights from multiple sources or perspectives to create integrated understanding. Show how disparate ideas connect. Build toward coherent synthesis rather than mere summary."
            },
            {
                value: "case_based",
                label: "Case-Based Reasoning",
                description: "Ground arguments in specific cases",
                promptFragment: "Ground abstract arguments in specific cases or examples. Analyze cases in detail, extract principles, then test those principles against other cases. Move between particular and general."
            },
            {
                value: "methodical_paragraph",
                label: "Methodical Paragraph Structure",
                description: "Strict internal paragraph logic",
                promptFragment: "Each paragraph follows a strict internal logic: topic sentence states the claim, 2-3 sentences develop with evidence or reasoning, 1 sentence analyzes significance, final sentence transitions forward. Make structure visible through clear organization."
            },
            {
                value: "organic_flow",
                label: "Organic Flow Development",
                description: "Natural unfolding while maintaining logic",
                promptFragment: "Let ideas unfold naturally while maintaining logical coherence. Use transitional phrases so all paragraphs connect and the whole piece reads as a continuous argument. Prioritize smooth reading experience over rigid structure."
            }
        ]
    },
    {
        id: 6,
        title: "Academic Rigor Level",
        description: "Set the depth and quality of scholarly engagement",
        componentTarget: "ACADEMIC_RIGOR",
        options: [
            {
                value: "maximum_research",
                label: "Maximum Rigor - Research Standard",
                description: "Every claim substantiated, comprehensive engagement",
                promptFragment: "Substantiate every substantive claim with specific examples, numbers, or findings from provided sources. Include at least one analyzed quotation per 300-400 words. Provide page numbers for all citations. Address counter-evidence and alternative interpretations. Qualify claims with appropriate hedging when evidence is partial."
            },
            {
                value: "high_dissertation",
                label: "High Rigor - Thesis/Dissertation Level",
                description: "Comprehensive literature engagement",
                promptFragment: "Ground all arguments in scholarly literature. Critically evaluate sources rather than simply citing them. Explain methodology when discussing research. Address limitations and alternative explanations. Demonstrate comprehensive engagement with the field."
            },
            {
                value: "strong_graduate",
                label: "Strong Rigor - Graduate Coursework",
                description: "Solid evidence and critical engagement",
                promptFragment: "Support claims with evidence from credible sources. When quoting or paraphrasing, add one or two concise sentences explaining how that evidence supports the argument. Prefer paraphrase; limit each paragraph to at most one short quotation with accompanying analysis. If evidence is uncertain, hedge precisely and state limits."
            },
            {
                value: "moderate_undergrad",
                label: "Moderate Rigor - Upper-Level Undergraduate",
                description: "Engagement with key concepts and debates",
                promptFragment: "Demonstrate engagement with course readings and concepts. Cite sources to support major claims. Explain the relevance of evidence to your argument. Show understanding of key debates without requiring comprehensive literature coverage."
            },
            {
                value: "balanced_professional",
                label: "Balanced Rigor - Professional Writing",
                description: "Credible but accessible",
                promptFragment: "Support arguments with evidence but prioritize clarity and accessibility. Include enough citations to establish credibility without overwhelming the reader. Focus on practical implications alongside theoretical grounding."
            },
            {
                value: "evidence_dense",
                label: "Evidence-Dense Approach",
                description: "Multiple citations per paragraph",
                promptFragment: "Pack each paragraph with specific data, examples, or research findings. Aim for 2-3 citations per paragraph minimum. Let evidence speak prominently, with your analysis showing how pieces of evidence relate to each other."
            },
            {
                value: "synthesis_quality",
                label: "Synthesis Over Citation Volume",
                description: "Deep engagement with fewer sources",
                promptFragment: "Prioritize meaningful synthesis of fewer sources over high citation count. Engage deeply with key sources. Show how sources speak to each other. Build original insight from careful integration of existing work."
            },
            {
                value: "methodological_transparency",
                label: "Methodological Transparency",
                description: "Explain and evaluate methods",
                promptFragment: "When discussing research, always explain methodology. Evaluate whether methods suit research questions. Discuss sample sizes, data collection, analysis approaches. Address methodological limitations that affect interpretation."
            },
            {
                value: "critical_evaluation",
                label: "Critical Evaluation Focus",
                description: "Evaluate rather than report",
                promptFragment: "Do not simply report what sources say. Evaluate the quality of evidence. Assess logical coherence of arguments. Identify assumptions. Compare the strength of competing claims. Show analytical judgment."
            },
            {
                value: "theoretical_grounding",
                label: "Theoretical Grounding",
                description: "Explicit theoretical frameworks",
                promptFragment: "Explicitly connect arguments to theoretical frameworks. Define key theoretical concepts. Show how theory illuminates evidence. Explain which theoretical lens you adopt and why."
            },
            {
                value: "empirical_focus",
                label: "Empirical Focus",
                description: "Prioritize observable evidence",
                promptFragment: "Prioritize observable evidence over theoretical speculation. Ground claims in data, measurements, documented cases. When theory appears, tie it immediately to empirical phenomena."
            },
            {
                value: "nuanced_hedging",
                label: "Nuanced Hedging",
                description: "Precise language matching certainty",
                promptFragment: "Use precise hedging language that reflects degrees of certainty: 'suggests' vs 'demonstrates,' 'may indicate' vs 'clearly shows,' 'tends to' vs 'always.' Match claim strength to evidence strength. Acknowledge when conclusions are preliminary or contested."
            },
            {
                value: "counterargument",
                label: "Counterargument Engagement",
                description: "Address opposing views actively",
                promptFragment: "Actively address opposing views or alternative interpretations. Present counterarguments fairly before responding to them. Strengthen your position by showing you have considered alternatives."
            },
            {
                value: "source_quality",
                label: "Source Quality Hierarchy",
                description: "Prioritize peer-reviewed research",
                promptFragment: "Prioritize peer-reviewed research over other sources. When using non-academic sources, acknowledge their status. Evaluate author credentials and publication venues. Address potential bias or limitations in sources."
            },
            {
                value: "gap_identification",
                label: "Gap Identification",
                description: "Highlight what remains unknown",
                promptFragment: "Explicitly identify what existing research does not address. Point to contradictions in the literature. Note methodological limitations across studies. Show where knowledge is incomplete or uncertain."
            }
        ]
    },
    {
        id: 7,
        title: "Writing Style Controls",
        description: "Fine-tune grammar, syntax, and sentence structure",
        componentTarget: "STYLE_CONTROLS",
        options: [
            {
                value: "formal_standard",
                label: "Formal Academic Standard",
                description: "Traditional scholarly conventions",
                promptFragment: "No contractions. Maintain correct subject-verb agreement. Write complete sentences. Use third-person voice predominantly. Employ traditional academic vocabulary. Avoid colloquialisms entirely."
            },
            {
                value: "readable_academic",
                label: "Readable Academic",
                description: "Clear and accessible while scholarly",
                promptFragment: "No contractions. Keep subject-verb agreement correct. Prioritize clarity over complexity. Use shorter sentences when possible. Choose common words over obscure synonyms. Maintain academic tone while maximizing accessibility."
            },
            {
                value: "esl_formal",
                label: "ESL-Friendly Formal",
                description: "Careful non-native speaker patterns",
                promptFragment: "No contractions. Keep a formal yet readable tone that could plausibly be written by a careful non-native English speaker. Include phrasing choices common among international students while preserving accuracy. Prefer explicit logical connectors. Use slightly careful constructions."
            },
            {
                value: "concise_direct",
                label: "Concise & Direct",
                description: "Eliminate unnecessary words",
                promptFragment: "Eliminate unnecessary words. Avoid long introductory phrases. Cut filler language. Get to the point quickly. Use active voice. Keep sentences under 25 words when possible. Break complex ideas into multiple short sentences."
            },
            {
                value: "complex_sophisticated",
                label: "Complex-Sophisticated",
                description: "Advanced syntax and vocabulary",
                promptFragment: "Employ sophisticated syntax with subordinate clauses, parallel structures, and varied sentence types. Use discipline-specific terminology precisely. Demonstrate command of academic register through carefully constructed prose."
            },
            {
                value: "varied_rhythm",
                label: "Varied Rhythm - Burstiness Priority",
                description: "Dramatic sentence length variation",
                promptFragment: "Vary sentence lengths dramatically. Reduce commas; avoid long strings of clauses; break up long sentences; avoid em dashes. Alternate between 8-word punchy sentences and 30-word complex constructions. Create unpredictable rhythm. Let pacing feel human."
            },
            {
                value: "minimalist_punctuation",
                label: "Minimalist Punctuation",
                description: "Simple punctuation only",
                promptFragment: "Reduce comma use. Break sentences rather than joining with commas. Do not use em dashes, semicolons, or parenthetical asides. Keep punctuation simple: periods, occasional commas, question marks, quotation marks only."
            },
            {
                value: "transitional_rich",
                label: "Transitional Phrase-Rich",
                description: "Explicit logical connections",
                promptFragment: "Use abundant transitional phrases to guide the reader: 'However,' 'Moreover,' 'In contrast,' 'Building on this point,' 'As a result,' 'From another perspective.' Make logical connections explicit and visible."
            },
            {
                value: "paragraph_discipline",
                label: "Paragraph Structure Discipline",
                description: "Clear paragraph formula",
                promptFragment: "Every paragraph must have: (1) clear topic sentence, (2) 3-5 supporting sentences with evidence/reasoning, (3) concluding/transitional sentence. No single-sentence paragraphs. Keep paragraphs focused on one idea only."
            },
            {
                value: "organic_paragraph",
                label: "Organic Paragraph Flow",
                description: "Natural length variation",
                promptFragment: "Allow paragraph length to vary naturally based on idea complexity. Some paragraphs may be 3 sentences, others 8. Avoid rigid formulas. Let content determine structure while maintaining coherence."
            },
            {
                value: "active_voice",
                label: "Active Voice Emphasis",
                description: "Prioritize active constructions",
                promptFragment: "Use active voice wherever possible. Write 'Smith (2020) argues' not 'It is argued by Smith.' Write 'The data show' not 'It can be seen in the data.' Reserve passive voice only when the actor is genuinely unknown or irrelevant."
            },
            {
                value: "cautious_passive",
                label: "Cautious Passive Voice",
                description: "Strategic use of passive",
                promptFragment: "Use passive voice strategically to maintain academic tone and focus on actions rather than actors. Prefer 'The hypothesis was tested' over 'We tested the hypothesis' in appropriate contexts."
            },
            {
                value: "lexical_precision",
                label: "Lexical Precision",
                description: "Exact word choice, define terms",
                promptFragment: "Choose words for exact meaning. Avoid vague terms like 'things,' 'stuff,' 'very,' 'really,' 'quite.' Use specific vocabulary. When introducing technical terms, define them briefly on first use."
            },
            {
                value: "controlled_repetition",
                label: "Controlled Repetition",
                description: "Avoid excessive word reuse",
                promptFragment: "Avoid strong word repetition within paragraphs. If a key term appears more than twice in one paragraph, use pronouns or synonyms for variety. Allow intentional repetition only for emphasis of central concepts."
            },
            {
                value: "natural_imperfection",
                label: "Natural Imperfection - Slight Awkwardness",
                description: "Correct but not mechanically perfect",
                promptFragment: "Maintain overall correctness but allow 1-2 slightly awkward but grammatically correct constructions per 500 words. These should not break meaning but may feel less elegant than perfect prose. Avoid mechanical perfection."
            }
        ]
    },
    {
        id: 8,
        title: "Structure & Headings",
        description: "Organize the overall document structure",
        componentTarget: "STRUCTURE",
        options: [
            {
                value: "standard_sections",
                label: "Standard Academic Sections",
                description: "Introduction, body sections, conclusion",
                promptFragment: "Use clear section headings: Introduction, [Main Sections], Conclusion. Each main section should have a descriptive heading that signals its content. Open with brief context and thesis. Develop sections logically. End with implications, limits, or future directions."
            },
            {
                value: "question_headings",
                label: "Question-Based Headings",
                description: "Frame sections as questions",
                promptFragment: "Structure with headings framed as questions (e.g., 'What drives consumer behavior?' 'How does policy influence outcomes?'). Answer each question in that section."
            },
            {
                value: "thematic_headings",
                label: "Thematic Headings",
                description: "Organize by key concepts",
                promptFragment: "Organize under thematic headings that capture key concepts or ideas (e.g., 'Power and Resistance,' 'Digital Transformation,' 'Ethical Considerations'). Let themes drive organization."
            },
            {
                value: "numbered_hierarchy",
                label: "Numbered Hierarchy",
                description: "Clear numbered section system",
                promptFragment: "Use numbered sections (1.0, 1.1, 1.2, 2.0, etc.) for clear hierarchical organization. Include up to three levels of subheadings. Make structure explicit and easy to navigate."
            },
            {
                value: "minimal_headings",
                label: "Minimal Headings",
                description: "Rely on paragraph flow",
                promptFragment: "Use only Introduction and Conclusion as explicit headings. Let paragraph structure and topic sentences guide the reader through the body without formal section breaks."
            },
            {
                value: "chronological",
                label: "Chronological Structure",
                description: "Trace development over time",
                promptFragment: "Organize sections chronologically, tracing development over time. Use time-period headings or phase-based organization. Show evolution and change."
            },
            {
                value: "problem_solution_sections",
                label: "Problem-Solution Sections",
                description: "Problem definition through to solutions",
                promptFragment: "Structure as: Problem Definition → Analysis of Causes → Evaluation of Solutions → Recommended Approach → Implementation Implications."
            },
            {
                value: "comparative_structure",
                label: "Comparative Structure",
                description: "Systematic case comparison",
                promptFragment: "Organize as: Introduction → Case A → Case B → Comparative Analysis → Synthesis/Conclusions. Make comparisons explicit and systematic."
            },
            {
                value: "theory_application",
                label: "Theory-Application Pattern",
                description: "Alternate theory and examples",
                promptFragment: "Alternate sections: Theoretical Framework → Application/Example → Next Theoretical Concept → Application → etc. Connect abstract and concrete throughout."
            },
            {
                value: "progressive_complexity",
                label: "Progressive Complexity",
                description: "Simple to complex organization",
                promptFragment: "Start with foundational/simple concepts in early sections. Build toward more complex, nuanced, or controversial material in later sections. Structure shows intellectual progression."
            },
            {
                value: "synthesis_structure",
                label: "Synthesis-Focused",
                description: "Integrative thematic organization",
                promptFragment: "Open with brief context. Develop sections that each synthesize multiple sources around a theme. Conclude with integrated understanding drawn from all sections."
            },
            {
                value: "reflective_5r",
                label: "Reflective 5R Structure",
                description: "For reflections: Report, Respond, Relate, Reason, Reconstruct",
                promptFragment: "Use headings: Reporting (what happened), Responding (reactions), Relating (connecting to prior experience), Reasoning (why it matters), Reconstructing (future implications). Follow the 5R reflective framework."
            }
        ]
    },
    {
        id: 9,
        title: "Special Requirements",
        description: "Add optional features and emphases",
        componentTarget: "SPECIAL_REQUIREMENTS",
        options: [
            {
                value: "none",
                label: "No Special Requirements",
                description: "Standard academic writing without special additions",
                promptFragment: ""
            },
            {
                value: "data_tables",
                label: "Include Data Tables",
                description: "Create tables to organize information",
                promptFragment: "Create tables to organize data, comparisons, or frameworks where appropriate. Reference tables in text and explain their significance. Format tables clearly with descriptive headings."
            },
            {
                value: "figures_diagrams",
                label: "Include Figures/Diagrams Description",
                description: "Describe visual elements needed",
                promptFragment: "When relevant, describe what figures or diagrams should illustrate. Provide detailed captions and integrate visual elements into the argument. Explain how visuals support the text."
            },
            {
                value: "research_gaps",
                label: "Focus on Research Gaps",
                description: "Highlight what remains unknown",
                promptFragment: "Explicitly identify and discuss gaps in existing research. Highlight what remains unknown, understudied, or contested in the literature. Frame your contribution in relation to these gaps."
            },
            {
                value: "practical_implications",
                label: "Emphasize Practical Implications",
                description: "Connect theory to real-world application",
                promptFragment: "Connect theoretical arguments to practical applications. Discuss real-world implications, policy recommendations, or professional practice. Show how abstract ideas matter in concrete contexts."
            },
            {
                value: "critical_evaluation",
                label: "Critical Evaluation Priority",
                description: "Prioritize analysis over description",
                promptFragment: "Prioritize critical analysis over descriptive summary. Question assumptions, identify limitations, evaluate logic and evidence throughout. Show analytical depth at every stage."
            },
            {
                value: "theoretical_framework",
                label: "Theoretical Framework Emphasis",
                description: "Develop and apply clear theory",
                promptFragment: "Develop and apply a clear theoretical framework. Define key theoretical concepts. Show how theory guides interpretation of evidence. Make theoretical commitments explicit."
            },
            {
                value: "methodological_focus",
                label: "Methodological Focus",
                description: "Emphasize research methods",
                promptFragment: "Pay close attention to research methods. Evaluate methodological choices and their implications for findings. Discuss methodological limitations. Consider how different methods might yield different insights."
            },
            {
                value: "future_research",
                label: "Future Research Directions",
                description: "Suggest next steps for scholarship",
                promptFragment: "Conclude sections and the overall piece by suggesting specific directions for future research based on current knowledge and gaps. Make recommendations concrete and justified."
            },
            {
                value: "interdisciplinary",
                label: "Interdisciplinary Connections",
                description: "Draw on multiple fields",
                promptFragment: "Draw connections across disciplinary boundaries. Show how insights from multiple fields illuminate the topic. Synthesize perspectives that might not typically be brought together."
            },
            {
                value: "historical_context",
                label: "Historical Context",
                description: "Provide historical background",
                promptFragment: "Provide historical background and trace development of ideas, practices, or phenomena over time. Show how history shapes current understanding. Connect past and present."
            },
            {
                value: "ethical_considerations",
                label: "Ethical Considerations",
                description: "Address moral dimensions",
                promptFragment: "Address ethical dimensions of the topic. Discuss moral implications, ethical frameworks, responsibilities, or justice concerns where relevant. Show awareness of values and stakes."
            }
        ]
    }
];
