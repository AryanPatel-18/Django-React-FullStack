from django.urls import path, include
from .views import Note, NoteDelete, NoteListCreate


urlpatterns = [
    path('notes/', NoteListCreate.as_view(), name='create'),
    path('notes/delete/<int:pk>/', NoteDelete.as_view(), name='delete'),
]
