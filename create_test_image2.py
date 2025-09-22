from PIL import Image, ImageDraw

# Create a second test image
image = Image.new('RGB', (200, 200), color='red')
draw = ImageDraw.Draw(image)
draw.text((50, 100), "Test Image 2", fill='white')

# Save the image
image.save('test_image2.png')
print("Second test image created successfully!")