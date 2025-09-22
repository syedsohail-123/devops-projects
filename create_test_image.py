from PIL import Image, ImageDraw

# Create a simple test image
image = Image.new('RGB', (200, 200), color='blue')
draw = ImageDraw.Draw(image)
draw.text((50, 100), "Test Image", fill='white')

# Save the image
image.save('test_image.png')
print("Test image created successfully!")