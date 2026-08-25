with open('src/components/layout/Navbar.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if line.strip() == "}, []);" and not skip:
        new_lines.append(line)
        skip = True
    elif line.strip() == "}, []);" and skip:
        pass # ignore the duplicate
    else:
        new_lines.append(line)

with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.writelines(new_lines)
