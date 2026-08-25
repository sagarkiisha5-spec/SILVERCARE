import os

pages_to_animate = ['src/pages/public/Services.tsx', 'src/pages/public/About.tsx', 'src/pages/public/Professionals.tsx']

for page in pages_to_animate:
    with open(page, 'r') as f:
        content = f.read()
    
    if 'import { motion }' not in content:
        content = content.replace('import SEO ', 'import { motion } from "motion/react";\nimport SEO ')
        
        # Animate the page header (usually the first section or div with bg-gradient)
        if '<section className="pt-16 pb-12' in content:
            content = content.replace('<section className="pt-16 pb-12', '<motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pt-16 pb-12')
            content = content.replace('</section>', '</motion.section>', 1)
        elif '<section className="bg-[linear-gradient(135deg,#FFF7FB_0%,#F8ECFF_50%,#FDEBFF_100%)] pt-16 pb-12' in content:
            content = content.replace('<section className="bg-[linear-gradient(135deg,#FFF7FB_0%,#F8ECFF_50%,#FDEBFF_100%)] pt-16 pb-12', '<motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-[linear-gradient(135deg,#FFF7FB_0%,#F8ECFF_50%,#FDEBFF_100%)] pt-16 pb-12')
            content = content.replace('</section>', '</motion.section>', 1)

    with open(page, 'w') as f:
        f.write(content)
