from django import forms
from django.utils import timezone

from .models import Booking


class BookingForm(forms.ModelForm):

    class Meta:
        model = Booking

        fields = [
            "name",
            "phone",
            "email",
            "booking_date",
            "service",
            "address",
        ]

        widgets = {
            "name": forms.TextInput(
                attrs={
                    "placeholder": "Enter your full name",
                }
            ),

            "phone": forms.TextInput(
                attrs={
                    "placeholder": "Enter 10-digit phone number",
                    "maxlength": "10",
                }
            ),

            "email": forms.EmailInput(
                attrs={
                    "placeholder": "Enter your email address",
                }
            ),

            "booking_date": forms.DateInput(
                attrs={
                    "type": "date",
                }
            ),

            "address": forms.Textarea(
                attrs={
                    "placeholder": "Enter your complete address",
                    "rows": 4,
                }
            ),
        }

    def clean_booking_date(self):
        booking_date = self.cleaned_data.get("booking_date")

        if booking_date and booking_date < timezone.localdate():
            raise forms.ValidationError(
                "Booking date cannot be in the past."
            )

        return booking_date