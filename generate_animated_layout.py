import re

with open('src/components/layout/PublicLayout.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { Outlet, Link } from "react-router-dom";', 'import { Outlet, Link, useLocation } from "react-router-dom";\nimport { motion, AnimatePresence } from "motion/react";')

content = content.replace('export default function PublicLayout() {', 'export default function PublicLayout() {\n  const location = useLocation();')

content = content.replace(
    '<main className="flex-1">\n        <Outlet />\n      </main>',
    """<main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>"""
)

with open('src/components/layout/PublicLayout.tsx', 'w') as f:
    f.write(content)
