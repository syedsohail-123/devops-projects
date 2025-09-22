from PIL import Image, ImageDraw, ImageFont
import random

# Create a large background image
width, height = 1920, 1080
image = Image.new('RGB', (width, height), color='#1e3a8a')  # Dark blue background
draw = ImageDraw.Draw(image)

# Draw some sports-related patterns
for i in range(100):
    # Random circles
    x = random.randint(0, width)
    y = random.randint(0, height)
    radius = random.randint(10, 50)
    color = random.choice(['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'])  # Blue shades
    draw.ellipse([x-radius, y-radius, x+radius, y+radius], fill=color, outline=None)

# Draw some lines to represent motion
for i in range(50):
    x1 = random.randint(0, width)
    y1 = random.randint(0, height)
    x2 = x1 + random.randint(-100, 100)
    y2 = y1 + random.randint(-100, 100)
    color = random.choice(['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'])
    draw.line([x1, y1, x2, y2], fill=color, width=random.randint(1, 3))

# Save the image
image.save('c:/Users/SOHAIL/identifier/background-image/sports_background.jpg')
print("Background image created successfully!")