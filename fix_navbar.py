import re

with open('src/components/layout/Navbar.tsx', 'r') as f:
    content = f.read()

# Fix imports
if 'useEffect' not in content:
    content = content.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';\nimport { motion } from 'motion/react';")

# Remove duplicate hooks
content = content.replace("""  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);""", """  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);""")

with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.write(content)
