import re

with open('src/components/layout/Navbar.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";\nimport { motion } from "motion/react";')

content = content.replace('export default function Navbar() {', """export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
""")

content = content.replace('<header className="sticky top-0 z-50 w-full flex flex-col">', '<motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="sticky top-0 z-50 w-full flex flex-col">')
content = content.replace('</header>', '</motion.header>')

# Top bar (accent bar)
content = content.replace(
    '<div className="bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD,#FF4F81)] h-1.5 w-full"></div>',
    '<div className="bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD,#FF4F81)] h-1.5 w-full"></div>'
)

# Nav structure and drop shadow based on scroll
content = content.replace(
    '<nav className="bg-white border-b border-[#F4C7DB] shadow-[0_4px_20px_rgba(123,44,191,0.06)] relative">',
    '<nav className={`bg-white border-b transition-all duration-300 relative ${scrolled ? "border-[#F4C7DB]/50 shadow-[0_10px_30px_rgba(123,44,191,0.1)] py-1" : "border-[#F4C7DB] shadow-[0_4px_20px_rgba(123,44,191,0.06)] py-2"}`}>'
)

# Service Link hover effect 
content = content.replace('hover:text-[#7B2CBF]', 'hover:text-[#7B2CBF] transition-colors')

# CTA Buttons Hover Animations
content = content.replace(
    '<Button className="bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6A24A6] hover:to-[#8E44C9] text-white font-bold h-11 px-6 text-[15px] shadow-[0_8px_20px_rgba(123,44,191,0.22)] border-0">',
    '<Button className="bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6A24A6] hover:to-[#8E44C9] text-white font-bold h-11 px-6 text-[15px] shadow-[0_8px_20px_rgba(123,44,191,0.22)] border-0 transition-transform hover:-translate-y-0.5 active:scale-95">'
)

content = content.replace(
    '<Button className="w-full bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6A24A6] hover:to-[#8E44C9] text-white font-bold text-lg h-14 shadow-[0_8px_20px_rgba(123,44,191,0.22)] border-0">',
    '<Button className="w-full bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6A24A6] hover:to-[#8E44C9] text-white font-bold text-lg h-14 shadow-[0_8px_20px_rgba(123,44,191,0.22)] border-0 transition-transform active:scale-95">'
)

with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.write(content)
