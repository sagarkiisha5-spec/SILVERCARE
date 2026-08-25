import re

with open('src/components/layout/Footer.tsx', 'r') as f:
    content = f.read()

# Replace background color
content = content.replace('bg-[#172B4D]', 'bg-[#241442]')

# Replace text color
content = content.replace('text-slate-300', 'text-[#DCC7EF]')

# Replace logo background
content = content.replace('bg-teal-600', 'bg-[#7B2CBF]')

# Replace logo dot text color
content = content.replace('text-teal-500', 'text-[#FF4F81]')

# Replace link hover colors
content = content.replace('hover:text-teal-400', 'hover:text-[#FF9F43]')

# The icons are also using text-teal-500 which was replaced by text-[#FF4F81]

# Write back
with open('src/components/layout/Footer.tsx', 'w') as f:
    f.write(content)

