# Generates public/opengraph-image.png — the static 1200x630 social card used by
# og:image / twitter:image (see src/lib/seo.ts, OG_IMAGE_DEFAULT).
#
# The design mirrors src/app/opengraph-image.tsx (navy card, serif title, gold
# tagline) but as a real static file so the URL resolves reliably everywhere —
# including WhatsApp/Facebook/Meta crawlers — without depending on the dynamic
# next/og route (which can 500 when the install path contains spaces, e.g.
# "C:\Users\misha\Desktop\Mishael Sema\...", where @vercel/og fails to load its
# bundled Noto font).
#
# Re-run after changing brand copy:  powershell -ExecutionPolicy Bypass -File scripts/generate-og-image.ps1

param(
  [string]$OutFile = (Join-Path $PSScriptRoot "..\public\opengraph-image.png")
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$W = 1200
$H = 630

$navy  = [System.Drawing.ColorTranslator]::FromHtml("#0b1e38")
$cream = [System.Drawing.ColorTranslator]::FromHtml("#faf7f0")
$gold  = [System.Drawing.ColorTranslator]::FromHtml("#c9a227")
$muted = [System.Drawing.Color]::FromArgb(150, 250, 247, 240) # cream @ ~59%

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
$g.Clear($navy)

$sf = [System.Drawing.StringFormat]::GenericTypographic

# Draw centered text with manual letter-spacing (GDI+ has no tracking property).
function Draw-TrackedText([System.Drawing.Graphics]$g, [string]$s, [System.Drawing.Font]$f, [System.Drawing.Brush]$b, [float]$centerY, [float]$tracking, [float]$maxWidth) {
  # measure total advance width (shrink font if it overflows the canvas)
  $font = $f
  $total = 0.0
  do {
    $total = 0.0
    foreach ($ch in $s.ToCharArray()) {
      $total += $g.MeasureString($ch.ToString(), $font, 0, $sf).Width + $tracking
    }
    $total -= $tracking
    if ($total -gt $maxWidth -and $font.Size -gt 20) {
      $font = New-Object System.Drawing.Font($font.FontFamily, ($font.Size - 2), $font.Style, $font.Unit)
    }
  } while ($total -gt $maxWidth -and $font.Size -gt 20)

  $lineHeight = $font.GetHeight($g)
  $x = ($W - $total) / 2.0
  $y = $centerY - $lineHeight / 2.0
  foreach ($ch in $s.ToCharArray()) {
    $w = $g.MeasureString($ch.ToString(), $font, 0, $sf).Width
    $g.DrawString($ch.ToString(), $font, $b, $x, $y, $sf)
    $x += $w + $tracking
  }
}

$titleFont  = New-Object System.Drawing.Font("Georgia", 92, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$tagFont    = New-Object System.Drawing.Font("Georgia", 38, ([System.Drawing.FontStyle]::Italic -bor [System.Drawing.FontStyle]::Bold), [System.Drawing.GraphicsUnit]::Pixel)
$subFont    = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$creamBrush = New-Object System.Drawing.SolidBrush($cream)
$goldBrush  = New-Object System.Drawing.SolidBrush($gold)
$mutedBrush = New-Object System.Drawing.SolidBrush($muted)

# ACE GLOBAL NEXUS — big serif title
Draw-TrackedText $g "ACE GLOBAL NEXUS" $titleFont $creamBrush 232 7 1170
# gold italic tagline
Draw-TrackedText $g "Connecting businesses, markets & opportunity" $tagFont $goldBrush 372 3 1100
# muted subline
Draw-TrackedText $g "TRADE  ·  INVESTMENT  ·  STRATEGIC ADVISORY" $subFont $mutedBrush 492 4 1000

$g.Dispose()

$dir = Split-Path -Parent $OutFile
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
$bmp.Save($OutFile, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$size = (Get-Item $OutFile).Length
Write-Host "Wrote $OutFile ($($W)x$($H), $size bytes)"