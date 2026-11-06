import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CalmWeeklyPrompt } from './components/CalmWeeklyPrompt';
import { CalmTemplates } from './components/CalmTemplates';
import { CalmCrashCourse } from './components/CalmCrashCourse';
import { CorporateDictionaryView } from './components/CorporateDictionaryView';
import { INITIAL_SANDBOX_POSTS } from './data/seedPosts';
import { SandboxPost, KudosType } from './types';
import { Shield, Sparkles, Smile, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'prompt' | 'templates' | 'course' | 'dictionary'
  >('prompt');

  // Local storage persisted state
  const [completedCourses, setCompletedCourses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('linkedin_campus_completed_courses');
      return saved ? JSON.parse(saved) : ['module-profile', 'module-outreach'];
    } catch {
      return ['module-profile', 'module-outreach'];
    }
  });

  const [posts, setPosts] = useState<SandboxPost[]>(() => {
    try {
      const saved = localStorage.getItem('linkedin_campus_sandbox_posts');
      return saved ? JSON.parse(saved) : INITIAL_SANDBOX_POSTS;
    } catch {
      return INITIAL_SANDBOX_POSTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        'linkedin_campus_completed_courses',
        JSON.stringify(completedCourses)
      );
    } catch (e) {
      console.error(e);
    }
  }, [completedCourses]);

  useEffect(() => {
    try {
      localStorage.setItem('linkedin_campus_sandbox_posts', JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  // Handle kudos toggle
  const handleAddKudos = (postId: string, type: KudosType) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        const currentKudosList = post.userKudos || [];
        const alreadyHasKudos = currentKudosList.includes(type);

        const newKudosList = alreadyHasKudos
          ? currentKudosList.filter((k) => k !== type)
          : [...currentKudosList, type];

        const delta = alreadyHasKudos ? -1 : 1;

        return {
          ...post,
          userKudos: newKudosList,
          kudos: {
            ...post.kudos,
            [type]: Math.max(0, post.kudos[type] + delta),
          },
        };
      })
    );
  };

  // Add post to sandbox
  const handleAddPost = (newPost: SandboxPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Toggle course completion
  const handleToggleCompleteCourse = (courseId: string) => {
    setCompletedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-800 antialiased selection:bg-blue-100">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedCourseCount={completedCourses.length}
      />

      {/* Reassuring Calming Micro-Bar */}
      <div className="bg-emerald-50/80 border-b border-emerald-100/80 py-2 px-4 text-xs text-emerald-900 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold">Safe Student Sandbox:</span>
          <span className="text-emerald-800 hidden sm:inline">
            Drafts stay private between you and campus peers. No recruiters or company algorithms can see what you write here.
          </span>
        </div>
      </div>

      {/* Main Single-Column Focused Viewport */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'prompt' && (
          <CalmWeeklyPrompt
            posts={posts}
            onAddPost={handleAddPost}
            onAddKudos={handleAddKudos}
          />
        )}

        {activeTab === 'templates' && (
          <CalmTemplates onAddPost={handleAddPost} />
        )}

        {activeTab === 'course' && (
          <CalmCrashCourse
            completedCourses={completedCourses}
            onToggleCompleteCourse={handleToggleCompleteCourse}
          />
        )}

        {activeTab === 'dictionary' && <CorporateDictionaryView />}
      </main>

      {/* Simple, peaceful footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">LinkedIn Campus</span>
            <span>· Professional Training Wheels</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Low-stress learning</span>
            <span>·</span>
            <span>AI buzzword cleaner</span>
            <span>·</span>
            <span>Zero posturing required</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
