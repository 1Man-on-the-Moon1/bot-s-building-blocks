import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, MessageCircle, AlertTriangle, BarChart3, LogOut,
  Search, Ban, RotateCcw, CheckCircle, Star, Shield, Calendar, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  adminLogout, getAdminStats, mockUsers, mockComplaints,
  type MockUser, type MockComplaint
} from "@/lib/adminStore";

const AdminPanel = () => {
  const navigate = useNavigate();
  const stats = getAdminStats();
  const [users, setUsers] = useState<MockUser[]>(mockUsers);
  const [complaints, setComplaints] = useState<MockComplaint[]>(mockComplaints);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  const toggleBan = (userId: number) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, isBanned: !u.isBanned } : u
    ));
  };

  const resetUser = (userId: number) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, rating: 5.0, reviewsCount: 0 } : u
    ));
  };

  const resolveComplaint = (complaintId: number) => {
    setComplaints(prev => prev.map(c =>
      c.id === complaintId ? { ...c, status: "resolved" as const } : c
    ));
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toString() === searchQuery
  );

  const pendingComplaints = complaints.filter(c => c.status === "pending");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Админ-панель</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={18} />
            <span className="ml-1 hidden sm:inline">Выход</span>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { icon: Users, label: "Всего", value: stats.totalUsers, color: "text-primary" },
            { icon: BarChart3, label: "Активны", value: stats.activeToday, color: "text-accent" },
            { icon: Heart, label: "Мэтчи", value: stats.totalMatches, color: "text-primary" },
            { icon: Calendar, label: "Свидания", value: stats.totalDates, color: "text-accent" },
          ].map((stat, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="w-full grid grid-cols-3 bg-secondary">
            <TabsTrigger value="users" className="gap-1">
              <Users size={14} />
              <span className="hidden sm:inline">Пользователи</span>
              <span className="sm:hidden">Юзеры</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="gap-1 relative">
              <AlertTriangle size={14} />
              <span className="hidden sm:inline">Жалобы</span>
              <span className="sm:hidden">Жалобы</span>
              {pendingComplaints.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
                  {pendingComplaints.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="broadcast" className="gap-1">
              <MessageCircle size={14} />
              <span>Рассылка</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Поиск по имени, городу или ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              {filteredUsers.map((user, i) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{user.name}</span>
                        <span className="text-xs text-muted-foreground">ID: {user.id}</span>
                        {user.isBanned && (
                          <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                            BAN
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5">
                        {user.gender === "male" ? "♂" : "♀"} {user.age} лет · {user.city}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-accent" />
                          {user.rating.toFixed(1)} ({user.reviewsCount})
                        </span>
                        <span>Актив: {user.lastActive}</span>
                      </div>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <Button
                        variant={user.isBanned ? "default" : "destructive"}
                        size="sm"
                        className="text-xs h-8 px-2"
                        onClick={() => toggleBan(user.id)}
                      >
                        <Ban size={14} />
                        <span className="hidden sm:inline ml-1">
                          {user.isBanned ? "Разбан" : "Бан"}
                        </span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs h-8 px-2"
                        onClick={() => resetUser(user.id)}
                      >
                        <RotateCcw size={14} />
                        <span className="hidden sm:inline ml-1">Сброс</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Ничего не найдено
                </div>
              )}
            </div>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-3">
            {complaints.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Нет жалоб
              </div>
            ) : (
              complaints.map((complaint, i) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant={complaint.status === "pending" ? "destructive" : "secondary"}
                          className="text-[10px]"
                        >
                          {complaint.status === "pending" ? "Ожидает" : "Решено"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{complaint.createdAt}</span>
                      </div>
                      <div className="mt-2 text-sm text-foreground">
                        <span className="text-muted-foreground">Тип: </span>
                        <span className="font-medium">{complaint.type}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <div>От: <span className="text-foreground">{complaint.fromUserName}</span> (ID: {complaint.fromUserId})</div>
                        <div>На: <span className="text-foreground">{complaint.targetUserName}</span> (ID: {complaint.targetUserId})</div>
                      </div>
                    </div>

                    {complaint.status === "pending" && (
                      <div className="flex gap-1.5 shrink-0">
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs h-8 px-2"
                          onClick={() => resolveComplaint(complaint.id)}
                        >
                          <CheckCircle size={14} />
                          <span className="hidden sm:inline ml-1">Решить</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="text-xs h-8 px-2"
                          onClick={() => {
                            const target = users.find(u => u.id === complaint.targetUserId);
                            if (target && !target.isBanned) toggleBan(complaint.targetUserId);
                            resolveComplaint(complaint.id);
                          }}
                        >
                          <Ban size={14} />
                          <span className="hidden sm:inline ml-1">Бан</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Broadcast Tab */}
          <TabsContent value="broadcast" className="space-y-4">
            <BroadcastForm userCount={users.filter(u => !u.isBanned).length} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

function BroadcastForm({ userCount }: { userCount: number }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setMessage(""); }, 2000);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-foreground">Рассылка всем пользователям</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Сообщение получат {userCount} активных пользователей
        </p>
      </div>

      <textarea
        placeholder="Текст сообщения..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-32 rounded-lg bg-secondary border border-border p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <Button
        onClick={handleSend}
        disabled={!message.trim() || sent}
        className="w-full"
      >
        {sent ? (
          <>
            <CheckCircle size={16} className="mr-1" />
            Отправлено!
          </>
        ) : (
          <>
            <MessageCircle size={16} className="mr-1" />
            Отправить рассылку
          </>
        )}
      </Button>
    </div>
  );
}

export default AdminPanel;
