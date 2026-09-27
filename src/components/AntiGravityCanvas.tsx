import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  glow: string;
  angle: number;
  speed: number;
}

interface AntiGravityCanvasProps {
  zeroGStrength?: number;
  interactive?: boolean;
}

export const AntiGravityCanvas: React.FC<AntiGravityCanvasProps> = ({
  zeroGStrength = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
    };
    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
    }

    // Color palette matching design
    const colors = [
      { fill: 'rgba(0, 229, 255, 0.65)', glow: 'rgba(0, 229, 255, 0.4)' },
      { fill: 'rgba(255, 82, 95, 0.55)', glow: 'rgba(255, 82, 95, 0.35)' },
      { fill: 'rgba(245, 205, 0, 0.6)', glow: 'rgba(245, 205, 0, 0.35)' },
      { fill: 'rgba(156, 240, 255, 0.45)', glow: 'rgba(156, 240, 255, 0.2)' },
    ];

    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const col = colors[i % colors.length];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45 * zeroGStrength,
        vy: (Math.random() - 0.5) * 0.45 * zeroGStrength,
        baseRadius: Math.random() * 2 + 1.2,
        color: col.fill,
        glow: col.glow,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.008 + 0.004) * zeroGStrength,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Render subtle zero-gravity connect lines (cyber webbing)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 120;

          if (distSq < maxDist * maxDist) {
            const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render drifting particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Zero-gravity sinusoidal floating drift
        p.angle += p.speed;
        p.vx += Math.cos(p.angle) * 0.015 * zeroGStrength;
        p.vy += Math.sin(p.angle * 1.3) * 0.015 * zeroGStrength;

        // Damping to keep drift gentle
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Mouse anti-gravity interaction
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        const mouseRadius = mouseRef.current.isDown ? 260 : 180;

        if (mDistSq < mouseRadius * mouseRadius && mDistSq > 1) {
          const mDist = Math.sqrt(mDistSq);
          const force = ((mouseRadius - mDist) / mouseRadius) * 1.8;
          // If mouse is down, pull (gravitational well), otherwise gently repel (anti-gravity force)
          const dir = mouseRef.current.isDown ? -1 : 1;
          p.vx += (mdx / mDist) * force * dir * 0.55;
          p.vy += (mdy / mDist) * force * dir * 0.55;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle
        ctx.save();
        ctx.beginPath();
        const pulseRadius = p.baseRadius + Math.sin(time * 2 + i) * 0.5;
        ctx.arc(p.x, p.y, Math.max(1, pulseRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glow;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [zeroGStrength, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
      aria-hidden="true"
    />
  );
};
