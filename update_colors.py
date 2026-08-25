import os
import glob

replacements = {
    'bg-teal-600 hover:bg-teal-700': 'bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-90 border-0',
    'bg-teal-600': 'bg-[#7B2CBF]',
    'text-teal-600': 'text-[#7B2CBF]',
    'hover:text-teal-600': 'hover:text-[#9D4EDD]',
    'text-teal-700': 'text-[#6A24A6]',
    'hover:text-teal-700': 'hover:text-[#6A24A6]',
    'group-hover:text-teal-700': 'group-hover:text-[#6A24A6]',
    'bg-teal-100': 'bg-[#F5E8FF]',
    'text-teal-100': 'text-[#EFE5F7]',
    'bg-teal-50': 'bg-[#FFF0F6]',
    'bg-teal-900': 'bg-[#241442]',
    'bg-teal-500': 'bg-[#9D4EDD]',
    'hover:bg-teal-400': 'hover:bg-[#D946EF]',
    'text-teal-400': 'text-[#D946EF]',
    'hover:text-teal-300': 'hover:text-[#FF4F81]',
    'border-teal-400': 'border-[#D946EF]',
    'hover:border-teal-500': 'hover:border-[#9D4EDD]',
    'border-teal-500': 'border-[#9D4EDD]',
    'group-hover:bg-teal-500': 'group-hover:bg-[#9D4EDD]',
    'group-hover:border-teal-400': 'group-hover:border-[#D946EF]',
    'text-teal-50': 'text-white'
}

files = glob.glob('src/pages/public/*.tsx')
for filepath in files:
    if 'Home.tsx' in filepath:
        continue # Home is already fully redesigned
    
    with open(filepath, 'r') as f:
        content = f.read()
        
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)

print("Colors updated in pages.")
