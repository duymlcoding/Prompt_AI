# Academic Prompt Generator

A beautiful, interactive web application for creating customized AI writing prompts for academic work. Generate humanized, professionally-structured prompts in just 5 comprehensive steps.

## ✨ Features

- **🎯 Purpose-Driven**: Choose from 14 writing types including reflections, literature reviews, methodology sections, and more
- **✍️ Humanized Writing**: 17+ humanization options for natural, authentic academic voice
- **📚 Citation Control**: Support for APA 7th, Harvard, Chicago, MLA, IEEE, Vancouver, and custom formats
- **⚡ Instant Generation**: Copy-ready prompts generated in seconds
- **💾 Save & Load**: Save your configurations and load them later
- **🎨 Dark Mode**: Beautiful dark theme with one-click toggle
- **📤 Import/Export**: Share configurations as JSON files
- **🚀 Quick Start Presets**: 4 pre-configured templates for common use cases
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile

## 🚀 Live Demo

Visit: [https://duymlcoding.github.io/Prompt_AI/](https://duymlcoding.github.io/Prompt_AI/)

## 🎨 Screenshots

![Welcome Screen](screenshots/welcome.png)
![Step Selection](screenshots/step.png)
![Generated Prompt](screenshots/output.png)

## 🛠️ How It Works

### 5-Step Comprehensive Configuration

1. **Writing Purpose & Role** - Select your document type (reflection, methodology, results, etc.) and choose your academic persona (PhD researcher, master's student, international graduate, etc.)
2. **Input & Source Settings** - Configure what information you'll provide (outline, topic only, partial notes, or full draft) and how sources should be handled
3. **Academic Rigor & Citation** - Set citation format (APA, Harvard, Chicago, MLA), quotation approach, and quality standards for evidence and scholarly engagement
4. **Writing Style & Humanization** - Control language patterns, sentence structure, and human-like qualities including ESL patterns, rhythm variation, and natural imperfections
5. **Structure & Special Features** - Organize document layout (thematic, question-based, problem-solution, etc.) and add optional elements (tables, figures, ethical considerations, etc.)

Each step contains multiple detailed sections with carefully crafted options, giving you comprehensive control over your prompt.

## 📦 Installation

### Option 1: Use GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be live at `https://duymlcoding.github.io/Prompt_AI/`

### Option 2: Run Locally

1. Clone the repository:
```bash
git clone https://github.com/duymlcoding/Prompt_AI.git
cd Prompt_AI
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

No build process or dependencies required!

## 📂 Project Structure

```
Prompt_AI/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and responsive design
├── js/
│   ├── stepConfig.js      # 5 comprehensive steps with detailed sections
│   ├── promptTemplates.js # Prompt assembly logic
│   └── app.js             # Main application logic
└── README.md              # This file
```

## 🎯 Use Cases

### For Students
- Generate prompts for academic essays and reflections
- Create literature review writing guides
- Structure methodology and results sections

### For Researchers
- Develop comprehensive research proposal prompts
- Create critical analysis frameworks
- Generate interdisciplinary writing guides

### For Educators
- Design assignment prompts for students
- Create rubric-aligned writing templates
- Develop scaffolded writing exercises

## 🎨 New Features

### Dark Mode
Toggle between light and dark themes with a single click. Your preference is saved automatically.

### Save & Load Configurations
- **Save**: Name and save your current configuration for future use
- **Load**: Quickly restore any saved configuration
- **Delete**: Remove configurations you no longer need
- **Auto-save**: All saved configurations persist in your browser's localStorage

### Quick Start Presets
Get started instantly with 4 pre-configured templates:

1. **Graduate Thesis** 🎓
   - Formal academic writing for dissertations
   - High rigor with thematic literature review
   - APA citation, formal structure

2. **ESL Student Essay** ✍️
   - Natural, humanized academic writing
   - Maximum humanization with ESL-friendly style
   - Progressive elaboration structure

3. **Reflection Paper** 🔍
   - Personal academic reflection using 5R framework
   - Personal voice with moderate rigor
   - Question-driven exploration

4. **Research Proposal** 📊
   - Rigorous research planning document
   - Maximum academic rigor with heavy citations
   - Problem-solution structure with methodological focus

### Import/Export Configurations
- **Export**: Save your configuration as a JSON file
- **Import**: Load configurations from JSON files
- **Share**: Send configurations to colleagues or students
- **Backup**: Keep configurations safe across devices

## 🔧 Customization

### Adding New Steps

Edit `js/stepConfig.js` and add a new step object:

```javascript
{
    id: 10,
    title: "Your Step Title",
    description: "Step description",
    componentTarget: "TEMPLATE_PLACEHOLDER",
    options: [
        {
            value: "option_key",
            label: "Option Label",
            description: "Option description",
            promptFragment: "Text to insert into prompt"
        },
        // Add 9-17 options
    ]
}
```

### Modifying the Template

Edit `js/promptTemplates.js` to change the base prompt structure:

```javascript
baseTemplate: `
[YOUR SECTION]
{{YOUR_PLACEHOLDER}}
...
`
```

### Styling

All styles are in `css/style.css`. CSS custom properties (variables) are defined at the top for easy theming:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* Modify these to change the color scheme */
}
```

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions

- [ ] Add more writing purpose templates (grant proposals, book chapters, etc.)
- [ ] Include example generated prompts gallery
- [ ] Create prompt history/favorites feature
- [ ] Add more preset templates for specific use cases
- [ ] Implement discipline-specific configurations (STEM, humanities, social sciences, etc.)
- [ ] Add guided tour for first-time users

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for humanized, authentic academic writing
- Built with vanilla JavaScript (no frameworks!)
- Designed with accessibility and UX in mind

## 📞 Contact

Project Link: [https://github.com/duymlcoding/Prompt_AI](https://github.com/duymlcoding/Prompt_AI)

---

**Made with ❤️ for academic excellence**
