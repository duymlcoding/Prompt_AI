// Step Configuration for Academic Prompt Generator (5-Step Comprehensive Structure)
// Each step contains sections with single-select or multi-select options

const promptSteps = [
    {
        id: 1,
        title: "Writing Purpose & Role",
        description: "Define what you're writing and who you're writing as",
        sections: [
            {
                id: "writing_scope",
                title: "What are you writing?",
                type: "single",
                required: true,
                componentTarget: "WRITING_SCOPE",
                options: [
                    {
                        value: "full_paper",
                        label: "Full Academic Paper",
                        description: "Complete paper with all sections",
                        icon: "📄",
                        budget: {
                            introduction: 15,
                            literature: 25,
                            methodology: 20,
                            results: 20,
                            discussion: 15,
                            conclusion: 5
                        }
                    },
                    {
                        value: "single_section",
                        label: "Single Section Only",
                        description: "Just one focused section",
                        icon: "📝",
                        budget: {
                            content: 100
                        }
                    },
                    {
                        value: "essay",
                        label: "Essay/Short Paper",
                        description: "Introduction, body, conclusion",
                        icon: "✍️",
                        budget: {
                            introduction: 15,
                            body: 70,
                            conclusion: 15
                        }
                    }
                ]
            },
            {
                id: "word_count_target",
                title: "Target Word Count",
                type: "range",
                required: true,
                componentTarget: "WORD_COUNT",
                min: 100,
                max: 1500,
                step: 50,
                default: 600,
                showBudgetBar: true,
                promptFragment: "STRICT WORD COUNT REQUIREMENT: The writing MUST contain exactly {VALUE} words (±50 words tolerance). Count every word carefully. If you reach the word limit mid-sentence, complete that sentence naturally, but do not exceed {VALUE} + 50 words total. This is a firm requirement that must be followed precisely."
            },
            {
                id: "writing_type",
                title: "Writing Type",
                type: "grouped-single", // single-select with subsections
                required: true,
                componentTarget: "WRITING_TYPE",
                subsections: [
                    {
                        id: "academic_research",
                        title: "Academic Research Writing",
                        options: [
                            {
                                value: "research_proposal",
                                label: "Research Proposal",
                                description: "Propose new research with methodology and significance",
                                helpText: "A research proposal pitches a new study to reviewers. It should convince them your research question is important, your methods are sound, and your project is feasible. Best for: grant applications, thesis proposals.",
                                bestFor: "Grant applications, thesis proposals",
                                icon: "📋",
                                promptFragment: "This is a research proposal that outlines a planned study, demonstrates its significance, presents methodology, and addresses feasibility. The writing should establish the research problem and its importance, review relevant literature to show knowledge gaps, present clear research questions or hypotheses, detail proposed methodology with justification, discuss expected contributions, and address practical considerations. Convince readers the research is worthwhile, feasible, and methodologically sound."
                            },
                            {
                                value: "methodology",
                                label: "Methodology Section",
                                description: "Detailed research methods and procedures explanation",
                                helpText: "The methodology section explains HOW you conducted your research in enough detail that others could replicate it. Include your research design, data collection methods, and analytical approach. Best for: empirical research papers.",
                                bestFor: "Empirical research papers",
                                icon: "🔬",
                                promptFragment: "This is a methodology section that comprehensively describes research design, data collection procedures, analytical methods, and justifications for methodological choices. The writing should provide sufficient detail for replication, explain why specific methods were chosen, address limitations and validity concerns, and demonstrate rigorous attention to research ethics and methodological appropriateness for answering the research questions."
                            },
                            {
                                value: "results",
                                label: "Results Section",
                                description: "Present empirical findings with data analysis",
                                helpText: "The results section presents what you found WITHOUT interpreting what it means (save that for the discussion). Just the facts: data, statistics, tables, and objective observations. Best for: experimental or quantitative studies.",
                                bestFor: "Experimental/quantitative studies",
                                icon: "📊",
                                promptFragment: "This is a results section that presents empirical findings systematically and objectively. The writing should organize results logically (often by research question or hypothesis), present data clearly with appropriate statistical analysis, use tables and figures to support textual description, and report findings without interpretation or discussion. Maintain objectivity while ensuring accessibility and clarity in presenting complex data."
                            }
                        ]
                    },
                    {
                        id: "literature_review",
                        title: "Literature Review",
                        options: [
                            {
                                value: "lit_review_thematic",
                                label: "Literature Review (Thematic)",
                                description: "Organize research by themes and concepts across time",
                                promptFragment: "This is a thematic literature review that organizes scholarly sources by key themes, concepts, or debates rather than chronologically or by author. The writing should identify major themes in the literature, synthesize findings from multiple sources under each theme, show how sources relate to and build upon each other, identify patterns and contradictions, and demonstrate critical analysis rather than mere summary. Create an integrated narrative that advances understanding of each theme."
                            },
                            {
                                value: "lit_review_chronological",
                                label: "Literature Review (Chronological)",
                                description: "Trace research development over time",
                                promptFragment: "This is a chronological literature review that traces how research on the topic has developed over time. The writing should show historical progression of ideas, identify turning points or paradigm shifts, demonstrate how earlier research influenced later work, and build understanding progressively. While organized temporally, maintain analytical depth by showing not just what happened when, but how and why the field evolved."
                            }
                        ]
                    },
                    {
                        id: "reflective_discussion",
                        title: "Reflective & Discussion",
                        options: [
                            {
                                value: "reflection",
                                label: "Reflection Essay",
                                description: "Personal academic reflection on learning journey and professional development",
                                promptFragment: "This is a reflective essay that examines personal learning experiences and professional development. The writing should demonstrate critical self-assessment, connect theory to practice, and show how experiences have shaped understanding and future professional direction. Use first-person voice to explore growth, challenges overcome, and lessons learned while maintaining academic rigor and connecting personal insights to scholarly frameworks."
                            },
                            {
                                value: "discussion",
                                label: "Discussion Section",
                                description: "Interpret findings and connect to broader literature",
                                promptFragment: "This is a discussion section that interprets research findings, connects results to existing literature, and explores implications. The writing should explain what findings mean, compare and contrast with previous research, address unexpected results, acknowledge limitations honestly, and build toward implications for theory, practice, or future research. Move from specific findings to broader significance while maintaining scholarly rigor."
                            },
                            {
                                value: "introduction",
                                label: "Introduction Section",
                                description: "Establish context, review literature, and present research direction",
                                promptFragment: "This is an introduction section that establishes research context, reviews relevant literature, identifies gaps or problems, and presents the research question or thesis. The writing should move from broad context to specific focus (funnel structure), demonstrate knowledge of existing research, justify the study's significance, and provide a clear roadmap for what follows. Balance accessibility for broader readers with disciplinary depth."
                            }
                        ]
                    },
                    {
                        id: "analytical_writing",
                        title: "Analytical Writing",
                        options: [
                            {
                                value: "argumentative",
                                label: "Argumentative Essay",
                                description: "Present and defend a clear position with evidence",
                                promptFragment: "This is an argumentative essay that presents a clear position and defends it with evidence and reasoning. The writing should state a debatable thesis early, present supporting arguments systematically, anticipate and address counterarguments, use evidence from credible sources to support claims, and build toward a persuasive conclusion. Maintain logical rigor while acknowledging complexity and alternative perspectives where appropriate."
                            },
                            {
                                value: "critical_analysis",
                                label: "Critical Analysis Essay",
                                description: "Evaluate arguments, assumptions, and evidence rigorously",
                                promptFragment: "This is a critical analysis essay that evaluates arguments, examines underlying assumptions, assesses evidence quality, and identifies strengths and limitations. The writing should go beyond summary to analyze how arguments work, question taken-for-granted assumptions, evaluate logical coherence, assess evidence appropriateness, and offer reasoned judgments. Demonstrate analytical depth while maintaining fairness to the work being analyzed."
                            },
                            {
                                value: "comparative",
                                label: "Comparative Analysis",
                                description: "Systematic comparison of cases, theories, or concepts",
                                promptFragment: "This is a comparative analysis that systematically examines similarities and differences between two or more cases, theories, concepts, or phenomena. The writing should establish clear criteria for comparison, organize comparison either point-by-point or subject-by-subject, analyze rather than merely describe differences, and build toward conclusions about what these comparisons reveal. Use comparison to deepen understanding rather than simply catalog differences."
                            },
                            {
                                value: "case_study",
                                label: "Case Study Analysis",
                                description: "In-depth examination of specific case with broader implications",
                                promptFragment: "This is a case study analysis that examines a specific case in depth to extract broader principles, test theory, or illustrate concepts. The writing should provide rich contextual detail about the case, apply analytical frameworks or theories, identify patterns and causal relationships, and show how specific case illuminates broader phenomena. Balance particular details with generalizable insights."
                            }
                        ]
                    }
                ]
            },
            {
                id: "writer_role",
                title: "Writer Role",
                type: "single",
                required: true,
                componentTarget: "ROLE",
                options: [
                    {
                        value: "phd_researcher",
                        label: "PhD Researcher",
                        description: "Advanced scholar with deep expertise and independent analysis",
                        helpText: "Write as a doctoral-level expert with deep knowledge of your field. Your writing shows theoretical sophistication, methodological precision, and critical engagement with scholarly debates.",
                        bestFor: "Dissertations, journal articles",
                        icon: "🎓",
                        promptFragment: "You are a PhD-level researcher with substantial expertise in your field. Your writing demonstrates sophisticated command of theoretical frameworks, methodological precision, and critical engagement with scholarly debates. You write with intellectual confidence while remaining appropriately cautious about claims. You balance authoritative knowledge with scholarly humility, acknowledging complexity and uncertainty where it exists. Your prose is precise and nuanced, demonstrating facility with discipline-specific discourse while remaining accessible to fellow scholars. You naturally integrate multiple theoretical perspectives and show awareness of methodological trade-offs."
                    },
                    {
                        value: "masters_student",
                        label: "Master's Student",
                        description: "Developing scholar showing growing analytical sophistication",
                        promptFragment: "You are an advanced master's student developing scholarly expertise. Your writing demonstrates solid grasp of course concepts and growing analytical sophistication, though you are still building toward the independent voice of a senior researcher. You engage thoughtfully with required readings and show developing critical thinking skills. Your prose is careful and well-organized, showing attention to academic conventions. You connect ideas logically and demonstrate understanding through clear explanations. You write to show comprehension and analytical ability rather than claiming expert authority."
                    },
                    {
                        value: "international_graduate",
                        label: "International Graduate Student",
                        description: "Proficient multilingual scholar with careful academic approach",
                        helpText: "Write as an English-as-additional-language scholar. Your writing is academically strong with subtle patterns common among multilingual writers: slightly formal phrasing, careful word order, and explicit logical connectors.",
                        bestFor: "ESL/multilingual students",
                        icon: "🌍",
                        promptFragment: "You are an international graduate student writing in English as an additional language. Your writing demonstrates strong academic competence with subtle linguistic patterns common among proficient multilingual scholars. You express complex ideas clearly while occasionally using slightly formal constructions or explicit logical markers ('Therefore,' 'As a result,' 'It can be observed that') that signal careful, deliberate composition. Your prose shows attention to precision and correctness, sometimes favoring clarity over idiomatic brevity. You write complete, grammatically sound sentences with thoughtful structure."
                    },
                    {
                        value: "honors_undergrad",
                        label: "Honors Undergraduate",
                        description: "Strong undergraduate showing emerging analytical ability",
                        promptFragment: "You are an honors undergraduate student demonstrating strong academic ability and developing analytical skills. Your writing shows solid understanding of course material and growing capacity for independent analysis, though without the theoretical sophistication of graduate work. You engage seriously with readings and assignments, showing thoughtfulness and intellectual curiosity. Your prose is clear, organized, and increasingly confident, though you write from a learning position rather than claiming expertise. You demonstrate understanding through careful explanation and make connections between ideas thoughtfully."
                    },
                    {
                        value: "professional_practitioner",
                        label: "Professional/Practitioner",
                        description: "Professional bringing real-world experience to academic writing",
                        promptFragment: "You are a professional or practitioner bringing workplace experience into dialogue with academic work. Your writing demonstrates both practical knowledge from professional experience and engagement with scholarly concepts. You write from a position of professional competence while showing respect for academic conventions. Your prose balances concrete professional insights with analytical depth, demonstrating both real-world expertise and intellectual engagement. You connect practical experience with theoretical frameworks naturally."
                    }
                ]
            },
            {
                id: "writer_voice",
                title: "Writer Voice",
                type: "single",
                required: true,
                componentTarget: "VOICE",
                options: [
                    {
                        value: "formal_academic",
                        label: "Formal Academic",
                        description: "Traditional scholarly tone with precise, disciplined language",
                        promptFragment: "Write in a formal academic voice with precise, disciplined language. Maintain professional distance and objectivity throughout. Use sophisticated vocabulary and complex sentence structures appropriate to scholarly discourse. Follow strict academic conventions in tone and style. Present ideas with authoritative confidence while maintaining intellectual rigor. Avoid colloquialisms and maintain consistent formality across all sections. Every paragraph builds on the previous one with smooth transitions showing logical progression and cohesion."
                    },
                    {
                        value: "conversational_academic",
                        label: "Conversational Academic",
                        description: "Accessible scholarly voice that maintains intellectual substance",
                        promptFragment: "Write in a conversational yet scholarly voice that balances accessibility with intellectual substance. Explain complex ideas clearly using concrete examples and relatable language without dumbing down content. Your prose has natural rhythm variation, mixing shorter punchy sentences with longer flowing ones. Occasionally use conversational markers ('Here is what I mean,' 'Think about it this way') while keeping scholarly focus. Show your thinking process and acknowledge uncertainty where appropriate. Write like a knowledgeable person thinking through ideas with the reader, not performing expertise at them. Maintain clear flow of ideas with humanized touch, ensuring every paragraph builds on the previous one with smooth transitions."
                    },
                    {
                        value: "critical_analytical",
                        label: "Critical/Analytical",
                        description: "Questioning voice that examines assumptions and power dynamics",
                        promptFragment: "Write in a critical, analytical voice that questions assumptions and examines underlying power dynamics. Interrogate taken-for-granted categories and ask whose interests are served by particular frameworks. Your voice is intellectually sharp and analytically rigorous without being dogmatic. Engage with complexity and contradiction, revealing tensions rather than smoothing them over. Your prose balances critical questioning with constructive analysis. Show awareness of how language, categories, and frameworks shape understanding. Every paragraph connects to the broader analytical project through smooth transitions and logical development."
                    },
                    {
                        value: "reflective_personal",
                        label: "Reflective/Personal",
                        description: "First-person voice connecting personal experience with analysis",
                        promptFragment: "Write in a reflective, personal voice that uses first-person perspective to connect personal experience with broader analysis. Use 'I' to claim ownership of ideas, describe observations, and position arguments ('I argue,' 'I observed,' 'From my analysis,' 'In my view'). Show genuine engagement with material through personal reflection while maintaining analytical depth. Your voice balances personal insight with scholarly rigor, demonstrating both lived experience and intellectual analysis. Move naturally between personal narrative and broader implications. Every paragraph flows naturally to the next, creating cohesive narrative that connects experience with understanding."
                    },
                    {
                        value: "professional_clear",
                        label: "Professional/Clear",
                        description: "Direct, efficient voice for practical and policy-oriented writing",
                        promptFragment: "Write in a professional, clear voice that prioritizes directness and practical clarity. Make complex ideas accessible without oversimplifying. Your voice is authoritative but not academic-insular, writing to inform understanding and action. Present nuanced analysis while remaining clear and direct. Your prose moves efficiently from context to analysis to implications, always aware of reader needs and practical application. Avoid unnecessary jargon while maintaining intellectual credibility. Show professional competence through both analytical depth and communication clarity. Maintain logical flow with clear transitions, ensuring each paragraph builds toward actionable understanding."
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Input & Source Settings",
        description: "Configure what information you'll provide and how sources should be handled",
        sections: [
            {
                id: "input_type",
                title: "Input Information",
                type: "single",
                required: true,
                componentTarget: "INPUT_TYPE",
                options: [
                    {
                        value: "outline_provided",
                        label: "Outline Provided",
                        description: "You will provide a structured outline or detailed plan",
                        promptFragment: "The user will provide a structured outline or detailed plan. Use this outline as the organizational foundation. Expand each outlined point into fully developed paragraphs with analysis, evidence, and clear reasoning. Maintain the outline's structure while adding depth, nuance, and scholarly substance. If the outline suggests certain themes or arguments, develop these thoroughly while staying faithful to the user's intended direction."
                    },
                    {
                        value: "topic_only",
                        label: "Topic Only (No Outline)",
                        description: "You provide only a general topic or research question",
                        promptFragment: "The user will provide only a general topic, research question, or brief prompt without detailed structure. Develop a logical organizational structure appropriate to the writing type and topic. Create your own coherent framework for addressing the topic, organizing ideas in a way that builds understanding progressively. Take initiative in determining what aspects of the topic to address and in what order, while ensuring comprehensive and balanced coverage."
                    },
                    {
                        value: "partial_information",
                        label: "Partial Information",
                        description: "You have some ideas, notes, or partial structure",
                        promptFragment: "The user will provide partial information: rough ideas, scattered notes, or incomplete structure. Use what is provided as starting points while filling gaps with appropriate content. Organize fragmented ideas into coherent structure, develop under-elaborated points, and create connections between separate pieces of information. Build a complete, well-organized piece from the partial foundation provided."
                    },
                    {
                        value: "full_draft_revision",
                        label: "Full Draft for Revision",
                        description: "You have a complete draft needing improvement",
                        promptFragment: "The user will provide a complete draft that needs revision, refinement, or restructuring. Preserve the core ideas and arguments while improving organization, clarity, analytical depth, and scholarly quality. Strengthen weak sections, improve transitions, enhance evidence integration, and elevate the overall academic sophistication. Maintain the author's voice and intentions while bringing the work to higher scholarly standard."
                    }
                ]
            },
            {
                id: "source_settings",
                title: "Source Usage",
                type: "multi", // multi-select checkboxes
                required: false,
                componentTarget: "SOURCE_SETTINGS",
                options: [
                    {
                        value: "provided_sources_only",
                        label: "Use Only Provided Sources",
                        description: "Cite only sources explicitly given by the user",
                        promptFragment: "Use only sources explicitly provided by the user. Do not invent, assume, or reference sources not supplied. If additional evidence would strengthen an argument but no relevant source was provided, note this gap rather than fabricating references."
                    },
                    {
                        value: "no_source_fabrication",
                        label: "Never Fabricate Sources",
                        description: "If evidence needed but not provided, note the gap",
                        promptFragment: "Never fabricate, invent, or hallucinate sources, citations, data, or evidence. If a claim would benefit from empirical support but no source is available, either: (1) present the claim as conceptual or theoretical reasoning, (2) note that evidence would strengthen this point, or (3) hedge appropriately ('This suggests,' 'It may be that'). Intellectual honesty always supersedes comprehensiveness."
                    },
                    {
                        value: "verify_source_accuracy",
                        label: "Verify Source Details Match Content",
                        description: "Ensure citations accurately reflect what sources say",
                        promptFragment: "When using provided sources, ensure citations accurately reflect what those sources actually say. Do not misrepresent source content to fit arguments. If a source partially supports a claim, acknowledge the limited support rather than overstating. Quote accurately and paraphrase faithfully. Maintain scholarly integrity in all source usage."
                    },
                    {
                        value: "acknowledge_source_limits",
                        label: "Acknowledge Source Limitations",
                        description: "Note gaps, biases, or limitations in available sources",
                        promptFragment: "Acknowledge limitations in available sources. If sources are dated, note this. If sources represent only certain perspectives, mention it. If sample sizes are small or methods have limitations, incorporate appropriate caveats. Show critical awareness of what evidence can and cannot demonstrate."
                    }
                ]
            },
            {
                id: "evidence_handling",
                title: "Evidence & Claims",
                type: "multi",
                required: false,
                componentTarget: "EVIDENCE_HANDLING",
                options: [
                    {
                        value: "substantiate_claims",
                        label: "Substantiate All Major Claims",
                        description: "Support important arguments with evidence",
                        promptFragment: "Substantiate all major claims with specific examples, evidence, data, or reasoning. Avoid unsupported assertions. When making empirical claims, ground them in evidence from provided sources. When making conceptual arguments, develop them through clear reasoning and scholarly engagement."
                    },
                    {
                        value: "explain_evidence_relevance",
                        label: "Explain Evidence Relevance",
                        description: "Don't just cite - explain how evidence supports arguments",
                        promptFragment: "When presenting evidence, always explain its relevance. Do not drop quotes or data without analysis. After citing a source or presenting evidence, add one or two sentences explaining how this evidence supports the argument, what it demonstrates, or why it matters. Make explicit the logical connection between evidence and claims."
                    },
                    {
                        value: "hedge_appropriately",
                        label: "Hedge Uncertain Claims",
                        description: "Use precise language matching certainty level",
                        promptFragment: "Hedge claims appropriately to match evidence strength. Use precise language: 'suggests' vs 'proves,' 'indicates' vs 'demonstrates,' 'may' vs 'does,' 'tends to' vs 'always.' Avoid overstating what evidence shows. When conclusions are preliminary, contested, or based on limited evidence, acknowledge this explicitly."
                    },
                    {
                        value: "address_alternative_interpretations",
                        label: "Address Alternative Interpretations",
                        description: "Acknowledge other ways evidence could be read",
                        promptFragment: "When evidence admits multiple interpretations, acknowledge this. Present alternative explanations where relevant, explain why you favor one interpretation, or note where ambiguity remains. Show intellectual honesty by recognizing when your reading of evidence is one among possible options."
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Academic Rigor & Citation",
        description: "Set standards for evidence, citation, and scholarly quality",
        sections: [
            {
                id: "citation_style",
                title: "Citation Format",
                type: "single",
                required: true,
                componentTarget: "CITATION_STYLE",
                options: [
                    {
                        value: "no_citation",
                        label: "No Citation Required",
                        description: "Personal reflection or informal writing without formal citations",
                        promptFragment: "This writing does not require formal citations. You may reference ideas, experiences, or concepts informally without citation formatting. If you mention sources or influences, do so conversationally without formal bibliographic structure. Focus on expressing ideas and experiences directly without academic citation apparatus."
                    },
                    {
                        value: "apa_7",
                        label: "APA 7th Edition",
                        description: "Author-date with reference list",
                        promptFragment: "Use APA 7th edition citation format. For quotations, include page numbers: (Author, Year, p. X). For paraphrases, use (Author, Year). Format reference list according to APA 7th guidelines. Use active citation integration: 'Smith (2020) argues...' or 'Research demonstrates (Author, 2020).'"
                    },
                    {
                        value: "harvard",
                        label: "Harvard Referencing",
                        description: "Author-date system",
                        promptFragment: "Use Harvard referencing style. Format as (Author Year) or Author (Year). Include page numbers for quotes: (Author Year, p. X). Use active citation forms: 'Smith (2020) demonstrates...' Provide complete reference list following Harvard conventions."
                    },
                    {
                        value: "chicago_author_date",
                        label: "Chicago (Author-Date)",
                        description: "Chicago style with parenthetical citations",
                        promptFragment: "Use Chicago Manual of Style author-date format. Citations as (Author Year) or (Author Year, page). Reference list follows Chicago author-date conventions. Integrate sources actively: 'As Smith argues (2020, 45)...'"
                    },
                    {
                        value: "mla_9",
                        label: "MLA 9th Edition",
                        description: "Parenthetical author-page format",
                        promptFragment: "Use MLA 9th edition format. Parenthetical citations with author and page (Author Page). No year in in-text citations. Works Cited page follows MLA 9 conventions. Integrate quotations smoothly with signal phrases and parenthetical references."
                    },
                    {
                        value: "chicago_notes",
                        label: "Chicago (Notes-Bibliography)",
                        description: "Footnotes/endnotes with bibliography",
                        promptFragment: "Use Chicago Manual of Style notes-bibliography format. Use footnotes or endnotes for citations, numbered sequentially. Provide complete bibliography at end. First citation to source gives full bibliographic information; subsequent citations use shortened form."
                    }
                ]
            },
            {
                id: "quotation_approach",
                title: "Quotation vs Paraphrase Balance",
                type: "single",
                required: true,
                componentTarget: "QUOTATION_APPROACH",
                options: [
                    {
                        value: "quote_heavy",
                        label: "Quote-Heavy (Multiple per paragraph)",
                        description: "Use direct quotations extensively with analysis",
                        promptFragment: "Use direct quotations extensively to support arguments. Include multiple quotations per major section, ensuring each is followed by analytical commentary explaining its significance. Quote when authors state something particularly well, when exact wording matters, or when defining key terms. Always integrate quotes smoothly with signal phrases and follow with interpretation. Balance quotation with your own analytical voice."
                    },
                    {
                        value: "balanced",
                        label: "Balanced (1 quote per 300-400 words)",
                        description: "Mix quotations and paraphrases judiciously",
                        promptFragment: "Balance direct quotations with paraphrasing. Include approximately one carefully chosen quotation per 300-400 words, reserving quotation for particularly important formulations, striking phrases, or statements that would lose impact if paraphrased. Otherwise, paraphrase sources in your own words with proper citation. Every quotation should be followed by analysis explaining its significance."
                    },
                    {
                        value: "paraphrase_heavy",
                        label: "Paraphrase-Heavy (Rare direct quotes)",
                        description: "Primarily paraphrase, quote only when essential",
                        promptFragment: "Rely primarily on paraphrase, reserving direct quotation only for particularly important or striking formulations that would lose essential meaning if rephrased. Demonstrate understanding by putting source ideas into your own words with proper citation. Use quotation sparingly - perhaps only for key definitions or when exact wording is analytically significant. Integrate all paraphrased material with clear attribution."
                    },
                    {
                        value: "no_quotes_synthesis",
                        label: "Synthesis Without Direct Quotes",
                        description: "Synthesize sources entirely in own words",
                        promptFragment: "Synthesize all source material in your own words without direct quotation. Paraphrase all ideas, data, and arguments with proper citation. Demonstrate understanding and integration by weaving source ideas together in original prose. Show engagement with sources through synthesis rather than quotation. All paraphrased material must include appropriate citation."
                    }
                ]
            },
            {
                id: "rigor_requirements",
                title: "Quality & Depth Standards",
                type: "multi",
                required: false,
                componentTarget: "RIGOR_REQUIREMENTS",
                options: [
                    {
                        value: "comprehensive_evidence",
                        label: "Comprehensive Evidence Coverage",
                        description: "Support arguments with multiple sources and perspectives",
                        promptFragment: "Support arguments comprehensively with evidence from multiple sources where possible. Show breadth of engagement with relevant literature. Present evidence from different perspectives or methodological approaches. Build arguments on solid evidentiary foundation rather than single sources."
                    },
                    {
                        value: "critical_source_evaluation",
                        label: "Critical Source Evaluation",
                        description: "Assess source quality, methods, and limitations",
                        promptFragment: "Critically evaluate sources rather than accepting claims uncritically. Assess methodological appropriateness, sample adequacy, logical coherence, and potential biases. Note when sources have limitations that affect interpretation. Show analytical judgment about source quality and reliability."
                    },
                    {
                        value: "engage_counterarguments",
                        label: "Engage Counterarguments",
                        description: "Address alternative views and opposing evidence",
                        promptFragment: "Actively engage counterarguments and alternative perspectives. Present opposing views fairly before responding to them. Address contradictory evidence honestly. Strengthen arguments by showing awareness of objections and responding thoughtfully. Demonstrate intellectual depth through engagement with complexity and disagreement."
                    },
                    {
                        value: "show_methodological_awareness",
                        label: "Methodological Awareness",
                        description: "Discuss how research methods shape findings",
                        promptFragment: "Show awareness of how research methods shape findings and limit conclusions. When discussing research, mention methodological approaches and consider how different methods might yield different insights. Address methodological limitations explicitly. Understand that what we can know depends partly on how we study it."
                    },
                    {
                        value: "identify_research_gaps",
                        label: "Identify Research Gaps",
                        description: "Note what remains unknown or understudied",
                        promptFragment: "Explicitly identify gaps in existing research. Note what remains unknown, understudied, or contested. Point to contradictions in literature that require resolution. Show where methodological limitations across studies create uncertainty. Frame your contribution in relation to what is and isn't yet known."
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Writing Style & Humanization",
        description: "Control language patterns, sentence structure, and human-like qualities",
        sections: [
            {
                id: "core_style_rules",
                title: "Core Style Requirements",
                type: "multi",
                required: false,
                componentTarget: "CORE_STYLE",
                options: [
                    {
                        value: "academic_paragraph_structure",
                        label: "Academic Paragraph Construction",
                        description: "Topic sentence, 3-5 supporting sentences, concluding/transition sentence",
                        promptFragment: "Each paragraph must follow academic paragraph construction: (1) Begin with a clear topic sentence that states the main idea, (2) Develop with 3-5 supporting sentences containing evidence, examples, or analysis, (3) Include explanation sentences that connect evidence to your thesis, (4) End with a concluding or transition sentence that links to the next paragraph. Never write single-sentence paragraphs."
                    },
                    {
                        value: "paragraph_unity_coherence",
                        label: "Paragraph Unity and Coherence",
                        description: "All sentences relate to topic sentence, use transitional phrases",
                        promptFragment: "Every sentence within a paragraph must relate directly to the paragraph's topic sentence. If introducing a new main idea, start a new paragraph. Use transitional words and phrases (however, furthermore, for example, in contrast, as a result) to show logical relationships between sentences and between paragraphs."
                    },
                    {
                        value: "support_claims",
                        label: "Support All Claims",
                        description: "Never make unsupported claims, develop with evidence and analysis",
                        promptFragment: "Never make claims without support. After stating a point, immediately develop it with specific details, evidence, or reasoning. Avoid surface-level description; instead, analyze what the information means, why it matters, and how it connects to your broader argument. Ask yourself 'So what?' after each point to ensure you explain significance."
                    },
                    {
                        value: "sentence_variety",
                        label: "Varied Sentence Structure",
                        description: "Mix simple, compound, and complex sentences naturally",
                        promptFragment: "Mix sentence structures for readability - combine simple, compound, and complex sentences. Vary sentence length naturally, with most sentences between 15-25 words. Reduce comma usage; avoid long strings of clauses separated by commas. Break up overly long sentences (30+ words). Avoid em dashes. Front-load important information in sentences rather than burying it in dependent clauses."
                    },
                    {
                        value: "precise_vocabulary",
                        label: "Precise, Specific Language",
                        description: "Concrete nouns, active verbs, avoid repetition",
                        promptFragment: "Choose specific, concrete nouns and active verbs over vague, abstract language. Avoid repetition of the same word within a paragraph - use pronouns or appropriate synonyms after the second use. Prefer precise academic vocabulary over casual expressions, but avoid unnecessarily complex jargon. No contractions."
                    },
                    {
                        value: "natural_flow",
                        label: "Natural, Progressive Development",
                        description: "Avoid AI patterns, show reasoning process, vary paragraph length",
                        promptFragment: "Reduce AI-like patterns by (1) avoiding comma splices and long comma-separated clauses, (2) breaking up sentences naturally, (3) varying paragraph length (3-7 sentences typically), (4) using concrete examples before abstract explanations, (5) showing your reasoning process rather than just stating conclusions. Let ideas develop progressively rather than appearing fully formed."
                    },
                    {
                        value: "academic_formatting",
                        label: "Standard Academic Formatting",
                        description: "Proper mechanics, verb tense consistency, no unusual characters",
                        promptFragment: "No contractions. Maintain correct subject-verb agreement. Write complete sentences. Do not use unusual characters like ** or ## for emphasis. Do not format lists as 'Heading:' with colons. Use standard academic formatting with proper paragraph breaks. Maintain consistent verb tense within sections (typically past tense for literature review and methodology, present tense for analysis and discussion)."
                    }
                ]
            },
            {
                id: "humanization_markers",
                title: "Humanization Features",
                type: "multi",
                required: false,
                componentTarget: "HUMANIZATION",
                options: [
                    {
                        value: "esl_patterns",
                        label: "ESL-Friendly Patterns",
                        description: "Careful phrasing typical of proficient multilingual writers",
                        helpText: "Adds subtle patterns common in proficient multilingual writing: slightly formal phrasing ('It is possible to observe that'), explicit connectors ('Therefore,' 'Thus'), and careful sentence construction. Makes writing feel more human for non-native speakers.",
                        bestFor: "International students, ESL contexts",
                        icon: "🗣️",
                        advanced: false,
                        promptFragment: "Include subtle linguistic patterns common among proficient non-native English speakers: careful word order, slightly formal constructions ('It is possible to observe that,' 'This can be seen in'), explicit logical connectors ('Therefore,' 'Thus,' 'As a result,' 'In this way'), and preference for clear structure over idiomatic brevity. Write with precision and correctness, occasionally favoring clarity over the most natural-sounding English phrasing. These patterns should feel natural, not exaggerated."
                    },
                    {
                        value: "rhythm_variation",
                        label: "Natural Rhythm Variation",
                        description: "Unpredictable sentence and paragraph length patterns",
                        promptFragment: "Create unpredictable rhythm through varied sentence and paragraph lengths. Some sentences short (8-12 words). Others longer and more complex (25-35 words), developing ideas through clauses and qualifications. Some paragraphs compact (3-4 sentences), others more expansive (6-8 sentences). Avoid mechanical uniformity. Let content determine form, creating natural pacing that breathes."
                    },
                    {
                        value: "subtle_imperfections",
                        label: "Subtle Natural Imperfections",
                        description: "Minor quirks that signal human authorship",
                        helpText: "Introduces 1-2 tiny, harmless quirks per 500 words (like a missing optional comma or slightly awkward phrasing) that make writing feel human. Never breaks meaning or clarity - just adds subtle authenticity.",
                        bestFor: "AI detection avoidance",
                        icon: "✨",
                        advanced: true,
                        promptFragment: "Allow very subtle, natural imperfections that appear in careful human writing: an optional comma occasionally missing, slightly awkward but grammatically correct phrasing, minor redundancy that slipped past revision, rhythm irregularities. Aim for 1-2 tiny, harmless quirks per 500 words. Never break meaning, compromise clarity, or introduce errors in key terminology. These imperfections should be nearly imperceptible but collectively signal human composition."
                    },
                    {
                        value: "meta_cognitive_markers",
                        label: "Meta-Cognitive Markers",
                        description: "Show thinking process through transitional phrases",
                        promptFragment: "Include meta-cognitive markers that reveal thinking in progress: 'This suggests that,' 'One way to interpret this is,' 'From this perspective,' 'What this means is,' 'Looking back,' 'At that moment, I did not see,' 'Building on this point.' These phrases show a mind working through ideas rather than presenting pre-packaged conclusions. Use judiciously to maintain scholarly tone while revealing authentic intellectual process."
                    },
                    {
                        value: "contextual_informality",
                        label: "Selective Contextual Informality",
                        description: "Occasional informal-but-acceptable phrasing",
                        promptFragment: "While maintaining academic register, include occasional slightly informal but professionally acceptable phrases: 'fairly clear,' 'quite significant,' 'rather complex,' 'tends to show,' 'it seems that,' 'appears to be.' These add human texture without sacrificing professionalism. Use sparingly - perhaps 2-3 times per 1000 words - and only where they feel natural."
                    },
                    {
                        value: "first_person_appropriate",
                        label: "Strategic First-Person Voice",
                        description: "Use 'I' when appropriate for reflection or argumentation",
                        promptFragment: "Use first-person voice strategically when appropriate: 'I argue,' 'I observed,' 'From my analysis,' 'In my view,' 'I questioned whether.' First person works well for reflective writing, positioning arguments, describing personal research, or acknowledging uncertainty. Balance personal voice with scholarly objectivity. Use first person to claim ownership of ideas while maintaining academic rigor."
                    },
                    {
                        value: "honest_hedging",
                        label: "Honest Intellectual Hedging",
                        description: "Express appropriate uncertainty and caution",
                        promptFragment: "Express appropriate intellectual caution through honest hedging: 'This suggests,' 'It appears that,' 'One possible explanation,' 'While not certain,' 'To some extent,' 'This may indicate,' 'It seems likely that.' Show you are thinking carefully rather than claiming false certainty. Hedge when evidence is partial, interpretations are contestable, or conclusions are preliminary. Intellectual honesty signals scholarly maturity."
                    },
                    {
                        value: "conversational_transitions",
                        label: "Conversational Transitional Phrases",
                        description: "Natural connectors over rigid academic transitions",
                        promptFragment: "Use conversational transitional phrases alongside traditional academic ones. Instead of only 'Furthermore,' 'Moreover,' 'Nevertheless,' also use: 'At the same time,' 'Building on this point,' 'From another angle,' 'This connects to,' 'In a different way,' 'Looking at this from,' 'What this means is.' Create flow that feels like thoughtful conversation while maintaining scholarly substance."
                    }
                ]
            },
            {
                id: "banned_words",
                title: "AI-Detection Avoidance (Always Applied)",
                type: "fixed",
                required: true,
                componentTarget: "BANNED_WORDS",
                bannedPhrases: [
                    // Original banned words
                    "delve", "delve into", "delve deeper", "embark", "embark on",
                    "explore", "explore the realm", "explore the world of",
                    "navigate", "navigate the complex", "navigate uncharted waters",
                    "uncover", "unlock", "unlock the power of", "unlock potential",
                    "master the art of", "delineate",
                    "intricate", "aesthetic", "artistic exploration",
                    "rich tapestry", "tapestry of",
                    "captivating", "compelling",
                    "this article serves as", "this guide serves as",
                    "aims to provide",
                    "within the confines of this article",
                    "serves as your compass", "serves as your roadmap",
                    "important to note", "it is important to note",
                    "stands out as", "testament to",
                    "unravel mysteries", "unravel the mysteries",
                    "traverse diverse", "technological marvel",
                    "in conclusion", "to summarize", "in summary",
                    "our journey promises", "this guide is your companion",
                    "elevate", "facets of our lives",
                    "converge to forge", "converge to carve a path",
                    "burgeon", "join us on",
                    // Additional AI-commonly-used words/phrases
                    "in today's world", "in today's fast-paced world", "in today's digital age",
                    "in a world where", "in a world", "in modern society",
                    "it's worth noting that", "it is worth noting",
                    "notably", "crucially", "importantly",
                    "it's important to understand", "it is essential to recognize",
                    "landscape" /* when used as metaphor like "digital landscape" */,
                    "revolutionize", "transformative", "transform the way",
                    "game-changer", "game changer", "paradigm shift",
                    "robust", "comprehensive" /* when overused */,
                    "multifaceted", "nuanced" /* when overused */,
                    "pivotal", "paramount", "critical" /* when overused */,
                    "underscore", "underscores the importance",
                    "facilitate", "facilitates the",
                    "utilize" /* prefer 'use' */, "utilization",
                    "leverage", "leverage the power of",
                    "synergy", "synergistic",
                    "holistic", "holistic approach",
                    "cutting-edge", "state-of-the-art",
                    "groundbreaking", "innovative" /* when overused */,
                    "seamlessly", "effortlessly",
                    "streamline", "optimize",
                    "harness", "harness the power",
                    "foster", "cultivate",
                    "reshape", "redefine",
                    "drive innovation", "spearhead",
                    "at the forefront", "forefront of",
                    "in light of", "in the light of",
                    "it is imperative", "it is crucial that",
                    "suffice it to say", "needless to say",
                    "goes without saying", "it goes without saying",
                    "the fact of the matter", "the fact remains",
                    "when all is said and done",
                    "at the end of the day",
                    "in the final analysis",
                    "first and foremost",
                    "last but not least",
                    "each and every",
                    "it is evident that",
                    "clearly demonstrates",
                    "undeniably",
                    "without a doubt",
                    "realm" /* when used metaphorically */,
                    "sphere" /* when used metaphorically like "sphere of influence" */,
                    "facet", "myriad",
                    "plethora",
                    "albeit",
                    "whilst" /* prefer 'while' */,
                    "henceforth", "heretofore",
                    "in regards to" /* prefer 'regarding' */,
                    "with regards to",
                    "due to the fact that" /* prefer 'because' */,
                    "in order to" /* prefer 'to' */,
                    "for the purpose of",
                    "it is interesting to note",
                    "interestingly enough",
                    "surprisingly",
                    "remarkably",
                    "significantly",
                    "dramatically",
                    "overwhelmingly",
                    "increasingly",
                    "progressively",
                    "exponentially" /* when used loosely */,
                    "literally" /* when used for emphasis */,
                    "basically", "essentially",
                    "fundamentally" /* when overused */,
                    "inherently",
                    "intrinsically",
                    "quintessential",
                    "epitome",
                    "zenith", "apex",
                    "cornerstone",
                    "bedrock",
                    "linchpin",
                    "catalyst",
                    "conduit",
                    "nexus",
                    "labyrinth",
                    "spectrum",
                    "echelon",
                    "juxtapose",
                    "dichotomy",
                    "advent",
                    "epoch",
                    "trajectory",
                    "proliferation",
                    "burgeoning",
                    "nascent",
                    "seminal",
                    "unprecedented",
                    "unparalleled",
                    "unequivocal",
                    "indubitably",
                    "inexorably",
                    "inextricably",
                    "vis-à-vis",
                    "raison d'être",
                    "status quo",
                    "per se",
                    "de facto",
                    "a priori",
                    "sine qua non",
                    "zeitgeist",
                    "Pandora's box",
                    "double-edged sword",
                    "tip of the iceberg",
                    "silver bullet",
                    "low-hanging fruit",
                    "move the needle",
                    "think outside the box",
                    "push the envelope"
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Structure & Special Features",
        description: "Organize document and add optional specialized elements",
        sections: [
            {
                id: "document_structure",
                title: "Overall Organization",
                type: "single",
                required: true,
                componentTarget: "STRUCTURE",
                options: [
                    {
                        value: "standard_academic",
                        label: "Standard Academic Structure",
                        description: "Introduction → Body Sections → Conclusion",
                        promptFragment: "Use standard academic structure: Introduction that establishes context and presents thesis or research question, body sections organized by main themes or arguments with descriptive headings, and conclusion that synthesizes main points and discusses implications. Each section should build logically on previous ones. Open with brief context and thesis, develop ideas systematically in body, close with broader significance or future directions."
                    },
                    {
                        value: "thematic_sections",
                        label: "Thematic Organization",
                        description: "Organize by key themes or concepts",
                        promptFragment: "Organize by key themes or concepts rather than chronologically or methodologically. Use thematic headings that capture main ideas (e.g., 'Power and Agency,' 'Economic Factors,' 'Ethical Considerations'). Each thematic section develops that theme fully before moving to the next. Show connections between themes while maintaining clear focus within each section."
                    },
                    {
                        value: "question_based",
                        label: "Question-Based Structure",
                        description: "Frame sections as questions to be answered",
                        promptFragment: "Structure sections around key questions. Use question headings (e.g., 'What factors influence...?' 'How does X relate to Y?' 'Why does this pattern occur?'). Answer each question thoroughly in its section. This structure makes logical progression explicit and helps readers follow analytical development."
                    },
                    {
                        value: "problem_solution",
                        label: "Problem-Solution Framework",
                        description: "Problem → Analysis → Solutions → Implications",
                        promptFragment: "Use problem-solution structure: Problem Definition/Context → Analysis of Causes/Dimensions → Evaluation of Possible Solutions → Recommended Approach → Implementation Implications/Conclusion. Each section builds toward actionable understanding. Show both analytical depth and practical relevance."
                    },
                    {
                        value: "comparative_structure",
                        label: "Comparative Organization",
                        description: "Systematic case-by-case or point-by-point comparison",
                        promptFragment: "Use comparative structure: Introduction → Case/Position A → Case/Position B → Point-by-Point Comparison → Synthesis/Conclusion. Alternatively, organize by comparison points rather than cases, addressing each point across all cases before moving to next. Make similarities and differences explicit through systematic organization."
                    },
                    {
                        value: "chronological",
                        label: "Chronological Development",
                        description: "Trace historical development or temporal progression",
                        promptFragment: "Organize chronologically to trace development over time. Use temporal headings or period-based organization. Show not just what happened when, but how earlier developments influenced later ones, how understanding evolved, or how conditions changed. Maintain analytical depth while following chronological sequence."
                    },
                    {
                        value: "reflective_5r",
                        label: "Reflective 5R Framework",
                        description: "Report → Respond → Relate → Reason → Reconstruct",
                        promptFragment: "Use the 5R reflective framework with five sections: (1) Reporting: describe what happened factually; (2) Responding: express your emotional and cognitive reactions; (3) Relating: connect to prior experiences, knowledge, and personal context; (4) Reasoning: analyze why this matters and what it means; (5) Reconstructing: explain how this will shape future thinking and action. This structure turns experience into learning and forward-looking development."
                    },
                    {
                        value: "minimal_headings",
                        label: "Minimal Headings/Flowing Prose",
                        description: "Introduction and Conclusion only, body flows without section breaks",
                        promptFragment: "Use minimal explicit headings: Introduction and Conclusion clearly marked, but body develops through paragraph flow without section headings. Let topic sentences and transitions guide readers through logical progression. This creates seamless narrative flow while maintaining clear organization through careful paragraph structure and transitional phrases."
                    }
                ]
            },
            {
                id: "special_elements",
                title: "Additional Features",
                type: "multi",
                required: false,
                componentTarget: "SPECIAL_FEATURES",
                options: [
                    {
                        value: "include_tables",
                        label: "Include Tables",
                        description: "Create tables to organize data or comparisons",
                        promptFragment: "Where appropriate, create tables to organize data, present comparisons, or clarify frameworks. Reference tables in text ('As shown in Table 1...') and explain their significance. Ensure tables have clear headings, labeled rows and columns, and contribute meaningfully to the argument rather than merely repeating text."
                    },
                    {
                        value: "include_figures",
                        label: "Describe Needed Figures",
                        description: "Suggest what visuals would enhance the text",
                        promptFragment: "When relevant, describe what figures, diagrams, or visual representations would enhance understanding. Provide detailed captions explaining what each figure should show and how it supports the argument. Integrate discussion of visual elements into the text. Note: actually creating visual content is beyond scope, but you can describe what should be visualized."
                    },
                    {
                        value: "emphasize_gaps",
                        label: "Emphasize Research Gaps",
                        description: "Highlight what remains unknown or understudied",
                        promptFragment: "Throughout the writing, explicitly identify and discuss gaps in existing research. Note what remains unknown, understudied, contested, or inadequately explained. Point to contradictions that need resolution, limitations in current methodologies, or emerging questions. Frame gaps as opportunities for future inquiry."
                    },
                    {
                        value: "practical_implications",
                        label: "Emphasize Practical Applications",
                        description: "Connect theory to real-world practice and policy",
                        promptFragment: "Emphasize practical implications and real-world applications. Connect theoretical arguments to practice, policy, or lived experience. Discuss what findings or arguments mean for practitioners, policymakers, or affected communities. Show how abstract ideas have concrete significance. Balance scholarly analysis with practical relevance."
                    },
                    {
                        value: "methodological_reflection",
                        label: "Methodological Reflection",
                        description: "Discuss how methods shape findings and limitations",
                        promptFragment: "Include substantial reflection on methodology: discuss how research methods shape what can be known, address methodological limitations explicitly, consider how different methods might yield different insights, and show awareness that findings are methodologically constructed. Demonstrate sophisticated understanding of relationship between methods and conclusions."
                    },
                    {
                        value: "interdisciplinary_connections",
                        label: "Interdisciplinary Perspectives",
                        description: "Draw insights from multiple fields",
                        promptFragment: "Draw connections across disciplinary boundaries. Bring insights from multiple fields into conversation. Show how different disciplinary lenses illuminate different aspects of the topic. Synthesize perspectives that might not typically be combined. Demonstrate breadth while maintaining analytical coherence."
                    },
                    {
                        value: "ethical_dimensions",
                        label: "Ethical Considerations",
                        description: "Address moral implications and responsibilities",
                        promptFragment: "Address ethical dimensions of the topic explicitly. Discuss moral implications, ethical frameworks, responsibilities, justice concerns, or value commitments where relevant. Show awareness that many questions have ethical stakes beyond technical or analytical considerations. Engage seriously with normative dimensions."
                    },
                    {
                        value: "historical_context",
                        label: "Historical Contextualization",
                        description: "Provide historical background and development",
                        promptFragment: "Provide substantial historical context. Show how current questions, practices, or understandings developed over time. Trace genealogies of concepts or phenomena. Demonstrate how historical conditions shape present realities. Use history to illuminate rather than merely background current analysis."
                    }
                ]
            }
        ]
    }
];
