import re
from datetime import date

from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
from django.utils import timezone

from .forms import BookingForm
from .models import Booking, Contact, Gallery, Review, Service

from calendar import monthcalendar
from datetime import datetime



# =========================================================
# Helper Functions
# =========================================================

def get_home_context():
    """
    Homepage aur baaki public pages ke liye
    dynamic gallery, services aur approved reviews.
    """

    return {
        "gallery_images": Gallery.objects.all(),
        "services": Service.objects.all(),
        "reviews": Review.objects.filter(
            is_visible=True
        ),
    }


def is_valid_phone(phone):
    """
    Indian 10-digit mobile number validate karta hai.
    Number 6, 7, 8 ya 9 se start hona chahiye.
    """

    return bool(
        re.fullmatch(
            r"[6-9]\d{9}",
            phone,
        )
    )


def is_valid_email(email):
    """
    Basic email address validation.
    """

    return bool(
        re.fullmatch(
            r"^[^@\s]+@[^@\s]+\.[^@\s]+$",
            email,
        )
    )


# =========================================================
# Home Page
# =========================================================

def home(request):
    """
    Main homepage.

    Handles:
    - Dynamic gallery
    - Dynamic services
    - Approved reviews
    - Booking form
    - Contact form
    - Review form
    """

    context = get_home_context()

    if request.method == "GET":
        return render(
            request,
            "website/index.html",
            context,
        )

    form_type = request.POST.get(
        "form_type",
        "",
    ).strip()

    # =====================================================
    # Booking Form
    # =====================================================

    if form_type == "booking":
        name = request.POST.get(
            "name",
            "",
        ).strip()

        email = request.POST.get(
            "email",
            "",
        ).strip().lower()

        phone = request.POST.get(
            "phone",
            "",
        ).strip()

        booking_date_value = request.POST.get(
            "booking_date",
            "",
        ).strip()

        service = request.POST.get(
            "service",
            "",
        ).strip()

        address = request.POST.get(
            "address",
            "",
        ).strip()

        context["booking_data"] = {
            "name": name,
            "email": email,
            "phone": phone,
            "booking_date": booking_date_value,
            "service": service,
            "address": address,
        }

        booking_error = None
        selected_date = None

        valid_services = {
            service_value
            for service_value, service_label
            in Booking.SERVICE_CHOICES
        }

        if not name:
            booking_error = "Please enter your full name."

        elif len(name) < 2:
            booking_error = (
                "Name must contain at least 2 characters."
            )

        elif email and not is_valid_email(email):
            booking_error = (
                "Please enter a valid email address."
            )

        elif not is_valid_phone(phone):
            booking_error = (
                "Please enter a valid 10-digit mobile number."
            )

        elif not booking_date_value:
            booking_error = (
                "Please select your booking date."
            )

        elif not service:
            booking_error = (
                "Please select a Mehndi service."
            )

        elif service not in valid_services:
            booking_error = (
                "Please select a valid Mehndi service."
            )

        elif not address:
            booking_error = (
                "Please enter your complete address."
            )

        elif len(address) < 10:
            booking_error = (
                "Address must contain at least 10 characters."
            )

        else:
            try:
                selected_date = date.fromisoformat(
                    booking_date_value
                )

                if selected_date < timezone.localdate():
                    booking_error = (
                        "Booking date cannot be in the past."
                    )

            except ValueError:
                booking_error = (
                    "Please select a valid booking date."
                )

        if booking_error:
            context["booking_error"] = booking_error

            return render(
                request,
                "website/index.html",
                context,
            )

        booking_object = Booking.objects.create(
            name=name,
            email=email,
            phone=phone,
            booking_date=selected_date,
            service=service,
            address=address,
        )

        email_sent = False

        if booking_object.email:
            try:
                result = send_mail(
                    subject=(
                        "Booking Confirmation - "
                        "Mehndi By Dhami"
                    ),
                    message=f"""
Hello {booking_object.name},

Your Mehndi booking has been submitted successfully.

Booking ID: {booking_object.booking_id}
Service: {booking_object.service}
Booking Date: {booking_object.booking_date}
Phone: {booking_object.phone}
Status: {booking_object.status}

Please save your Booking ID for tracking your booking.

Thank you,
Mehndi By Dhami
""",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[
                        booking_object.email
                    ],
                    fail_silently=False,
                )

                email_sent = result == 1

                print(
                    "EMAIL SEND RESULT:",
                    result,
                )

            except Exception as error:
                print(
                    "EMAIL ERROR:",
                    repr(error),
                )

        else:
            print(
                "EMAIL NOT SENT: "
                "Booking email field is empty."
            )

        context["booking_success"] = True
        context["email_sent"] = email_sent
        context["booking"] = booking_object
        context["booking_data"] = {}

        return render(
            request,
            "website/index.html",
            context,
        )

    # =====================================================
    # Contact Form
    # =====================================================

    if form_type == "contact":
        name = request.POST.get(
            "contact_name",
            "",
        ).strip()

        email = request.POST.get(
            "contact_email",
            "",
        ).strip().lower()

        phone = request.POST.get(
            "contact_phone",
            "",
        ).strip()

        message = request.POST.get(
            "contact_message",
            "",
        ).strip()

        context["contact_data"] = {
            "contact_name": name,
            "contact_email": email,
            "contact_phone": phone,
            "contact_message": message,
        }

        contact_error = None

        if not name:
            contact_error = "Please enter your name."

        elif len(name) < 2:
            contact_error = (
                "Name must contain at least 2 characters."
            )

        elif not email:
            contact_error = (
                "Please enter your email address."
            )

        elif not is_valid_email(email):
            contact_error = (
                "Please enter a valid email address."
            )

        elif not is_valid_phone(phone):
            contact_error = (
                "Please enter a valid 10-digit mobile number."
            )

        elif not message:
            contact_error = (
                "Please enter your message."
            )

        elif len(message) < 5:
            contact_error = (
                "Message must contain at least 5 characters."
            )

        if contact_error:
            context["contact_error"] = contact_error

            return render(
                request,
                "website/index.html",
                context,
            )

        Contact.objects.create(
            name=name,
            email=email,
            phone=phone,
            message=message,
        )

        context["contact_success"] = True
        context["contact_data"] = {}

        return render(
            request,
            "website/index.html",
            context,
        )

    # =====================================================
    # Review Form
    # =====================================================

    if form_type == "review":
        review_name = request.POST.get(
            "review_name",
            "",
        ).strip()

        review_email = request.POST.get(
            "review_email",
            "",
        ).strip().lower()

        rating_value = request.POST.get(
            "rating",
            "",
        ).strip()

        review_message = request.POST.get(
            "review_message",
            "",
        ).strip()

        context["review_data"] = {
            "review_name": review_name,
            "review_email": review_email,
            "rating": rating_value,
            "review_message": review_message,
        }

        review_error = None
        rating = None

        if not review_name:
            review_error = (
                "Please enter your name."
            )

        elif len(review_name) < 2:
            review_error = (
                "Name must contain at least 2 characters."
            )

        elif (
            review_email
            and not is_valid_email(review_email)
        ):
            review_error = (
                "Please enter a valid email address."
            )

        elif not rating_value:
            review_error = (
                "Please select a rating."
            )

        else:
            try:
                rating = int(rating_value)

                if rating not in [1, 2, 3, 4, 5]:
                    review_error = (
                        "Please select a valid rating."
                    )

            except ValueError:
                review_error = (
                    "Please select a valid rating."
                )

        if not review_message:
            review_error = (
                "Please write your review."
            )

        elif len(review_message) < 5:
            review_error = (
                "Review must contain at least 5 characters."
            )

        if review_error:
            context["review_error"] = review_error

            return render(
                request,
                "website/index.html",
                context,
            )

        Review.objects.create(
            name=review_name,
            email=review_email,
            rating=rating,
            message=review_message,
            is_visible=False,
        )

        context["review_success"] = True
        context["review_data"] = {}

        return render(
            request,
            "website/index.html",
            context,
        )

    # =====================================================
    # Invalid Form
    # =====================================================

    context["form_error"] = (
        "Invalid form submission. Please try again."
    )

    return render(
        request,
        "website/index.html",
        context,
    )
