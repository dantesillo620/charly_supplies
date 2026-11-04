#!/usr/bin/env bash
# Genera las versiones web de una foto de producto (macOS: usa sips y cwebp).
#
#   scripts/optimizar-foto.sh "public/images/productos/Mi foto.png" enc-009 [n]
#
# Crea en public/images/productos/web/:
#   <id>-<n>-1200.webp  (detalle)   <id>-<n>-600.webp  (tarjetas)
#   <id>-<n>-og.jpg     (vista previa al compartir el enlace en WhatsApp/redes)
# Luego agrega el producto en src/app/catalog/catalog.data.ts con foto('<id>', '<alt>', n).
# Requiere cwebp:  brew install webp
set -euo pipefail

origen="$1"; id="$2"; n="${3:-1}"
destino="$(cd "$(dirname "$0")/.." && pwd)/public/images/productos/web"
mkdir -p "$destino"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

# sips respeta la orientación y convierte cualquier formato (png, jpg, heic) a png
sips -s format png "$origen" --out "$tmp/base.png" >/dev/null

for ancho in 1200 600; do
  cwebp -quiet -q 82 -resize "$ancho" 0 "$tmp/base.png" -o "$destino/$id-$n-$ancho.webp"
done
sips -Z 800 -s format jpeg -s formatOptions 82 "$tmp/base.png" --out "$destino/$id-$n-og.jpg" >/dev/null

echo "Listo: $destino/$id-$n-{1200,600}.webp y $id-$n-og.jpg"
