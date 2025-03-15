# Primer Design Tool

## Overview
The Primer Design Tool is a powerful bioinformatics application designed to help researchers and scientists create highly optimized primers for PCR (Polymerase Chain Reaction) experiments. Built using modern web technologies, it integrates advanced algorithms and bioinformatics principles to ensure accurate and efficient primer design.

## Features

### Phase 1 Features
- **Melting Temperature (Tm) Calculation:** Accurately computes the Tm of primers to ensure proper binding during PCR.
- **GC Content Check:** Calculates the percentage of guanine and cytosine bases, maintaining optimal primer stability.
- **Hairpin Structure Prevention:** Identifies and avoids sequences prone to forming hairpins.
- **Primer-Dimer Detection:** Scans for self-complementary regions to prevent unwanted dimer formations.
- **Real-time Validation:** Instant feedback on primer quality as the user inputs sequences.

### Phase 2 Booster Features
- **Primer Uniqueness Check:** Ensures primers uniquely bind to the target sequence without off-target matches.
- **Self-Complementarity Detection:** Prevents primers from binding to themselves.
- **Primer Pair Compatibility:** Validates forward and reverse primer pairs for efficient amplification.
- **Real-time Primer Visualization:** Graphically displays primer binding sites on the target sequence.
- **Adjustable Primer Length:** Allows users to set custom primer lengths to suit their experimental needs.
- **Error Highlighting:** Flags problematic regions in the sequences.

### Advanced Features
- **Primer Efficiency Score:** Ranks primers based on their binding efficiency and stability.
- **Visualization of Primer Binding Sites:** Interactive graphics showing where primers anneal to the target sequence.
- **Export to FASTA Format:** One-click download of designed primers in FASTA format.
- **Multiple Primer Sets:** Supports designing multiple primer pairs for complex experiments.

## Technology Stack
- **Frontend:** React with Vite and Tailwind CSS for a sleek, glassmorphic UI.
- **Backend:** FastAPI for high-performance API interactions.
- **Bioinformatics:** Biopython for sequence manipulation and analysis.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- Python 3.10+
- Git

### Clone the Repository
```bash
git clone https://github.com/SxR24/Primer_designing_tool.git
cd primer-design-tool
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### Backend Setup
```bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate # On Windows use venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app:app --reload
```

## Usage
1. **Input Sequence:** Paste the target DNA sequence into the input field.
2. **Set Parameters:** Adjust Tm range, primer length, and other criteria.
3. **Design Primers:** Click 'Design' to generate suitable primers.
4. **Review Results:** View primers, Tm, GC content, and error highlights.
5. **Download:** Export primer pairs in FASTA format.

## File Structure
```
primer-design-tool/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── app.py
│   ├── primer_logic.py
│   └── utils.py
├── .gitignore
├── package.json
├── requirements.txt
└── README.md
```

## Contribution
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/awesome-feature`).
3. Commit changes (`git commit -m 'Add awesome feature'`).
4. Push to the branch (`git push origin feature/awesome-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See `LICENSE` for details.

## Contact
For any queries or feedback, reach out to us via [Contact Us](#).

---

Let us know what features you'd like to see next!

