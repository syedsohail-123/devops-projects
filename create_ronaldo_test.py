from PIL import Image, ImageDraw

# Create a test image with text
image = Image.new('RGB', (300, 300), color='lightblue')
draw = ImageDraw.Draw(image)
draw.text((50, 150), "Ronaldo Test Image", fill='darkblue')

# Save the image
image.save('ronaldo_test.jpg')
print("Created Ronaldo test image")