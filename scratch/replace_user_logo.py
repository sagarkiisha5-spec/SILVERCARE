from PIL import Image

input_img = r'C:\Users\Asus\.gemini\antigravity-ide\brain\3f7eaf91-25e1-4eda-969c-4357e215c135\.user_uploaded\media_1788353006242.png'
out_path1 = r'C:\silvercare website\public\silvercare-logo.png'
out_path2 = r'C:\silvercare website\public\silvercare-footer-logo.png'
out_path3 = r'C:\silvercare website\dist\silvercare-logo.png'
out_path4 = r'C:\silvercare website\dist\silvercare-footer-logo.png'

img = Image.open(input_img).convert('RGBA')
width, height = img.size
pixels = img.load()

# Make white/near-white background transparent
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if r > 240 and g > 240 and b > 240:
            pixels[x, y] = (0, 0, 0, 0)

# Crop whitespace around logo
bbox = img.getbbox()
if bbox:
    left, upper, right, lower = bbox
    padded_bbox = (max(0, left - 8), max(0, upper - 8), min(width, right + 8), min(height, lower + 8))
    img = img.crop(padded_bbox)

img.save(out_path1, 'PNG')
img.save(out_path2, 'PNG')
img.save(out_path3, 'PNG')
img.save(out_path4, 'PNG')

print("Successfully replaced logo with exact user image!")
