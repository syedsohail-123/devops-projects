from PIL import Image, ImageDraw

# Create a test image for Hritik Roshan
image = Image.new('RGB', (300, 300), color='lightyellow')
draw = ImageDraw.Draw(image)
draw.text((50, 150), "Hritik Test Image", fill='darkred')

# Save the image
image.save('hritik_test.jpg')
print("Created Hritik test image")