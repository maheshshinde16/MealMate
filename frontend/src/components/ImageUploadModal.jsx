import React, { useState } from 'react';
import './ImageUploadModal.css';

const ImageUploadModal = ({ isOpen, item, onClose, onSave, isSaving }) => {
  const [imagePreview, setImagePreview] = useState(item?.imageUrl || null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || '');
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError('');
    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    // Validate URL format
    try {
      new URL(imageUrl);
      setError('');
      setImagePreview(imageUrl);
    } catch {
      setError('Please enter a valid image URL');
    }
  };

  const handleSave = async () => {
    if (!imagePreview) {
      setError('Please select or enter an image');
      return;
    }

    const imageData = uploadMethod === 'file' ? imagePreview : imageUrl;
    await onSave(imageData);
    handleClose();
  };

  const handleClose = () => {
    setImagePreview(item?.imageUrl || null);
    setImageFile(null);
    setImageUrl(item?.imageUrl || '');
    setError('');
    setUploadMethod('file');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Menu Item Image</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Image Preview */}
          <div className="image-preview-section">
            <h3>Preview</h3>
            <div className="preview-container">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <div className="preview-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <p>No image selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Method Tabs */}
          <div className="upload-method-tabs">
            <button
              className={`method-tab ${uploadMethod === 'file' ? 'active' : ''}`}
              onClick={() => {
                setUploadMethod('file');
                setError('');
              }}
            >
              Upload File
            </button>
            <button
              className={`method-tab ${uploadMethod === 'url' ? 'active' : ''}`}
              onClick={() => {
                setUploadMethod('url');
                setError('');
              }}
            >
              Image URL
            </button>
          </div>

          {/* Upload Method Content */}
          <div className="upload-content">
            {uploadMethod === 'file' ? (
              <div className="file-upload-section">
                <label htmlFor="image-input" className="file-input-label">
                  <div className="file-input-content">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>Click to select image or drag and drop</p>
                    <span className="file-size-hint">PNG, JPG, WEBP up to 5MB</span>
                  </div>
                </label>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden-file-input"
                />
                {imageFile && (
                  <div className="selected-file">
                    <span className="file-name">{imageFile.name}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(item?.imageUrl || null);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="url-input-section">
                <label htmlFor="image-url">Image URL</label>
                <div className="url-input-group">
                  <input
                    id="image-url"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="url-input"
                  />
                  <button
                    type="button"
                    className="btn-load-image"
                    onClick={handleUrlSubmit}
                  >
                    Load
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleClose} disabled={isSaving}>
            Cancel
          </button>
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={!imagePreview || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Image'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
