MEHNDI DJANGO PROJECT - RUN STEPS

1. Open this folder in PyCharm.

2. Open Terminal and create/activate virtual environment:

   macOS/Linux:
   python3 -m venv .venv
   source .venv/bin/activate

3. Install Django:
   python -m pip install -r requirements.txt

4. Create database tables:
   python manage.py makemigrations
   python manage.py migrate

5. Run website:
   python manage.py runserver

6. Open:
   http://127.0.0.1:8000/

7. Optional admin:
   python manage.py createsuperuser

   Then open:
   http://127.0.0.1:8000/admin/

IMPORTANT IMAGE FOLDER:
Put these image files inside:
website/static/website/image/

Required filenames:
hero1.jpg
hero2.jpg
hero3.jpg
gallery1.jpg
gallery2.jpg
gallery3.jpg
gallery4.jpg
gallery5.jpg
gallery6.jpg
artist.jpg
whatsapp.png

BOOKING FLOW:
Book Appointment -> Fill form -> Confirm Booking
-> Django saves data in SQLite
-> Success popup opens automatically
