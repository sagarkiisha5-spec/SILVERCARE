import re

with open('src/components/shared/ServiceSearch.tsx', 'r') as f:
    content = f.read()

content = content.replace('focus-within:ring-teal-500', 'focus-within:ring-[#D946EF]')
content = content.replace('focus-within:border-teal-500', 'focus-within:border-[#D946EF]')
content = content.replace('bg-teal-600 hover:bg-teal-700', 'bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-90')
content = content.replace('group-hover:text-teal-700', 'group-hover:text-[#7B2CBF]')
content = content.replace('group-hover:text-teal-600', 'group-hover:text-[#7B2CBF]')
content = content.replace('text-teal-600 text-sm', 'text-[#7B2CBF] text-sm')

with open('src/components/shared/ServiceSearch.tsx', 'w') as f:
    f.write(content)

