"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { commentService } from '../services/api';
import { UPLOADS_URL } from '../utils/constant';

const CommentComponent = ({ Id, type }) => {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    image: null,
    attachment: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      const response = await commentService.getComments(type, Id);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]); // Set empty array on error
    }
  }, [type, Id]);

  useEffect(() => {
    if (Id && type && (type === 'product' || type === 'article')) {
      fetchComments();
    }
  }, [Id, type, fetchComments]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setSubmitStatus({ type: 'error', message: 'Ukuran file terlalu besar. Maksimal 2MB' });
        return;
      }
      
      // Check file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setSubmitStatus({ type: 'error', message: 'Format file tidak didukung. Gunakan JPG, PNG, atau GIF' });
        return;
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else if (name === 'attachment' && files && files[0]) {
      const file = files[0];
      
      // Check file size (5MB limit for attachments)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({ type: 'error', message: 'Ukuran file attachment terlalu besar. Maksimal 5MB' });
        return;
      }
      
      // Check file type - allow images and documents
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({ type: 'error', message: 'Format file tidak didukung. Gunakan JPG, PNG, GIF, PDF, DOC, DOCX, atau TXT' });
        return;
      }
      
      // Create preview info
      const previewInfo = {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      };
      
      if (file.type.startsWith('image/')) {
        previewInfo.url = URL.createObjectURL(file);
      }
      
      setAttachmentPreview(previewInfo);
      
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const commentData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      type: type,
      item_id: Id,
      image: formData.image,
      attachment: formData.attachment
    };
    console.log(commentData);
    try {
      const response = await commentService.addComment(commentData);
      
      if (response.data) {
        setSubmitStatus({ type: 'success', message: response.data.message });
        setFormData({
          name: '',
          email: '',
          message: '',
          image: null,
          attachment: null
        });
        setImagePreview(null);
        setAttachmentPreview(null);
        // Reset file input
        e.target.reset();
        // Refresh comments after successful submission
        fetchComments();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'An error occurred while submitting the comment'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      if (attachmentPreview?.url) {
        URL.revokeObjectURL(attachmentPreview.url);
      }
    };
  }, [imagePreview, attachmentPreview]);

  return (
    <section id="comment" className="flex justify-center items-center w-full">
      <div className="flex items-center justify-center md:justify-start min-h-screen md:pl-[1%] w-[95%] md:w-[85%]">
        <div className="w-full md:w-[65%] py-6 rounded-lg">
          {/* Existing Comments */}
          <div className="flex flex-col items-start align-start justify-start gap-2 mb-20">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="w-full">
                  <div className="flex flex-row items-center align-center justify-start gap-2 pb-2">
                    <img 
                      src={comment.image ? `${UPLOADS_URL}comments/${comment.image}` : `${UPLOADS_URL}/comments/usercomment.png`} 
                      alt={comment.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-md font-semibold text-[#828282]">{comment.name}</p>
                  </div>
                  <div className="w-full h-auto p-2 border border-gray-300 rounded-xl bg-white mb-2 text-gray-500">
                    {comment.message}
                    {/* Show attachment if exists and it's a product comment */}
                    {comment.attachment && type === 'product' && (
                      <div className="mt-3 p-2 border border-gray-200 rounded-md bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="bi bi-paperclip text-gray-600"></i>
                          <span className="text-sm font-medium text-gray-700">Lampiran:</span>
                        </div>
                        {comment.attachment.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <img 
                            src={`${UPLOADS_URL}comments/attachments/${comment.attachment}`} 
                            alt="Attachment"
                            className="w-32 h-32 object-cover rounded-md cursor-pointer"
                            onClick={() => window.open(`${UPLOADS_URL}comments/attachments/${comment.attachment}`, '_blank')}
                          />
                        ) : (
                          <a 
                            href={`${UPLOADS_URL}comments/attachments/${comment.attachment}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <i className="bi bi-download"></i>
                            {comment.attachment}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
          
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus && (
              <div className={`p-4 rounded-md ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Nama *</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email (Opsional)</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Email@gmail.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Pesan *</label>
              <textarea 
                name="message" 
                required 
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Ketik pesan Anda"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Foto (Opsional)</label>
              <input 
                type="file" 
                name="image" 
                accept="image/jpeg,image/png,image/gif"
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500">Format: JPG, PNG, GIF. Maksimal 2MB</p>
            </div>

            {/* Attachment field - only show for products */}
            {type === 'product' && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Lampiran (Opsional)</label>
                <input 
                  type="file" 
                  name="attachment" 
                  accept="image/jpeg,image/png,image/gif,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {attachmentPreview && (
                  <div className="mt-2 p-3 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="bi bi-paperclip text-gray-600"></i>
                      <span className="text-sm font-medium text-gray-700">{attachmentPreview.name}</span>
                      <span className="text-xs text-gray-500">({attachmentPreview.size})</span>
                    </div>
                    {attachmentPreview.url && (
                      <img 
                        src={attachmentPreview.url} 
                        alt="Attachment Preview" 
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    )}
                  </div>
                )}
                <p className="mt-1 text-sm text-gray-500">Format: JPG, PNG, GIF, PDF, DOC, DOCX, TXT. Maksimal 5MB</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const Comment = ({ Id, type }) => {
  // Validate props before rendering
  if (!Id || !type || (type !== 'product' && type !== 'article')) {
    console.warn('Comment component requires valid Id and type props. Type must be either "product" or "article"');
    return null;
  }

  return <CommentComponent Id={Id} type={type} />;
};
