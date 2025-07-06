import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Camera, Send, Award, Leaf } from 'lucide-react';
import { CommunityPost } from '../types';

interface EcoCommunityFeedProps {
  posts: CommunityPost[];
  onLikePost: (postId: string) => void;
  onAddPost: (content: string, image?: string) => void;
}

export default function EcoCommunityFeed({ posts, onLikePost, onAddPost }: EcoCommunityFeedProps) {
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      onAddPost(newPost);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Eco Community</h2>
        <button
          onClick={() => setShowNewPost(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Camera className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your eco-achievement or challenge..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
            rows={3}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowNewPost(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPost}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            {/* Post Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {post.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-800">{post.user}</h4>
                  {post.achievement && (
                    <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                      <Award className="h-3 w-3 text-yellow-600" />
                      <span className="text-xs font-medium text-yellow-800">{post.achievement}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{formatTimeAgo(post.timestamp)}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-800 mb-3">{post.content}</p>
              
              {post.carbonSaved > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Saved {post.carbonSaved.toFixed(1)} kg CO₂ this week!
                    </span>
                  </div>
                </div>
              )}

              {post.image && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onLikePost(post.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-4">Be the first to share your eco-journey!</p>
          <button
            onClick={() => setShowNewPost(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Create First Post
          </button>
        </div>
      )}
    </div>
  );
}