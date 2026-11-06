import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  Send, 
  CornerDownRight, 
  Filter,
  CheckCircle2,
  Award
} from 'lucide-react';
import { SandboxPost, KudosType } from '../types';

interface PeerSandboxFeedProps {
  posts: SandboxPost[];
  onAddKudos: (postId: string, type: KudosType) => void;
  onAddComment: (postId: string, text: string) => void;
  onOpenComposer: () => void;
}

export const PeerSandboxFeed: React.FC<PeerSandboxFeedProps> = ({
  posts,
  onAddKudos,
  onAddComment,
  onOpenComposer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'prompt' | 'my-posts'>('all');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (selectedFilter === 'prompt' && !post.promptTopicId) return false;
    if (selectedFilter === 'my-posts' && !post.isCurrentUser) return false;
    if (selectedSchool !== 'all' && !post.author.university.toLowerCase().includes(selectedSchool.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleCopy = (postId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="space-y-4">
      {/* Sandbox Header & Controls */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <span>Campus Peer Sandbox</span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Safe Learning Environment
              </span>
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              Practice professional posting with fellow students and alumni mentors. Zero employer scrutiny, 100% constructive feedback.
            </p>
          </div>

          <button
            onClick={onOpenComposer}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#004182] rounded-full transition-colors shrink-0"
          >
            + New Sandbox Post
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-100 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Peer Drafts
            </button>
            <button
              onClick={() => setSelectedFilter('prompt')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedFilter === 'prompt'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Week 42 Challenge Only
            </button>
            <button
              onClick={() => setSelectedFilter('my-posts')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedFilter === 'my-posts'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              My Posts
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-[11px] hidden sm:inline">Filter School:</span>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="text-xs bg-neutral-50 border border-neutral-200 rounded px-2 py-1 text-neutral-700 focus:outline-hidden"
            >
              <option value="all">All Universities</option>
              <option value="michigan">Michigan</option>
              <option value="berkeley">UC Berkeley</option>
              <option value="georgia tech">Georgia Tech</option>
              <option value="stanford">Stanford</option>
              <option value="howard">Howard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Post List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center shadow-2xs">
          <GraduationCap className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-neutral-800">No posts found in this view</h3>
          <p className="text-xs text-neutral-500 mt-1 mb-4">
            Be the first student to publish a draft or weekly challenge response in this category!
          </p>
          <button
            onClick={onOpenComposer}
            className="px-4 py-2 text-xs font-semibold bg-[#0A66C2] text-white rounded-full hover:bg-[#004182] transition-colors"
          >
            Draft a Post with Templates
          </button>
        </div>
      ) : (
        filteredPosts.map((post) => {
          const isUser = post.isCurrentUser;
          const userKudosList = post.userKudos || [];

          return (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-2xs transition-shadow hover:shadow-xs"
            >
              {/* Prompt Topic Tag if applicable */}
              {post.promptTopicTitle && (
                <div className="px-4 py-1.5 bg-amber-50/60 border-b border-amber-100 text-[11px] font-medium text-amber-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Weekly Prompt: <strong>{post.promptTopicTitle}</strong></span>
                  </span>
                  <span className="text-[10px] text-amber-700 uppercase font-semibold">Sandbox Response</span>
                </div>
              )}

              {/* Author Strip */}
              <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {post.author.avatarUrl ? (
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-neutral-200 text-neutral-700 font-bold text-sm flex items-center justify-center">
                      {post.author.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                        {post.author.name}
                      </span>
                      {isUser && (
                        <span className="text-[9px] bg-blue-100 text-[#0A66C2] px-1.5 py-0.2 rounded font-bold uppercase">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-tight">
                      {post.author.headline}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
                      <span>{post.author.university}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Training wheels sandbox badge */}
                <div className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Sandbox Practice</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 sm:px-5 pb-3">
                <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans whitespace-pre-line">
                  {post.content}
                </div>
              </div>

              {/* Supportive Kudos Metrics Bar */}
              <div className="px-4 sm:px-5 py-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 bg-neutral-50/40">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="text-xs">🤝</span>
                    <span className="font-semibold tabular-nums text-neutral-700">{post.kudos.relatable}</span>
                    <span className="hidden md:inline">Relatable</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-xs">💡</span>
                    <span className="font-semibold tabular-nums text-neutral-700">{post.kudos.insightful}</span>
                    <span className="hidden md:inline">Insightful</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-xs">🙌</span>
                    <span className="font-semibold tabular-nums text-neutral-700">{post.kudos.inspiring}</span>
                    <span className="hidden md:inline">Cheering</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-xs">🎯</span>
                    <span className="font-semibold tabular-nums text-neutral-700">{post.kudos.clear}</span>
                    <span className="hidden md:inline">Clear</span>
                  </span>
                </div>

                <div>
                  <span>{(post.comments?.length || post.commentsCount)} comments</span>
                </div>
              </div>

              {/* Action Buttons: 4 Kudos Types & Comment & Copy */}
              <div className="px-4 sm:px-5 py-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onAddKudos(post.id, 'relatable')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-neutral-100 transition-colors ${
                      userKudosList.includes('relatable')
                        ? 'text-[#0A66C2] font-bold bg-blue-50/60'
                        : 'text-neutral-600'
                    }`}
                    title="Give 'Relatable' kudos"
                  >
                    <span>🤝</span>
                    <span className="text-[11px]">Relatable</span>
                  </button>

                  <button
                    onClick={() => onAddKudos(post.id, 'insightful')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-neutral-100 transition-colors ${
                      userKudosList.includes('insightful')
                        ? 'text-[#0A66C2] font-bold bg-blue-50/60'
                        : 'text-neutral-600'
                    }`}
                    title="Give 'Insightful' kudos"
                  >
                    <span>💡</span>
                    <span className="text-[11px]">Insightful</span>
                  </button>

                  <button
                    onClick={() => onAddKudos(post.id, 'inspiring')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-neutral-100 transition-colors ${
                      userKudosList.includes('inspiring')
                        ? 'text-[#0A66C2] font-bold bg-blue-50/60'
                        : 'text-neutral-600'
                    }`}
                    title="Give 'Cheering for You' kudos"
                  >
                    <span>🙌</span>
                    <span className="text-[11px]">Cheering</span>
                  </button>

                  <button
                    onClick={() => onAddKudos(post.id, 'clear')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-neutral-100 transition-colors ${
                      userKudosList.includes('clear')
                        ? 'text-[#0A66C2] font-bold bg-blue-50/60'
                        : 'text-neutral-600'
                    }`}
                    title="Give 'Clear & Punchy' kudos"
                  >
                    <span>🎯</span>
                    <span className="text-[11px]">Punchy</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setActiveCommentPostId(
                        activeCommentPostId === post.id ? null : post.id
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 text-neutral-600 hover:text-neutral-900 rounded hover:bg-neutral-100 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">Feedback</span>
                  </button>

                  <button
                    onClick={() => handleCopy(post.id, post.content)}
                    className="flex items-center gap-1 px-3 py-1.5 text-neutral-600 hover:text-[#0A66C2] rounded hover:bg-neutral-100 transition-colors"
                    title="Copy formatted text to paste on real LinkedIn"
                  >
                    {copiedPostId === post.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[11px] font-semibold text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">Export</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Comments & Peer Feedback Drawer */}
              {(activeCommentPostId === post.id || (post.comments && post.comments.length > 0)) && (
                <div className="px-4 sm:px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 space-y-3">
                  {/* Existing Comments */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="space-y-2">
                      {post.comments.map((comm) => (
                        <div
                          key={comm.id}
                          className="p-2.5 bg-white rounded-md border border-neutral-200 text-xs text-neutral-700"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-neutral-900">{comm.authorName}</span>
                            <span className="text-[10px] text-neutral-400">{comm.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mb-1">{comm.authorSchool}</p>
                          <p className="text-neutral-700 leading-relaxed">{comm.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Feedback Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Leave supportive peer feedback or ask a curious question..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCommentSubmit(post.id);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:border-[#0A66C2] focus:outline-hidden"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#0A66C2] text-white rounded-md hover:bg-[#004182] transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })
      )}
    </div>
  );
};
