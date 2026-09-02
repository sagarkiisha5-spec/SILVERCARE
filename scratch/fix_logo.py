from PIL import Image

input_img = r'C:\Users\Asus\.gemini\antigravity-ide\brain\3f7eaf91-25e1-4eda-969c-4357e215c135\.user_uploaded\media_1788352487143.png'
out_path1 = r'C:\silvercare website\public\silvercare-logo.png'
out_path2 = r'C:\silvercare website\public\silvercare-footer-logo.png'
out_path3 = r'C:\silvercare website\dist\silvercare-logo.png'
out_path4 = r'C:\silvercare website\dist\silvercare-footer-logo.png'

img = Image.open(input_img).convert('RGBA')
width, height = img.size
pixels = img.load()

# 1. Erase extra dot (centered at x=185, y=41)
# Only erase pixels where x >= 181 to preserve the main cane handle curve on the left
for y in range(25, 58):
    for x in range(180, 202):
        dx = x - 186
        dy = y - 41
        if dx*dx + dy*dy <= 11*11:
            if x >= 180: # erase extra dot
                pixels[x, y] = (255, 255, 255, 0)

# 2. Make all white/near-white background pixels transparent
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if r > 240 and g > 240 and b > 240:
            pixels[x, y] = (0, 0, 0, 0)

# 3. Crop whitespace around logo
bbox = img.getbbox()
if bbox:
    left, upper, right, lower = bbox
    padded_bbox = (max(0, left - 10), max(0, upper - 10), min(width, right + 10), min(height, lower + 10))
    img = img.crop(padded_bbox)

img.save(out_path1, 'PNG')
img.save(out_path2, 'PNG')
img.save(out_path3, 'PNG')
img.save(out_path4, 'PNG')

print("Successfully cleaned logo perfectly!")
