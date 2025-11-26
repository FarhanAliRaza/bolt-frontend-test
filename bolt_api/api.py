"""Django-Bolt API routes."""
from django_bolt import BoltAPI
import msgspec
from typing import Optional

api = BoltAPI()


@api.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Welcome to Django-Bolt!"}


@api.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok", "service": "django-bolt"}


# Example with path parameters
@api.get("/items/{item_id}")
async def get_item(item_id: int, q: Optional[str] = None):
    """Get an item by ID."""
    return {"item_id": item_id, "q": q}


# Example with request body validation using msgspec
class Item(msgspec.Struct):
    name: str
    price: float
    is_offer: Optional[bool] = None


@api.post("/items")
async def create_item(item: Item):
    """Create a new item."""
    return {"item": item, "created": True}
