import re

with open('src/components/shared/ServiceSearch.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate } from 'react-router-dom';\nimport { motion, AnimatePresence } from 'motion/react';")

# Replace {isOpen && (...)} with <AnimatePresence>{isOpen && (<motion.div ...>...)</motion.div>)}</AnimatePresence>
content = content.replace(
    '{isOpen && (',
    '<AnimatePresence>\n      {isOpen && ('
)

content = content.replace(
    '<div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">',
    '<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">'
)

content = content.replace(
    '</div>\n      )}',
    '</motion.div>\n      )}\n      </AnimatePresence>'
)

with open('src/components/shared/ServiceSearch.tsx', 'w') as f:
    f.write(content)
