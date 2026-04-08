#!/usr/bin/env bash
set -euo pipefail

# Logotopia batch generator - tworzy serię 10 nowych projektów logo
# Wywoływany: bash scripts/logotopia-batch.sh <batch_id> <family_name>
# Output: assets/logotopia/<family>/<family>-<NN>.png

BATCH_ID="${1:-batch-001}"
FAMILY="${2:-luxury-v-monogram}"
OUT_DIR="/root/agents/phantasia/workspace/assets/logotopia/${FAMILY}"
mkdir -p "$OUT_DIR"

STYLE_CORE="Single centered logo mark on pure white background. Black ink only. No text, no wordmark, no badge, no crest, no ornament. Clean geometric construction."
STYLE_V="Subtle V-shaped element integrated organically into the geometry. Premium technology consulting aesthetic. Luxury minimalism 2026. Favicon-readable at 32px."

FAMILIES=(
  "luxury-v-monogram|Monogrammatic V with architectural precision. Single stroke weight. Mathematical proportions."
  "crystal-fold|Crystalline faceted form suggesting depth and refraction. Origami-inspired angular folds."
  "signal-aperture|Photographic aperture blades forming an abstract V. Cinematic tension. Sharp edges."
  "neural-topology|Minimal neural network node diagram. 3-5 nodes connected by thin lines. Abstract intelligence."
  "fluid-ribbon|Single continuous ribbon forming a V shape. Calligraphic fluidity. One unbroken stroke."
  "sacred-grid|Geometric grid construction with golden ratio. Clean intersections. Mathematical beauty."
  "shadow-depth|Layered planes creating depth through shadow. Isometric perspective. Architectural minimalism."
  "prism-split|Light prism splitting into spectrum suggestion. Single triangular form. Clean optics."
  "horizon-line|Horizontal composition with subtle V formed by perspective lines. Landscape tension."
  "micro-circuit|Minimal circuit trace forming V pattern. Technology DNA. Clean PCB aesthetic without complexity."
)

# Find matching family description
FAMILY_DESC=""
for entry in "${FAMILIES[@]}"; do
  key="${entry%%|*}"
  if [ "$key" = "$FAMILY" ]; then
    FAMILY_DESC="${entry#*|}"
    break
  fi
done

if [ -z "$FAMILY_DESC" ]; then
  FAMILY_DESC="Premium luxury minimalism mark with V motif."
fi

echo "=== Logotopia batch: $BATCH_ID ==="
echo "Family: $FAMILY"
echo "Output: $OUT_DIR"
echo "Generating 10 variants..."

for i in $(seq -w 1 10); do
  FILENAME="${FAMILY}-${i}.png"
  PROMPT="${STYLE_CORE} ${FAMILY_DESC} ${STYLE_V} Variant ${i}/10 - explore different proportions and weights."
  echo "[${i}/10] Generating ${FILENAME}..."
  echo "$PROMPT" > "${OUT_DIR}/${FAMILY}-${i}.prompt.txt"
done

echo "=== Batch $BATCH_ID complete ==="
echo "Prompts saved to $OUT_DIR"
echo "Ready for image generation pass."
