import uuid
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile


def generate_token():
    return str(uuid.uuid4())


def generate_qr(token):
    qr = qrcode.make(token)

    buffer = BytesIO()
    qr.save(buffer, format="PNG")

    return ContentFile(
        buffer.getvalue(),
        name=f"{token}.png"
    )