from PIL import Image, ImageDraw

# Create a different test image
image = Image.new('RGB', (300, 300), color='lightgreen')
draw = ImageDraw.Draw(image)
draw.text((50, 150), "Messi Test Image", fill='darkgreen')

# Save the image
image.save('messi_test.jpg')
print("Created Messi test image")