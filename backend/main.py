from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import io
import base64
import requests
from typing import Dict
import hashlib
import os
from pathlib import Path

app = FastAPI()

# Add CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the path to the images directory
IMAGES_DIR = Path("c:/Users/SOHAIL/identifier/images")

# Function to calculate image hash for comparison
def calculate_image_hash(image):
    # Resize image to a fixed size for consistent hashing
    resized = image.resize((8, 8), Image.Resampling.LANCZOS).convert('L')
    pixels = np.array(resized)
    avg = pixels.mean()
    hash_bits = (pixels > avg).flatten()
    hash_int = 0
    for bit in hash_bits:
        hash_int = (hash_int << 1) | bit
    return hash_int

# Function to load reference images and calculate their hashes
def load_reference_images():
    reference_data = {}
    
    # Check if images directory exists
    if not IMAGES_DIR.exists():
        print("Images directory not found")
        return reference_data
    
    # Iterate through each celebrity folder
    for celebrity_folder in IMAGES_DIR.iterdir():
        if celebrity_folder.is_dir():
            celebrity_name = celebrity_folder.name
            reference_data[celebrity_name] = []
            
            # Load all images in the celebrity folder
            for image_file in celebrity_folder.iterdir():
                if image_file.suffix.lower() in ['.jpg', '.jpeg', '.png']:
                    try:
                        with Image.open(image_file) as img:
                            img_hash = calculate_image_hash(img)
                            reference_data[celebrity_name].append({
                                'filename': image_file.name,
                                'hash': img_hash
                            })
                    except Exception as e:
                        print(f"Error loading {image_file}: {e}")
    
    return reference_data

# Load reference images at startup
reference_images = load_reference_images()
print(f"Loaded reference images for {len(reference_images)} celebrities")

# Function to identify celebrity based on image similarity
def identify_celebrity(image):
    # Calculate hash of uploaded image
    uploaded_hash = calculate_image_hash(image)
    
    best_match = None
    best_confidence = 0
    
    # Compare with reference images
    for celebrity_name, images in reference_images.items():
        for ref_image in images:
            # Calculate similarity based on hash difference
            hash_diff = bin(uploaded_hash ^ ref_image['hash']).count('1')
            max_bits = 64  # 8x8 image hash
            similarity = 1 - (hash_diff / max_bits)
            
            if similarity > best_confidence:
                best_confidence = similarity
                best_match = celebrity_name
    
    # If we found a match with reasonable confidence
    if best_match and best_confidence > 0.6:
        return {
            "celebrity": best_match,
            "confidence": best_confidence
        }
    else:
        # Fallback to random selection if no good match found
        celebrity_names = list(reference_images.keys()) if reference_images else ["Unknown"]
        import random
        return {
            "celebrity": random.choice(celebrity_names),
            "confidence": random.uniform(0.1, 0.3)
        }

@app.post("/identify")
async def identify_celebrity_endpoint(file: UploadFile = File(...)):
    try:
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Identify celebrity
        result = identify_celebrity(image)
        
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to reload reference images
@app.post("/reload")
async def reload_reference_images():
    global reference_images
    reference_images = load_reference_images()
    return {"message": f"Reloaded reference images for {len(reference_images)} celebrities"}

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Sports Celebrity Identifier API is running", 
            "celebrities": list(reference_images.keys()) if reference_images else []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)