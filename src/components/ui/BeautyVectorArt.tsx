import React from 'react';

/**
 * 1. Face Chart Continuous Line Art
 * Iconic makeup artist face chart showing facial planes, brow arch, eyelashes, and lip contour.
 */
export function FaceChartVector({ className = 'w-full h-auto', activeHotspot }: { className?: string; activeHotspot?: string | null }) {
  return (
    <svg
      viewBox="0 0 500 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Editorial Makeup Artist Face Chart Vector Illustration"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC39C" />
          <stop offset="50%" stopColor="#C5A880" />
          <stop offset="100%" stopColor="#8E6A3E" />
        </linearGradient>

        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5EBE1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C5A880" stopOpacity="0.05" />
        </linearGradient>

        <linearGradient id="lipBlushGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D98282" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#A64B5B" stopOpacity="0.25" />
        </linearGradient>

        <linearGradient id="cheekGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A880" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F5E6D3" stopOpacity="0" />
        </linearGradient>

        <filter id="softGazeBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Face Glow / Ambient Soft Shading */}
      <circle cx="250" cy="280" r="190" fill="url(#glowGrad)" />

      {/* Cheekbone Luminous Highlight Washes */}
      <ellipse
        cx="170"
        cy="310"
        rx="45"
        ry="22"
        transform="rotate(-20 170 310)"
        fill="url(#cheekGlowGrad)"
        filter="url(#softGazeBlur)"
      />
      <ellipse
        cx="330"
        cy="310"
        rx="45"
        ry="22"
        transform="rotate(20 330 310)"
        fill="url(#cheekGlowGrad)"
        filter="url(#softGazeBlur)"
      />

      {/* Outer Head Silhouette & Flowing Hair Strands (Editorial Fashion Line Art) */}
      <g stroke="url(#goldStrokeGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        {/* Hair flow curves */}
        <path d="M120 220C100 150 140 70 250 60C360 70 400 150 380 220" />
        <path d="M140 100C90 140 70 260 90 380C100 440 130 500 150 540" strokeDasharray="3 3" opacity="0.4" />
        <path d="M360 100C410 140 430 260 410 380C400 440 370 500 350 540" strokeDasharray="3 3" opacity="0.4" />
        <path d="M110 200C130 260 150 320 170 360" opacity="0.3" />
        <path d="M390 200C370 260 350 320 330 360" opacity="0.3" />

        {/* Jawline & Chin Structure */}
        <path d="M160 270C165 370 195 440 250 465C305 440 335 370 340 270" strokeWidth="1.8" />

        {/* Neck & Graceful Collarbones */}
        <path d="M205 450C200 490 185 530 160 560" strokeWidth="1.2" />
        <path d="M295 450C300 490 315 530 340 560" strokeWidth="1.2" />
        <path d="M190 545C220 555 250 550 250 550C250 550 280 555 310 545" strokeWidth="1" opacity="0.6" />
      </g>

      {/* BROWS (Micro-bladed / Laminated Hair Strokes) */}
      <g stroke="url(#goldStrokeGrad)" strokeLinecap="round" strokeLinejoin="round">
        {/* Left Brow Arch */}
        <path
          d="M175 228C195 214 218 214 235 220"
          strokeWidth={activeHotspot === 'brows' ? '3.5' : '2.4'}
          className="transition-all duration-300"
          filter={activeHotspot === 'brows' ? 'url(#vectorGlow)' : undefined}
        />
        {/* Individual hair micro-strokes */}
        <path d="M176 229L178 225M184 225L187 220M194 221L197 216M206 219L208 215M218 219L222 216M228 221L233 221" strokeWidth="1" opacity="0.7" />

        {/* Right Brow Arch */}
        <path
          d="M325 228C305 214 282 214 265 220"
          strokeWidth={activeHotspot === 'brows' ? '3.5' : '2.4'}
          className="transition-all duration-300"
          filter={activeHotspot === 'brows' ? 'url(#vectorGlow)' : undefined}
        />
        {/* Individual hair micro-strokes */}
        <path d="M324 229L322 225M316 225L313 220M306 221L303 216M294 219L292 215M282 219L278 216M272 221L267 221" strokeWidth="1" opacity="0.7" />
      </g>

      {/* EYES & FLUTTER LASHES (High Drama Editorial Wing) */}
      <g stroke="url(#goldStrokeGrad)" strokeLinecap="round" strokeLinejoin="round">
        {/* Left Eye & Crease */}
        <path d="M176 250C190 238 215 240 228 252" strokeWidth="1.2" opacity="0.5" />
        <path
          d="M172 254C190 244 215 244 232 255"
          strokeWidth={activeHotspot === 'eyes' ? '3.2' : '2.2'}
          className="transition-all duration-300"
          filter={activeHotspot === 'eyes' ? 'url(#vectorGlow)' : undefined}
        />
        <path d="M180 256C192 264 212 264 224 257" strokeWidth="1.2" />

        {/* Left Eyelashes */}
        <path d="M172 254L162 246M178 250L172 240M186 247L183 237M195 245L194 234M205 245L206 235M216 247L219 238M225 251L231 243M232 255L240 250" strokeWidth="1.4" />

        {/* Left Iris Reflection */}
        <ellipse cx="202" cy="254" rx="10" ry="8" strokeWidth="1" opacity="0.6" />
        <circle cx="199" cy="252" r="2.5" fill="currentColor" className="text-[var(--accent)]" />

        {/* Right Eye & Crease */}
        <path d="M324 250C310 238 285 240 272 252" strokeWidth="1.2" opacity="0.5" />
        <path
          d="M328 254C310 244 285 244 268 255"
          strokeWidth={activeHotspot === 'eyes' ? '3.2' : '2.2'}
          className="transition-all duration-300"
          filter={activeHotspot === 'eyes' ? 'url(#vectorGlow)' : undefined}
        />
        <path d="M320 256C308 264 288 264 276 257" strokeWidth="1.2" />

        {/* Right Eyelashes */}
        <path d="M328 254L338 246M322 250L328 240M314 247L317 237M305 245L306 234M295 245L294 235M284 247L281 238M275 251L269 243M268 255L260 250" strokeWidth="1.4" />

        {/* Right Iris Reflection */}
        <ellipse cx="298" cy="254" rx="10" ry="8" strokeWidth="1" opacity="0.6" />
        <circle cx="295" cy="252" r="2.5" fill="currentColor" className="text-[var(--accent)]" />
      </g>

      {/* NOSE BRIDGE & HIGHLIGHT PLANE */}
      <g stroke="url(#goldStrokeGrad)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M246 226C245 270 240 315 238 335" strokeWidth="1.2" opacity="0.6" />
        {/* Soft tip contour */}
        <path
          d="M236 342C244 347 256 347 264 342"
          strokeWidth={activeHotspot === 'complexion' ? '2.5' : '1.5'}
        />
        <path d="M232 338C234 340 237 342 240 342" strokeWidth="1.2" opacity="0.5" />
        <path d="M268 338C266 340 263 342 260 342" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* LIPS & CUPID'S BOW (Satin Dimensional Pout) */}
      <g>
        {/* Subtle Lip Color Fill */}
        <path
          d="M214 390C230 380 244 382 250 387C256 382 270 380 286 390C286 390 270 422 250 422C230 422 214 390 214 390Z"
          fill="url(#lipBlushGrad)"
        />

        {/* Lip Contours */}
        <g stroke="url(#goldStrokeGrad)" strokeLinecap="round" strokeLinejoin="round">
          {/* Cupid's Bow Upper Lip */}
          <path
            d="M214 390C230 380 244 383 250 388C256 383 270 380 286 390"
            strokeWidth={activeHotspot === 'lips' ? '3' : '1.8'}
            className="transition-all duration-300"
            filter={activeHotspot === 'lips' ? 'url(#vectorGlow)' : undefined}
          />
          {/* Middle Lip Separation line */}
          <path d="M216 391C232 396 244 395 250 398C256 395 268 396 284 391" strokeWidth="1.2" opacity="0.7" />
          {/* Lower Lip Contour */}
          <path
            d="M222 396C232 418 268 418 278 396"
            strokeWidth={activeHotspot === 'lips' ? '2.5' : '1.6'}
            className="transition-all duration-300"
          />
          {/* Lower Lip Highlight Reflection */}
          <path d="M242 410C246 412 254 412 258 410" strokeWidth="1.5" stroke="#FFFFFF" opacity="0.6" />
        </g>
      </g>

      {/* CHEEKBONE CONTOUR & HIGHLIGHT DOTTED VECTOR GUIDES (Backstage Mapping) */}
      <g stroke="url(#goldStrokeGrad)" strokeDasharray="3 4" opacity="0.55" strokeWidth="1">
        <path d="M150 300C180 320 215 340 230 365" />
        <path d="M350 300C320 320 285 340 270 365" />
        {/* Jaw contour line */}
        <path d="M175 390C210 430 250 435 250 435C250 435 290 430 325 390" />
      </g>
    </svg>
  );
}

