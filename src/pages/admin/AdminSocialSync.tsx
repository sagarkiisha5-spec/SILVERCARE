import React, { useState } from "react";
import { Instagram, Facebook, RefreshCw, CheckCircle2, Sparkles, Send, Share2, Eye, MessageSquare, ThumbsUp, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

interface SocialPost {
  id: string;
  platform: "instagram" | "facebook";
  author: string;
  avatar: string;
  handle: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares?: number;
  timestamp: string;
  synced: boolean;
}

const mockSyncedPosts: SocialPost[] = [
  {
    id: "ig-101",
    platform: "instagram",
    author: "SilverCare India",
    handle: "@silvercareindia",
    avatar: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
    content: "🌸 Eldercare Tip of the Week: Regular vital checks and scheduled physiotherapy at home can boost mobility and prevent post-surgical complications. #EldercareIndia #HomeNursing #GurgaonHealth",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/dr-kirandeep-300x300.png",
    likes: 342,
    comments: 28,
    timestamp: "2 hours ago",
    synced: true
  },
  {
    id: "fb-201",
    platform: "facebook",
    author: "SilverCare India",
    handle: "@SilverCareIndiaOfficial",
    avatar: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
    content: "We are proud to serve families across Gurgaon, Delhi NCR, Chandigarh, Mohali, Panchkula & Ludhiana with compassionate 24/7 home nursing & doctor visits. 🩺✨",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/nurse-2-300x300.png",
    likes: 512,
    comments: 46,
    shares: 19,
    timestamp: "Yesterday at 4:30 PM",
    synced: true
  },
  {
    id: "ig-102",
    platform: "instagram",
    author: "SilverCare India",
    handle: "@silvercareindia",
    avatar: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
    content: "Meet Dr. Kirandeep Kaur & our certified nursing supervisors! Committed to delivering patient-first healthcare right at your doorstep. Call 800-14-800-75.",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/Dr-Pashdeep-300x300.png",
    likes: 289,
    comments: 15,
    timestamp: "3 days ago",
    synced: true
  }
];

export default function AdminSocialSync() {
  const [posts, setPosts] = useState<SocialPost[]>(mockSyncedPosts);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("Just now");
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [postText, setPostText] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState({ instagram: true, facebook: true });
  const [publishMessage, setPublishMessage] = useState("");

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1500);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPosts: SocialPost[] = [];
    if (selectedPlatforms.instagram) {
      newPosts.push({
        id: `ig-${Date.now()}`,
        platform: "instagram",
        author: "SilverCare India",
        handle: "@silvercareindia",
        avatar: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
        content: postText,
        likes: 1,
        comments: 0,
        timestamp: "Just now",
        synced: true
      });
    }

    if (selectedPlatforms.facebook) {
      newPosts.push({
        id: `fb-${Date.now()}`,
        platform: "facebook",
        author: "SilverCare India",
        handle: "@SilverCareIndiaOfficial",
        avatar: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
        content: postText,
        likes: 1,
        comments: 0,
        shares: 0,
        timestamp: "Just now",
        synced: true
      });
    }

    setPosts([...newPosts, ...posts]);
    setPostText("");
    setPublishMessage("Post synced & published to Instagram and Facebook successfully!");
    setTimeout(() => setPublishMessage(""), 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Instagram & Facebook Social Media Sync</h1>
          <p className="text-sm text-slate-500 mt-1">
            Synchronize official social feeds (@silvercareindia), publish updates, and monitor patient social engagement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2"
          >
            <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing Accounts..." : "Force Sync Social Feeds"}
          </Button>
        </div>
      </div>

      {/* Connected Accounts Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instagram Channel Card */}
        <Card className="border border-pink-200 bg-gradient-to-r from-pink-50/60 via-purple-50/40 to-white shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Instagram size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Instagram Channel</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Connected
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#7B2CBF] mt-0.5">@silvercareindia</p>
                <p className="text-[11px] text-slate-500 mt-1">Last synced: {lastSyncTime}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleManualSync} className="border-pink-200 text-pink-700 font-bold text-xs">
              Sync Reels
            </Button>
          </CardContent>
        </Card>

        {/* Facebook Channel Card */}
        <Card className="border border-blue-200 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-white shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Facebook size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Facebook Page</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Connected
                  </span>
                </div>
                <p className="text-xs font-semibold text-blue-700 mt-0.5">@SilverCareIndiaOfficial</p>
                <p className="text-[11px] text-slate-500 mt-1">Auto-Sync: Enabled</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleManualSync} className="border-blue-200 text-blue-700 font-bold text-xs">
              Sync Posts
            </Button>
          </CardContent>
        </Card>
      </div>

      {publishMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{publishMessage}</span>
        </div>
      )}

      {/* Cross-Platform Post Composer */}
      <Card className="border border-purple-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles size={18} className="text-[#7B2CBF]" /> Publish & Sync Social Post
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Publish health tips or announcements simultaneously to Instagram & Facebook.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePublish} className="space-y-4">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Write your health tip or eldercare update for Instagram & Facebook..."
              rows={3}
              className="w-full rounded-xl border border-slate-200 p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                <span>Channels:</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.instagram}
                    onChange={(e) => setSelectedPlatforms({ ...selectedPlatforms, instagram: e.target.checked })}
                    className="rounded text-pink-600 focus:ring-pink-500"
                  />
                  <Instagram size={14} className="text-pink-600" /> Instagram
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.facebook}
                    onChange={(e) => setSelectedPlatforms({ ...selectedPlatforms, facebook: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <Facebook size={14} className="text-blue-600" /> Facebook
                </label>
              </div>

              <Button type="submit" className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm">
                <Send size={15} className="mr-2" /> Publish to Selected Channels
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Synced Feed Stream */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Synchronized Social Feed Stream</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={post.avatar} alt={post.author} className="h-9 w-9 rounded-full object-cover border" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{post.author}</h4>
                      <p className="text-[10px] text-slate-500">{post.handle}</p>
                    </div>
                  </div>
                  {post.platform === "instagram" ? (
                    <span className="p-1.5 rounded-lg bg-pink-100 text-pink-600">
                      <Instagram size={16} />
                    </span>
                  ) : (
                    <span className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                      <Facebook size={16} />
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed line-clamp-4">{post.content}</p>

                {post.imageUrl && (
                  <img src={post.imageUrl} alt="Social Media Content" className="h-40 w-full object-cover rounded-xl border border-slate-100" />
                )}
              </CardContent>

              <div className="border-t border-slate-100 p-3 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart size={12} className="text-red-500" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} className="text-slate-400" /> {post.comments}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Synced
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
