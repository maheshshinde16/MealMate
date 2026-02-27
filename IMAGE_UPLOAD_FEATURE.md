# Menu Item Image Upload Feature

## Overview
This feature allows vendors and restaurants to upload, add, and edit images for their menu items. The implementation includes both frontend components and integrates with the existing backend.

## Components Created

### 1. ImageUploadModal Component
**File:** `frontend/src/components/ImageUploadModal.jsx`

A reusable modal component for image uploads with the following features:
- **Two upload methods:**
  - File upload with drag-and-drop support
  - URL-based image input
- **Image preview:** Real-time preview of selected image
- **Validation:**
  - File type validation (images only)
  - File size validation (max 5MB)
  - URL format validation
- **Error handling:** Clear error messages for validation failures
- **Responsive design:** Works on mobile and desktop

**Props:**
```javascript
{
  isOpen: boolean,           // Whether modal is visible
  item: MenuItem,            // Menu item being edited
  onClose: function,         // Callback when modal closes
  onSave: function,          // Callback when image is saved (receives imageData)
  isSaving: boolean          // Loading state during save
}
```

### 2. Updated VendorDashboard
**File:** `frontend/src/pages/VendorDashboard.jsx`

**Changes:**
- Added image upload modal management state
- Added image display section for each menu item
- Added "Edit Image" button on each menu item card
- Integrated image handling with menu item updates
- Image persists when updating menu items

**New Features:**
- Click the edit icon (pencil) on any menu item to open the image upload modal
- Preview images before saving
- Update images without affecting other menu item details

### 3. Updated FoodCard Component
**File:** `frontend/src/components/FoodCard.jsx`

**Changes:**
- Now displays uploaded images if available
- Falls back to emoji if no image is uploaded
- Works across all pages where FoodCard is used (Browse, Search, etc.)

## Backend Support

The backend already supports the `imageUrl` field in the MenuItem model:

**MenuItem Model:**
- Field: `imageUrl` (String)
- Type: URL or Base64-encoded image data
- Purpose: Stores the image URL/data for the menu item

**API Endpoints:**
- `POST /menu-items` - Create menu item with optional imageUrl
- `PUT /menu-items/{id}` - Update menu item including imageUrl

## How to Use

### For Vendors Adding a New Item:
1. Go to Vendor Dashboard
2. Click "Menu" tab
3. Click "Add New Item" button
4. Fill in the meal details (name, category, price, description)
5. Save the item
6. Click the edit button (pencil icon) on the image section
7. Upload image or enter image URL
8. Click "Save Image"

### For Vendors Editing an Existing Item's Image:
1. Go to Vendor Dashboard
2. Click "Menu" tab
3. Find the menu item
4. Click the edit button (pencil icon) on the image section
5. Choose upload method:
   - **Upload File:** Select an image file (PNG, JPG, WEBP up to 5MB)
   - **Image URL:** Paste a direct image URL (e.g., from Unsplash, Cloudinary)
6. Preview the image
7. Click "Save Image"

### For Customers Viewing Items:
- Images appear automatically in:
  - Browse page (shows all menu items with images)
  - Meal details page
  - Search results
  - Cart (if image is selected)

## Image Storage Options

### Option 1: Base64 Encoding (Current Implementation)
- Upload images are converted to Base64 strings
- Stored directly in the database as string data
- **Pros:** Simple, no external service needed
- **Cons:** Larger database size, slower loading for many images

### Option 2: External Service (Future Enhancement)
For production, consider:
- **Cloudinary:** Free tier available, image optimization
- **AWS S3:** Scalable, good performance
- **Azure Blob Storage:** Native Azure integration
- **Firebase Storage:** Integrated with other Firebase services

## Image Display Across the App

The application uses a smart image selection hierarchy:

1. **MenuItem.imageUrl** - Uploaded/custom image (highest priority)
2. **mealImages mapping** - Hardcoded meal name mappings
3. **Unsplash fallback** - Dynamic image based on meal name

This ensures images always display, even if no image is uploaded.

## CSS Styling

