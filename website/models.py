from django.db import models


class Booking(models.Model):

    SERVICE_CHOICES = [
        ("Bridal Mehndi", "Bridal Mehndi"),
        ("Arabic Mehndi", "Arabic Mehndi"),
        ("Modern Mehndi", "Modern Mehndi"),
    ]

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=10)

    email = models.EmailField(blank=True, null=True)

    booking_date = models.DateField()

    service = models.CharField(
        max_length=50,
        choices=SERVICE_CHOICES
    )

    address = models.TextField()

    booking_id = models.CharField(
        max_length=20,
        unique=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )
    admin_note = models.TextField(
        blank=True,
        default=""
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.booking_id} - {self.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if not self.booking_id:
            self.booking_id = f"BK{self.pk:04d}"
            super().save(update_fields=["booking_id"])

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class Gallery(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="gallery/")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=100)
    price = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to="services/")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.title

class Review(models.Model):

    RATING_CHOICES = [
        (1, "1 Star"),
        (2, "2 Stars"),
        (3, "3 Stars"),
        (4, "4 Stars"),
        (5, "5 Stars"),
    ]

    name = models.CharField(max_length=100)

    email = models.EmailField(
        blank=True,
        null=True
    )

    rating = models.PositiveSmallIntegerField(
        choices=RATING_CHOICES,
        default=5
    )

    message = models.TextField()

    is_visible = models.BooleanField(
        default=False,
        help_text="Enable this to show the review on the website."
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        return f"{self.name} - {self.rating} Stars"