# =========================================================
# Static Pages
# =========================================================

def about(request):
    return render(
        request,
        "website/about.html",
        get_home_context(),
    )


def services(request):
    return render(
        request,
        "website/services.html",
        get_home_context(),
    )


def gallery(request):
    return render(
        request,
        "website/gallery.html",
        get_home_context(),
    )


def contact(request):
    return render(
        request,
        "website/contact.html",
        get_home_context(),
    )


# =========================================================
# Booking Page
# =========================================================

def booking(request):

    if request.method == "POST":

        form = BookingForm(request.POST)

        if form.is_valid():

            booking_object = form.save()

            email_sent = False

            if booking_object.email:

                try:

                    result = send_mail(
                        subject="Booking Confirmation - Mehndi By Dhami",
                        message=f"""
Hello {booking_object.name},

Your booking has been submitted successfully.

Booking ID : {booking_object.booking_id}

Service : {booking_object.service}

Booking Date : {booking_object.booking_date}

Phone : {booking_object.phone}

Status : {booking_object.status}

Thank You for choosing Mehndi By Dhami.
""",
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[
                            booking_object.email
                        ],
                        fail_silently=False,
                    )

                    email_sent = result == 1

                    print(
                        "EMAIL SEND RESULT:",
                        result,
                    )

                except Exception as error:

                    print(
                        "EMAIL ERROR:",
                        repr(error),
                    )

            else:

                print(
                    "EMAIL NOT SENT : Email is Empty"
                )

            return render(
                request,
                "website/booking_success.html",
                {
                    "booking": booking_object,
                    "email_sent": email_sent,
                },
            )

    else:

        form = BookingForm()

    return render(
        request,
        "website/booking.html",
        {
            "form": form,
        },
    )


