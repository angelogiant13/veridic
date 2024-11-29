from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from PIL import Image
import numpy as np

def create_bad_pdf():
    # Create a small image with random noise
    img_array = np.random.randint(0, 255, size=(100, 100, 3), dtype=np.uint8)
    img = Image.fromarray(img_array)
    img.save("noise.jpg")
    
    # Create PDF with the noise image
    c = canvas.Canvas("bad_test.pdf", pagesize=letter)
    c.drawImage("noise.jpg", 100, 500, width=400, height=200)
    c.save()

if __name__ == "__main__":
    create_bad_pdf()
