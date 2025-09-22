from PIL import Image, ImageDraw

# Create another test image
image = Image.new('RGB', (300, 300), color='lightcoral')
draw = ImageDraw.Draw(image)
draw.text((50, 150), "Another Test Image", fill='darkblue')

# Save the image
image.save('another_test.jpg')
print("Created another test image")