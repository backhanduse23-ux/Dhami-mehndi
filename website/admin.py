from django.contrib import admin

from .models import Booking, Contact, Gallery, Service, Review


# =====================================================
# BOOKING BULK ACTIONS
# =====================================================

@admin.action(description="Mark selected bookings as Confirmed")
def mark_confirmed(modeladmin, request, queryset):
    updated_count = queryset.update(status="Confirmed")

    modeladmin.message_user(
        request,
        f"{updated_count} booking(s) marked as Confirmed.",
    )


@admin.action(description="Mark selected bookings as Completed")
def mark_completed(modeladmin, request, queryset):
    updated_count = queryset.update(status="Completed")

    modeladmin.message_user(
        request,
        f"{updated_count} booking(s) marked as Completed.",
    )


@admin.action(description="Mark selected bookings as Cancelled")
def mark_cancelled(modeladmin, request, queryset):
    updated_count = queryset.update(status="Cancelled")

    modeladmin.message_user(
        request,
        f"{updated_count} booking(s) marked as Cancelled.",
    )


@admin.action(description="Mark selected bookings as Pending")
def mark_pending(modeladmin, request, queryset):
    updated_count = queryset.update(status="Pending")

    modeladmin.message_user(
        request,
        f"{updated_count} booking(s) marked as Pending.",
    )


# =====================================================
# BOOKING ADMIN
# =====================================================

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = (
        "booking_id",
        "name",
        "phone",
        "service",
        "booking_date",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "service",
        "booking_date",
    )

    search_fields = (
        "booking_id",
        "name",
        "phone",
        "email",
        "service",
        "address",
    )

    list_editable = (
        "status",
    )

    readonly_fields = (
        "booking_id",
        "created_at",
    )

    ordering = (
        "-created_at",
    )

    date_hierarchy = "booking_date"

    actions = (
        mark_confirmed,
        mark_completed,
        mark_cancelled,
        mark_pending,
    )


# =====================================================
# CONTACT ADMIN
# =====================================================

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "phone",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "phone",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )


# =====================================================
# GALLERY ADMIN
# =====================================================

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "created_at",
    )

    search_fields = (
        "title",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )


# =====================================================
# SERVICE ADMIN
# =====================================================

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "price",
        "created_at",
    )

    search_fields = (
        "title",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )


# =====================================================
# REVIEW BULK ACTIONS
# =====================================================

@admin.action(description="Approve selected reviews")
def approve_reviews(modeladmin, request, queryset):
    updated_count = queryset.update(is_visible=True)

    modeladmin.message_user(
        request,
        f"{updated_count} review(s) approved.",
    )


@admin.action(description="Hide selected reviews")
def hide_reviews(modeladmin, request, queryset):
    updated_count = queryset.update(is_visible=False)

    modeladmin.message_user(
        request,
        f"{updated_count} review(s) hidden.",
    )


# =====================================================
# REVIEW ADMIN
# =====================================================

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "rating",
        "is_visible",
        "created_at",
    )

    list_filter = (
        "rating",
        "is_visible",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "message",
    )

    list_editable = (
        "is_visible",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )

    actions = (
        approve_reviews,
        hide_reviews,
    )