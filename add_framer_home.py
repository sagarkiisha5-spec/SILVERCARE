import re

with open('src/pages/public/Home.tsx', 'r') as f:
    content = f.read()

# Add motion import
content = content.replace('import { useState } from "react";', 'import { useState } from "react";\nimport { motion } from "motion/react";')

variants = """
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

"""
content = content.replace('export default function Home() {', variants + 'export default function Home() {')

with open('src/pages/public/Home.tsx', 'w') as f:
    f.write(content)
