with open('src/components/layout/Navbar.tsx', 'r') as f:
    content = f.read()

content = content.replace("  }, []);\n  }, []);", "  }, []);")

with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.write(content)
