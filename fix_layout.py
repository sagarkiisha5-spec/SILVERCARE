import re
with open('src/components/layout/PublicLayout.tsx', 'r') as f:
    c = f.read()
c = c.replace('bg-teal-600', 'bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)]')
c = c.replace('hover:bg-teal-700', 'hover:opacity-90')
with open('src/components/layout/PublicLayout.tsx', 'w') as f:
    f.write(c)
