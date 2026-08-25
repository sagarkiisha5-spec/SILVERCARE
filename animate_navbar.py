import re

with open('src/components/layout/Navbar.tsx', 'r') as f:
    content = f.read()

# Add motion import
content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";\nimport { motion, useScroll, useTransform } from "motion/react";')

# Change <nav> to <motion.nav> and animate it.
# It should drop down smoothly on load.
# Also I can animate the background color when scrolling if needed, but for now just drop down.

# "export default function Navbar() {" ->
# export default function Navbar() {
#   const [scrolled, setScrolled] = useState(false);
#   useEffect(() => {
#     const handleScroll = () => {
#       setScrolled(window.scrollY > 20);
#     };
#     window.addEventListener('scroll', handleScroll);
#     return () => window.removeEventListener('scroll', handleScroll);
#   }, []);

content = content.replace('export default function Navbar() {', """export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
""")

content = content.replace('<nav className="bg-white border-b border-[#F4C7DB] sticky top-0 z-50">', '<motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={`bg-white border-b border-[#F4C7DB] sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_4px_20px_rgba(123,44,191,0.08)] py-1" : "py-2"}`}>')

# Navigation items hover animation (subtle underline)
# Currently it is: className="text-slate-600 font-medium hover:text-[#7B2CBF] transition-colors"
# Add a subtle underline using relative group
content = content.replace('className="text-slate-600 font-medium hover:text-[#7B2CBF] transition-colors"', 'className="text-slate-600 font-medium hover:text-[#7B2CBF] transition-colors relative group"')

content = content.replace('Services</Link>', 'Services<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7B2CBF] transition-all group-hover:w-full"></span></Link>')
content = content.replace('Professionals</Link>', 'Professionals<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7B2CBF] transition-all group-hover:w-full"></span></Link>')
content = content.replace('About Us</Link>', 'About Us<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7B2CBF] transition-all group-hover:w-full"></span></Link>')

# Add hover effect to CTA buttons
content = content.replace('<Button variant="outline" className="border-[#DCC7EF] text-[#4D2A7A] hover:bg-[#F5E8FF] hover:border-[#7B2CBF] font-bold">', '<Button variant="outline" className="border-[#DCC7EF] text-[#4D2A7A] hover:bg-[#F5E8FF] hover:border-[#7B2CBF] font-bold transition-transform hover:-translate-y-0.5 active:scale-95">')

content = content.replace('<Button className="bg-[#17345E] hover:bg-[#2A1E59] text-white font-bold">', '<Button className="bg-[#17345E] hover:bg-[#2A1E59] text-white font-bold transition-transform hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-lg">')

with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.write(content)