/**
 * 2. Angled Sculpting Powder & Contour Brush Vector
 */
export function MakeupBrushVector({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Makeup Brush Vector">
      <defs>
        <linearGradient id="brushGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC39C" />
          <stop offset="100%" stopColor="#9C7748" />
        </linearGradient>
        <linearGradient id="brushBristles" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2421" />
          <stop offset="50%" stopColor="#6E5542" />
          <stop offset="100%" stopColor="#DFC39C" />
        </linearGradient>
      </defs>
      {/* Handle */}
      <path d="M15 85L45 55L50 60L20 90C18 92 14 90 13 88C12 86 13 83 15 85Z" fill="#1C1917" stroke="url(#brushGold)" strokeWidth="1.5" />
      {/* Gold Ferrule */}
      <path d="M43 53L57 39L63 45L49 59Z" fill="url(#brushGold)" stroke="#6B4F2A" strokeWidth="1" />
      <line x1="47" y1="49" x2="53" y2="55" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      {/* Angled Bristles */}
      <path d="M57 39C60 30 75 20 85 20C88 28 85 45 63 45Z" fill="url(#brushBristles)" stroke="url(#brushGold)" strokeWidth="1.2" />
      {/* Bristle texture lines */}
      <path d="M62 36C68 28 78 24 82 23" stroke="#DFC39C" strokeWidth="0.8" opacity="0.7" />
      <path d="M60 41C66 34 74 32 79 31" stroke="#DFC39C" strokeWidth="0.8" opacity="0.5" />
      {/* Gold Dust Particles */}
      <circle cx="88" cy="18" r="2" fill="#DFC39C" opacity="0.8" />
      <circle cx="92" cy="24" r="1.5" fill="#C5A880" opacity="0.7" />
      <circle cx="82" cy="14" r="1.5" fill="#DFC39C" opacity="0.6" />
    </svg>
  );
}

