import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  r: number
  baseAlpha: number
  speed: number
  phase: number
  tint: string
}

type GalaxyParticle = {
  /** Offset from the galaxy centre, pre-tilted and squashed (px). */
  dx: number
  dy: number
  r: number
  alpha: number
  color: string
}

const TINTS = ['255, 255, 255', '196, 181, 253', '165, 243, 252', '221, 214, 254']

const GALAXY_COLORS = ['#ffffff', '#e9e4ff', '#c4b5fd', '#8b5cf6', '#60a5fa', '#22d3ee']

/**
 * Andromeda universe background — a framed window, not a full-bleed wash.
 *
 * Lesson from Dribbble's "Galaxy Portfolio": the galaxy reads as dominant
 * when it is framed and kept out of the text, not when it is huge behind
 * everything. So this background lives only in the hero window (absolute,
 * 100svh tall, scrolls away); everything below it sits on calm, plain
 * dark. The galaxy itself is back to a quiet size (~0.42 × the viewport's
 * shorter side, ~1,200 spiral stars) and its bright core is parked in
 * the top-right corner, at the frame edge — never behind the headline.
 *
 * Layers (bottom → top):
 *  1. deep-space CSS gradient (the base if canvas never paints)
 *  2. a procedural Andromeda galaxy drawn on canvas: two logarithmic
 *     spiral arms of ~1,200 violet/blue/teal stars around a glowing
 *     core, tilted like the real M31, rotating once every ~8 minutes
 *  3. two slow-drifting CSS nebula glows, tucked into opposite corners
 *     and kept faint (violet / cyan, matching the accent)
 *  4. a twinkling background starfield on the same canvas
 *  5. a directional readability scrim — strongest where the headline
 *     sits (left), thinnest toward the galaxy core (top-right corner)
 *  6. a bottom fade so the hero window melts into the plain dark below
 *
 * Everything is code — no image asset, no video, ~0 extra bytes to
 * download. The canvas loop is throttled to ~30 fps, pauses when the
 * tab is hidden, caps device-pixel-ratio at 1.5, and renders one static
 * frame when the user asks for reduced motion. Nebula drift is disabled
 * by the same media query.
 */
const AndromedaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let stars: Star[] = []
    let particles: GalaxyParticle[] = []
    let gx = 0
    let gy = 0
    let coreR = 0
    let raf = 0
    let last = 0

    const seed = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      // Background stars
      const count = Math.min(220, Math.floor((w * h) / 9000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3,
        baseAlpha: 0.25 + Math.random() * 0.65,
        speed: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
      }))

      // Andromeda: small, quiet, parked in the top-right corner — the
      // bright core sits at the frame edge, away from the hero text.
      // Radius 0.42 × the shorter viewport side (was 0.90 when the page
      // looked messy); on narrow screens 0.45 so the disc still reads.
      const narrow = w < 640
      gx = w * (narrow ? 0.85 : 0.86)
      gy = h * (narrow ? 0.12 : 0.16)
      const maxR = Math.min(w, h) * (narrow ? 0.45 : 0.42)
      coreR = maxR * 0.32
      const tilt = -0.42
      const squash = 0.32
      const cosT = Math.cos(tilt)
      const sinT = Math.sin(tilt)
      particles = []
      const arms = 2
      const perArm = 600 // 1,200 stars total, back to the original density
      const spread = Math.PI * 2.6 // ~470° of winding
      for (let a = 0; a < arms; a++) {
        const armOffset = (a / arms) * Math.PI * 2
        for (let i = 0; i < perArm; i++) {
          const f = i / perArm
          const angle = armOffset + f * spread + (Math.random() - 0.5) * 0.22
          const radius = maxR * Math.pow(f, 1.25) * (0.88 + Math.random() * 0.24)
          // Elliptical disc, then tilt — the classic inclined Andromeda look
          const ex = Math.cos(angle) * radius
          const ey = Math.sin(angle) * radius * squash
          const dx = ex * cosT - ey * sinT
          const dy = ex * sinT + ey * cosT
          const colorStop = Math.min(
            GALAXY_COLORS.length - 1,
            Math.floor(f * GALAXY_COLORS.length),
          )
          particles.push({
            dx,
            dy,
            r: 0.5 + (1 - f) * 1.2 + Math.random() * 0.6,
            alpha: 0.2 + (1 - f) * 0.55 * Math.random() + 0.15,
            color: GALAXY_COLORS[colorStop],
          })
        }
      }
    }

    const draw = (t: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.scale(dpr, dpr)

      // Twinkling background stars
      for (const s of stars) {
        const twinkle = reduced ? 1 : 0.55 + 0.45 * Math.sin((t / 1000) * s.speed + s.phase)
        ctx.globalAlpha = s.baseAlpha * twinkle
        ctx.fillStyle = `rgb(${s.tint})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Andromeda galaxy — additive glow, rotating very slowly
      // (~1 turn per 8 minutes; static when reduced motion is requested)
      const rot = reduced ? 0 : (t / 1000) * ((Math.PI * 2) / 480)
      const cosR = Math.cos(rot)
      const sinR = Math.sin(rot)
      ctx.globalCompositeOperation = 'lighter'

      // Core glow
      const core = ctx.createRadialGradient(gx, gy, 0, gx, gy, coreR)
      core.addColorStop(0, 'rgba(255, 255, 255, 0.55)')
      core.addColorStop(0.35, 'rgba(196, 181, 253, 0.28)')
      core.addColorStop(1, 'rgba(139, 92, 246, 0)')
      ctx.globalAlpha = 1
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(gx, gy, coreR, 0, Math.PI * 2)
      ctx.fill()

      // Spiral-arm stars
      for (const p of particles) {
        const x = gx + p.dx * cosR - p.dy * sinR
        const y = gy + p.dx * sinR + p.dy * cosR
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Faint companion smudge (M110-style), below the main disc
      ctx.globalAlpha = 0.35
      ctx.fillStyle = '#a78bfa'
      ctx.beginPath()
      ctx.ellipse(gx - coreR * 0.4, gy + coreR * 1.9, coreR * 0.32, coreR * 0.16, -0.4, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.restore()
    }

    const loop = (t: number) => {
      // Throttle to ~30 fps: twinkle and a 8-minute rotation need no more
      if (t - last >= 33) {
        draw(t)
        last = t
      }
      raf = requestAnimationFrame(loop)
    }

    seed()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        seed()
        if (reduced) draw(0)
      }, 200)
    }
    const onVisibility = () => {
      if (reduced) return
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        last = 0
        raf = requestAnimationFrame(loop)
      }
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] overflow-hidden bg-[#04040d]"
    >
      {/* 1 · deep-space base gradient, centred on the galaxy corner */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_8%,#171233_0%,#0a0618_45%,#04040d_100%)]" />

      {/* 2 + 4 · procedural Andromeda galaxy + twinkling starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 3 · slow-drifting nebula glows, tucked into opposite corners
          and kept faint so they never compete with the text */}
      <div className="andromeda-nebula absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_65%)] blur-3xl" />
      <div className="andromeda-nebula andromeda-nebula-slow absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_65%)] blur-3xl" />

      {/* 5 · directional readability scrim — strongest where the headline
          sits (left), thinnest toward the galaxy core (top-right corner),
          so the core glows at the frame edge instead of behind the text */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,4,13,0.92)_0%,rgba(4,4,13,0.8)_42%,rgba(4,4,13,0.52)_72%,rgba(4,4,13,0.62)_100%)]" />

      {/* 6 · bottom fade — the hero window melts into the calm dark below */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(4,4,13,0),#04040d)]" />
    </div>
  )
}

export default AndromedaBackground