### VendorDashboard.css
New styles for:
- `.menu-item-image-section` - Container for image with edit button
- `.menu-item-image` - Actual image display
- `.menu-item-image-placeholder` - Fallback when no image
- `.btn-edit-image` - Edit button that appears on hover

### ImageUploadModal.css
Complete styling for:
- Modal overlay and animation
- Upload tabs and sections
- File input with drag-drop area
- URL input with load button
- Preview container
- Error messages
- Responsive mobile design

### FoodCard.css
Updated to display images:
- `.food-image-img` - Image display with proper object-fit

## Validation & Error Handling

### Client-side Validation:
- File type check (must be image/*)
- File size check (max 5MB)
- URL format validation
- Empty input prevention

### Error Messages:
- "Please select a valid image file"
- "Image size must be less than 5MB"
- "Please enter a valid image URL"
- "Please select or enter an image"

## Performance Considerations

1. **Image Optimization:**
   - Recommend resizing images before upload
   - Suggest JPEG/WebP for smaller file sizes
   - 5MB limit keeps upload times reasonable

2. **Loading:**
   - Images load lazily when needed
   - Fallback to emoji/Unsplash while loading
   - No blocking on image load failures

3. **Database:**
   - Monitor database size if using Base64
   - Consider external storage for large-scale deployment

## Future Enhancements

1. **Image Cropping:**
   - Add cropping tool before upload
   - Ensure consistent image dimensions

2. **Multiple Images:**
   - Support multiple images per item
   - Image gallery in details view

3. **Image Optimization:**
   - Automatic compression on upload
   - Multiple size variants (thumbnail, full)
   - CDN integration for faster delivery

4. **Analytics:**
   - Track which items have images
   - Monitor image loading performance
   - User engagement with images

## Testing the Feature

### Manual Testing Steps:

1. **Create New Item with Image:**
   - Add menu item
   - Upload image via modal
   - Verify image appears in vendor dashboard

2. **Edit Item Image:**
   - Edit existing item's image
   - Try both upload and URL methods
   - Verify changes persist

3. **View in Customer Page:**
   - Go to Browse page
   - Verify images display correctly
   - Click on item to see details with image

4. **Mobile View:**
   - Test image upload on mobile
   - Verify responsive layout
   - Check touch interactions

## Troubleshooting

### Image Not Displaying:
- Check image URL is accessible
- Verify image file size < 5MB
- Check browser console for errors
- Try different image format

### Modal Not Opening:
- Check ImageUploadModal is imported
- Verify modal state management
- Check browser console for errors

### Image Upload Fails:
- Verify network connectivity
- Check file size (< 5MB)
- Verify image format (PNG, JPG, WEBP)
- Check backend API endpoint

## Code Examples

### Using ImageUploadModal in Other Components:

```jsx
import ImageUploadModal from '../components/ImageUploadModal';

// In your component:
const [showImageModal, setShowImageModal] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

const openModal = (item) => {
  setSelectedItem(item);
  setShowImageModal(true);
};

const handleSaveImage = async (imageData) => {
  // Send imageData to backend
  await updateItem(selectedItem.id, { imageUrl: imageData });
};

// In JSX:
<ImageUploadModal
  isOpen={showImageModal}
  item={selectedItem}
  onClose={() => setShowImageModal(false)}
  onSave={handleSaveImage}
  isSaving={false}
/>
```

## Database Schema

The MenuItem collection in MongoDB already supports:

```javascript
{
  _id: ObjectId,
  vendorId: String,
  vendorName: String,
  name: String,
  category: String,
  price: Number,
  description: String,
  available: Boolean,
  imageUrl: String,        // New field for image
  createdAt: Date
}
```

## Summary

The image upload feature is now fully integrated into the MealMate application. Vendors can:
- ✅ Upload images when creating menu items
- ✅ Edit images for existing items
- ✅ Choose between file upload or image URL
- ✅ See real-time previews
- ✅ View images across all customer-facing pages

Customers can:
- ✅ See menu item images in browse view
- ✅ View images in meal details
- ✅ See images in search results
- ✅ Beautiful fallback when no image is uploaded
