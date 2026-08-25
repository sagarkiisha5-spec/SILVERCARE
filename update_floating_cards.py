import re

with open('src/pages/public/Home.tsx', 'r') as f:
    content = f.read()

# Floating Trust Card 1
content = content.replace(
    '''initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-6 left-6''',
    '''initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                    transition={{ opacity: { delay: 0.8, duration: 0.6 }, x: { delay: 0.8, duration: 0.6 }, y: { delay: 1.4, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                    className="absolute bottom-6 left-6'''
)

# Floating Trust Card 2
content = content.replace(
    '''initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute top-8 right-[-1rem] lg:right-[-2rem] hidden md:flex''',
    '''initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                    transition={{ opacity: { delay: 1, duration: 0.6 }, x: { delay: 1, duration: 0.6 }, y: { delay: 1.6, duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
                    className="absolute top-8 right-[-1rem] lg:right-[-2rem] hidden md:flex'''
)

with open('src/pages/public/Home.tsx', 'w') as f:
    f.write(content)