# =========================================================
# Track Booking
# =========================================================

def track_booking(request):

    booking = None
    searched = False
    booking_id = ""

    if request.method == "GET":

        booking_id = request.GET.get(
            "booking_id",
            "",
        ).strip()

        if booking_id:

            searched = True

            try:

                booking = Booking.objects.get(
                    booking_id=booking_id
                )

            except Booking.DoesNotExist:

                booking = None

    return render(
        request,
        "website/track_booking.html",
        {
            "booking": booking,
            "searched": searched,
            "booking_id": booking_id,
        },
    )


# =========================================================
# Booking Receipt
# =========================================================

def booking_receipt(request, booking_id):

    booking = Booking.objects.get(
        booking_id=booking_id
    )

    return render(
        request,
        "website/booking_receipt.html",
        {
            "booking": booking,
        },
    )

# =========================================================
# Admin Dashboard
# =========================================================

def admin_dashboard(request):

    today = timezone.localdate()

    pending_count = Booking.objects.filter(
        status="Pending"
    ).count()

    cancelled_count = Booking.objects.filter(
        status="Cancelled"
    ).count()

    today_bookings = Booking.objects.filter(
        booking_date=today
    ).order_by("booking_date")

    pending_reviews = Review.objects.filter(
        is_visible=False
    ).count()

    latest_booking = Booking.objects.order_by(
        "-created_at"
    ).first()

    context = {

        "total_bookings": Booking.objects.count(),

        "pending_bookings": pending_count,

        "confirmed_bookings": Booking.objects.filter(
            status="Confirmed"
        ).count(),

        "completed_bookings": Booking.objects.filter(
            status="Completed"
        ).count(),

        "cancelled_bookings": cancelled_count,

        "total_reviews": Review.objects.count(),

        "pending_reviews": pending_reviews,

        "today_bookings_count": today_bookings.count(),

        "today_bookings": today_bookings,

        "latest_booking": latest_booking,

        "recent_bookings": Booking.objects.order_by(
            "-created_at"
        )[:10],

    }

    return render(
        request,
        "website/admin_dashboard.html",
        context,
    )

def booking_calendar(request):

    today = timezone.localdate()

    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else today.month
        year = int(year) if year else today.year
    except ValueError:
        month = today.month
        year = today.year

    bookings = Booking.objects.filter(
        booking_date__year=year,
        booking_date__month=month
    ).order_by("booking_date")

    context = {
        "bookings": bookings,
        "current_month": month,
        "current_year": year,
        "calendar": monthcalendar(year, month),
    }

    return render(
        request,
        "website/booking_calendar.html",
        context,
    )