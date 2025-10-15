import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  User,
  Activity,
  Calendar,
  TrendingUp,
  Target,
  Clock,
  Award,
  BookOpen,
  ChefHat,
  Settings,
  LogOut,
  Crown
} from 'lucide-react';

interface UserDashboardProps {
  user: { name: string; email: string };
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function UserDashboard({ user, onNavigate, onLogout }: UserDashboardProps) {
  const stats = [
    { icon: Activity, label: 'Workouts Completed', value: '12', color: 'text-[#4CAF50]' },
    { icon: ChefHat, label: 'Recipes Saved', value: '8', color: 'text-[#FF6F00]' },
    { icon: Calendar, label: 'Streak Days', value: '5', color: 'text-[#4CAF50]' },
    { icon: Target, label: 'Goals Achieved', value: '3', color: 'text-[#FF6F00]' },
  ];

  const recentActivities = [
    { type: 'workout', title: 'Full Body Strength Training', time: '2 hours ago', icon: Activity },
    { type: 'recipe', title: 'High-Protein Breakfast Bowl', time: '1 day ago', icon: ChefHat },
    { type: 'goal', title: 'Weekly Cardio Goal Completed', time: '2 days ago', icon: Award },
    { type: 'workout', title: 'HIIT Cardio Session', time: '3 days ago', icon: Activity },
  ];

  const quickActions = [
    { id: 'fitness', label: 'Generate New Workout', icon: Activity, description: 'Create a personalized fitness plan' },
    { id: 'recipe', label: 'Find New Recipe', icon: ChefHat, description: 'Discover healthy meal ideas' },
    { id: 'subscription', label: 'Manage Subscription', icon: Crown, description: 'Upgrade your plan for premium features' },
    { id: 'about', label: 'Learn More', icon: BookOpen, description: 'About FitGen and our mission' },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#1C1C1C]">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, <span className="text-[#4CAF50]">{user.name.split(' ')[0]}</span>!
              </h1>
              <p className="text-[#B0B0B0] text-lg">Ready to continue your fitness journey?</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Button
                variant="outline"
                onClick={() => onLogout()}
                className="border-gray-600 text-[#B0B0B0] hover:text-white hover:border-gray-500"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                onClick={() => onLogout()}
                className="border-red-600 text-red-400 hover:text-white hover:border-red-500 hover:bg-red-600/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-[#2C2C2C] border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B0B0] text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/10 flex items-center justify-center border border-[#4CAF50]/20`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="bg-[#2C2C2C] border-gray-700 shadow-xl">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#4CAF50]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-1 gap-4">
                  {quickActions.map((action) => (
                    <Card
                      key={action.id}
                      className="bg-[#1C1C1C] border-gray-600 hover:border-[#4CAF50]/50 transition-all duration-300 cursor-pointer group"
                      onClick={() => onNavigate(action.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/10 rounded-xl flex items-center justify-center border border-[#4CAF50]/20 group-hover:border-[#4CAF50]/50 transition-colors">
                              <action.icon className="w-6 h-6 text-[#4CAF50]" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white mb-1">{action.label}</h3>
                              <p className="text-[#B0B0B0] text-sm">{action.description}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-[#4CAF50] hover:bg-[#45a049] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-[#2C2C2C] border-gray-700 shadow-xl">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#4CAF50]" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#1C1C1C] border border-gray-700">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/10 rounded-lg flex items-center justify-center border border-[#4CAF50]/20 flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-[#4CAF50]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm mb-1">{activity.title}</h4>
                        <p className="text-[#B0B0B0] text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Motivational Card */}
            <Card className="bg-gradient-to-br from-[#4CAF50]/20 to-[#FF6F00]/20 border-[#4CAF50]/30 shadow-xl mt-6">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Keep It Up!</h3>
                <p className="text-[#B0B0B0] text-sm mb-4">
                  You're on a 5-day streak! Consistency is key to reaching your fitness goals.
                </p>
                <Badge className="bg-[#4CAF50] text-white hover:bg-[#45a049]">
                  🔥 5 Day Streak
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
