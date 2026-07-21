from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("services/", views.services, name="services"),
    path("gallery/", views.gallery, name="gallery"),
    path("booking/", views.booking, name="booking"),
    path("track-booking/", views.track_booking, name="track_booking"),
    path("contact/", views.contact, name="contact"),

    # Admin Dashboard
    path(
        "dashboard/",
        views.admin_dashboard,
        name="dashboard",
    ),

    # Booking Receipt
    path(
        "booking-receipt/<str:booking_id>/",
        views.booking_receipt,
        name="booking_receipt",
    ),
path(
    "booking-calendar/",
    views.booking_calendar,
    name="booking_calendar",
),
]
