from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input model
class SequenceInput(BaseModel):
    sequence: str
    primer_length: int = 20

# Validate DNA sequence
def is_valid_dna(sequence: str) -> bool:
    return all(base in "ACGT" for base in sequence.upper())

# Calculate GC content
def gc_content(sequence: str) -> float:
    if not sequence:
        return 0.0
    gc_count = sum(1 for base in sequence if base in "GC")
    return round((gc_count / len(sequence)) * 100, 2)

# Calculate melting temperature (Tm)
def melting_temperature(sequence: str) -> float:
    return round(4 * (sequence.count('G') + sequence.count('C')) + 2 * (sequence.count('A') + sequence.count('T')))

# Check hairpin structures
def has_hairpin(sequence: str) -> bool:
    return sequence[:5] == sequence[-5:][::-1]

# Primer-dimer detection
def primer_dimer(forward: str, reverse: str) -> bool:
    reverse_complement = reverse[::-1].translate(str.maketrans("ACGT", "TGCA"))
    return any(forward[i:] in reverse_complement for i in range(len(forward)))

# Primer uniqueness
def primer_uniqueness(sequence: str, primer: str) -> bool:
    return sequence.count(primer) == 1

# Primer efficiency score
def primer_efficiency(gc_content: float, length: int) -> float:
    return round((gc_content / 100) * (length / 20) * 100, 2)

# Visualize primer binding sites
def primer_binding_sites(sequence: str, forward: str, reverse: str) -> dict:
    forward_start = sequence.find(forward)
    reverse_start = sequence.find(reverse)
    return {"forward_start": forward_start, "reverse_start": reverse_start}

# Generate multiple primer sets
def design_primers(sequence: str, primer_length: int):
    primer_sets = []
    for i in range(len(sequence) - primer_length + 1):
        forward_primer = sequence[i:i + primer_length]
        reverse_primer = sequence[-(i + primer_length):-i or None]
        forward_gc = gc_content(forward_primer)
        reverse_gc = gc_content(reverse_primer)
        forward_tm = melting_temperature(forward_primer)
        reverse_tm = melting_temperature(reverse_primer)
        hairpin = has_hairpin(forward_primer) or has_hairpin(reverse_primer)
        dimer = primer_dimer(forward_primer, reverse_primer)
        unique = primer_uniqueness(sequence, forward_primer) and primer_uniqueness(sequence, reverse_primer)
        efficiency = primer_efficiency(forward_gc, primer_length)
        binding_sites = primer_binding_sites(sequence, forward_primer, reverse_primer)

        primer_sets.append({
            "forward_primer": forward_primer,
            "reverse_primer": reverse_primer,
            "forward_gc": forward_gc,
            "reverse_gc": reverse_gc,
            "forward_tm": forward_tm,
            "reverse_tm": reverse_tm,
            "hairpin": "Yes" if hairpin else "No",
            "primer_dimer": "Yes" if dimer else "No",
            "unique": "Yes" if unique else "No",
            "efficiency": efficiency,
            "binding_sites": binding_sites
        })
    return primer_sets

# FASTA format generator
def generate_fasta(primer_sets: List[dict]) -> str:
    fasta_output = ""
    for i, primers in enumerate(primer_sets):
        fasta_output += f">Forward_Primer_Set_{i + 1}\n{primers['forward_primer']}\n"
        fasta_output += f">Reverse_Primer_Set_{i + 1}\n{primers['reverse_primer']}\n"
    return fasta_output

# Primer design endpoint
@app.post("/design-primers/")
def design_primers_endpoint(input_data: SequenceInput):
    sequence = input_data.sequence.strip().upper().replace(" ", "")
    primer_length = input_data.primer_length
    
    if not is_valid_dna(sequence):
        raise HTTPException(status_code=400, detail="Invalid DNA sequence. Use only A, C, G, and T.")
    
    if len(sequence) < primer_length:
        raise HTTPException(status_code=400, detail=f"Sequence is too short for primer design (min {primer_length} bases).")
    
    primer_sets = design_primers(sequence, primer_length)
    fasta = generate_fasta(primer_sets)
    
    return {"primers": primer_sets, "fasta": fasta, "sequence_length": len(sequence)}
