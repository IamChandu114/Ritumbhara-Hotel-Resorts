import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

scripts = [
    ROOT / "scripts" / "citation_health_report.py",
    ROOT / "scripts" / "tech_seo_audit.py"
]

for script in scripts:
    subprocess.run(["python", str(script)], check=False)