/**
 * 3. Haute Couture Gold Lipstick Bullet Vector
 */
export function LipstickVector({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Lipstick Vector">
      <defs>
        <linearGradient id="lipstickCasing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7E5F33" />
          <stop offset="35%" stopColor="#DFC39C" />
          <stop offset="70%" stopColor="#F7EADB" />
          <stop offset="100%" stopColor="#8C6A3C" />
        </linearGradient>
        <linearGradient id="bulletRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B2635" />
          <stop offset="40%" stopColor="#C43D52" />
          <stop offset="100%" stopColor="#5E1421" />
        </linearGradient>
      </defs>
      {/* Base Casing */}
      <rect x="36" y="55" width="28" height="36" rx="2" fill="url(#lipstickCasing)" stroke="#5B401F" strokeWidth="1" />
      {/* Casing Fluted Ridges */}
      <line x1="42" y1="56" x2="42" y2="90" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5" />
      <line x1="50" y1="56" x2="50" y2="90" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
      <line x1="58" y1="56" x2="58" y2="90" stroke="#5B401F" strokeWidth="0.8" opacity="0.4" />
      {/* Gold Inner Swivel Ring */}
      <rect x="39" y="44" width="22" height="11" fill="url(#lipstickCasing)" stroke="#5B401F" strokeWidth="1" />
      <line x1="39" y1="49" x2="61" y2="49" stroke="#5B401F" strokeWidth="0.8" />
      {/* Beveled Lipstick Bullet */}
      <path d="M42 44L42 28C42 26 44 20 54 13L58 20L58 44Z" fill="url(#bulletRed)" stroke="#4A0E18" strokeWidth="1" />
      {/* Bullet Chiseled Facet highlight */}
      <path d="M43 27L54 14L57 19L46 31Z" fill="#E86175" opacity="0.6" />
      {/* Light Reflection Glint */}
      <path d="M52 14Q54 17 56 16Q54 14 52 14Z" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

/**
 * 4. Skincare Elixir Dropper & Glass Pipette Vector
 */
export function SerumDropperVector({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Serum Dropper Vector">
      <defs>
        <linearGradient id="dropperGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8C6A3C" />
          <stop offset="50%" stopColor="#DFC39C" />
          <stop offset="100%" stopColor="#6B4F2A" />
        </linearGradient>
        <linearGradient id="dropFluid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC39C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C5A880" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Rubber Bulb */}
      <path d="M43 12C43 8 46 6 50 6C54 6 57 8 57 12L57 20L43 20Z" fill="#1C1917" stroke="url(#dropperGold)" strokeWidth="1" />
      {/* Gold Collar Cap */}
      <rect x="38" y="20" width="24" height="10" rx="1.5" fill="url(#dropperGold)" stroke="#5B401F" strokeWidth="1" />
      <line x1="38" y1="25" x2="62" y2="25" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
      {/* Glass Pipette Tube */}
      <path d="M45 30L45 68L48 76L52 76L55 68L55 30Z" fill="#F7EADB" fillOpacity="0.25" stroke="url(#dropperGold)" strokeWidth="1.2" />
      {/* Serum inside Pipette */}
      <path d="M46 50L46 68L48 74L52 74L54 68L54 50Z" fill="url(#dropFluid)" />
      {/* Dispensing Droplet */}
      <path d="M50 82C48 85 45 88 45 91C45 94 47 96 50 96C53 96 55 94 55 91C55 88 52 85 50 82Z" fill="url(#dropperGold)" stroke="#5B401F" strokeWidth="0.8" />
      {/* Highlight Glint on Droplet */}
      <ellipse cx="48" cy="91" rx="1.2" ry="2" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

/**
 * 5. Eyelash Curler & Feather Lashes Vector
 */
export function LashCurlerVector({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Eyelash Curler Vector">
      <defs>
        <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECC4B2" />
          <stop offset="50%" stopColor="#D99B82" />
          <stop offset="100%" stopColor="#9C624E" />
        </linearGradient>
      </defs>
      {/* Curler Head Bar */}
      <path d="M30 25C40 18 60 18 70 25" stroke="url(#roseGold)" strokeWidth="3" strokeLinecap="round" />
      {/* Soft Silicone Pad Bar */}
      <path d="M32 30C42 24 58 24 68 30" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
      {/* Vertical Stabilizer Posts */}
      <line x1="32" y1="26" x2="32" y2="42" stroke="url(#roseGold)" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="26" x2="68" y2="42" stroke="url(#roseGold)" strokeWidth="2" strokeLinecap="round" />
      {/* Scissor Cross Mechanism */}
      <path d="M32 42L50 60L40 85C38 88 32 88 30 84C28 80 32 74 36 74" stroke="url(#roseGold)" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 42L50 60L60 85C62 88 68 88 70 84C72 80 68 74 64 74" stroke="url(#roseGold)" strokeWidth="2" strokeLinecap="round" />
      {/* Pivot Screw */}
      <circle cx="50" cy="60" r="2.5" fill="#DFC39C" stroke="#5B401F" strokeWidth="0.8" />
      {/* Fluttering Eyelash Accent */}
      <path d="M34 22L30 16M40 18L38 11M50 16L50 9M60 18L62 11M66 22L70 16" stroke="url(#roseGold)" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/**
 * 6. Ambient Floating Cosmetic Swirl & Sparkle Backdrop (Purged to avoid AI watermark perception)
 */
export function FloatingBeautyAccents({ className = '' }: { className?: string }) {
  return null;
}
