from PIL import Image, ImageFilter
import collections

input_path = r'C:\Users\Asus\.gemini\antigravity-ide\brain\3f7eaf91-25e1-4eda-969c-4357e215c135\.user_uploaded\media_1788352194740.jpg'
output_png = r'c:\silvercare website\src\assets\hero-doctor.png'
public_png = r'c:\silvercare website\public\hero-doctor.png'

img = Image.open(input_path).convert('RGBA')
width, height = img.size
pixels = img.load()

# Create alpha mask (initialized to 255 = fully opaque)
alpha = Image.new('L', (width, height), 255)
alpha_pixels = alpha.load()

def is_bg_pixel(r, g, b):
    # Neutral grey/white square checks
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    diff = max_c - min_c
    # Checkerboard is light grey (220-255) with very low saturation (diff < 18)
    return min_c > 195 and diff < 20

# Flood fill from image borders
visited = set()
queue = collections.deque()

# Add all border pixels to queue if they match background
for x in range(width):
    queue.append((x, 0))
    queue.append((x, height - 1))
for y in range(height):
    queue.append((0, y))
    queue.append((width - 1, y))

while queue:
    x, y = queue.popleft()
    if (x, y) in visited:
        continue
    visited.add((x, y))
    
    r, g, b, a = pixels[x, y]
    if is_bg_pixel(r, g, b):
        alpha_pixels[x, y] = 0
        # Check 4 neighbors
        for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                queue.append((nx, ny))

img.putalpha(alpha)
img.save(output_png, 'PNG')
img.save(public_png, 'PNG')
print("Successfully processed and saved hero-doctor.png")
