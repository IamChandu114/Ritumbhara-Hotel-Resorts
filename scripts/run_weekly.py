import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

scripts = [
    ROOT / "scripts" / "review_analysis.py"
]

for script in scripts:
    subprocess.run(["python", str(script)], check=False)
