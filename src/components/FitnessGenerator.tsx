import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dumbbell, Clock, Target, AlertCircle, Zap, Trophy } from 'lucide-react';

interface FitnessFormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  activityLevel: string;
  medicalConstraints: string;
}

interface WorkoutDay {
  day: string;
  exercises: Array<{
    name: string;
    sets: string;
    reps: string;
    duration?: string;
  }>;
  intensity: 'Low' | 'Moderate' | 'High';
}

export function FitnessGenerator() {
  const [formData, setFormData] = useState<FitnessFormData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    medicalConstraints: ''
  });
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutDay[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof FitnessFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateFitnessPlan = async () => {
    setIsGenerating(true);
    
    // Mock plan generation - In a real app, this would call an API
    setTimeout(() => {
      const mockPlan: WorkoutDay[] = [
        {
          day: 'Monday',
          exercises: [
            { name: 'Push-ups', sets: '3', reps: '12-15' },
            { name: 'Squats', sets: '3', reps: '15-20' },
            { name: 'Plank', sets: '3', reps: '30-60 sec', duration: '30-60 sec' },
            { name: 'Lunges', sets: '2', reps: '10 each leg' }
          ],
          intensity: 'Moderate'
        },
        {
          day: 'Tuesday',
          exercises: [
            { name: 'Walking/Jogging', sets: '1', reps: '30 min', duration: '30 min' },
            { name: 'Jumping Jacks', sets: '3', reps: '20' },
            { name: 'Mountain Climbers', sets: '3', reps: '15' }
          ],
          intensity: 'Moderate'
        },
        {
          day: 'Wednesday',
          exercises: [
            { name: 'Rest Day', sets: '', reps: 'Light stretching or yoga' }
          ],
          intensity: 'Low'
        },
        {
          day: 'Thursday',
          exercises: [
            { name: 'Dumbbell Rows', sets: '3', reps: '12' },
            { name: 'Shoulder Press', sets: '3', reps: '10' },
            { name: 'Deadlifts', sets: '3', reps: '8-10' },
            { name: 'Bicycle Crunches', sets: '3', reps: '20' }
          ],
          intensity: 'High'
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Burpees', sets: '3', reps: '8-10' },
            { name: 'High Knees', sets: '3', reps: '30 sec', duration: '30 sec' },
            { name: 'Push-up to T', sets: '2', reps: '10' }
          ],
          intensity: 'High'
        },
        {
          day: 'Saturday',
          exercises: [
            { name: 'Yoga or Pilates', sets: '1', reps: '45 min', duration: '45 min' },
            { name: 'Light stretching', sets: '1', reps: '15 min', duration: '15 min' }
          ],
          intensity: 'Low'
        },
        {
          day: 'Sunday',
          exercises: [
            { name: 'Rest Day', sets: '', reps: 'Complete rest or light walk' }
          ],
          intensity: 'Low'
        }
      ];
      
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
    }, 2000);
  };

  const isFormValid = formData.age && formData.gender && formData.height && formData.weight && formData.goal && formData.activityLevel;

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Moderate': return 'bg-[#FF6F00]/20 text-[#FF6F00] border-[#FF6F00]/30';
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#1C1C1C]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4CAF50]/30">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Fitness Plan <span className="text-[#4CAF50]">Generator</span>
          </h1>
          <p className="text-xl text-[#B0B0B0] leading-relaxed">
            Get a personalized workout plan tailored to your goals and fitness level
          </p>
        </div>

        {/* Form Section */}
        <Card className="mb-8 bg-[#2C2C2C] border-gray-700 shadow-xl shadow-black/20 rounded-xl">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <Target className="w-6 h-6 text-[#4CAF50]" />
              Tell Us About Yourself
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-white font-medium">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white font-medium">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="bg-[#1C1C1C] border-gray-600 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]/20">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2C2C2C] border-gray-600">
                    <SelectItem value="male" className="text-white hover:bg-[#4CAF50]/20">Male</SelectItem>
                    <SelectItem value="female" className="text-white hover:bg-[#4CAF50]/20">Female</SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-[#4CAF50]/20">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-white font-medium">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height in cm"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-white font-medium">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-white font-medium">Fitness Goal</Label>
                <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                  <SelectTrigger className="bg-[#1C1C1C] border-gray-600 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]/20">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2C2C2C] border-gray-600">
                    <SelectItem value="lose-weight" className="text-white hover:bg-[#4CAF50]/20">Lose Weight</SelectItem>
                    <SelectItem value="gain-muscle" className="text-white hover:bg-[#4CAF50]/20">Gain Muscle</SelectItem>
                    <SelectItem value="maintain-health" className="text-white hover:bg-[#4CAF50]/20">Maintain Health</SelectItem>
                    <SelectItem value="improve-endurance" className="text-white hover:bg-[#4CAF50]/20">Improve Endurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity" className="text-white font-medium">Activity Level</Label>
                <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                  <SelectTrigger className="bg-[#1C1C1C] border-gray-600 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]/20">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2C2C2C] border-gray-600">
                    <SelectItem value="sedentary" className="text-white hover:bg-[#4CAF50]/20">Sedentary (Little/no exercise)</SelectItem>
                    <SelectItem value="moderate" className="text-white hover:bg-[#4CAF50]/20">Moderate (Exercise 1-3 times/week)</SelectItem>
                    <SelectItem value="active" className="text-white hover:bg-[#4CAF50]/20">Active (Exercise 4-6 times/week)</SelectItem>
                    <SelectItem value="very-active" className="text-white hover:bg-[#4CAF50]/20">Very Active (Exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="constraints" className="text-white font-medium">Medical Constraints (Optional)</Label>
              <Textarea
                id="constraints"
                placeholder="Any injuries, medical conditions, or limitations we should know about..."
                value={formData.medicalConstraints}
                onChange={(e) => handleInputChange('medicalConstraints', e.target.value)}
                rows={3}
                className="bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 transition-all duration-200"
              />
            </div>

            <Button
              onClick={generateFitnessPlan}
              disabled={!isFormValid || isGenerating}
              className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-[#4CAF50]/40 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-3" />
                  Generate My Fitness Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Plan Section */}
        {generatedPlan && (
          <div className="space-y-8">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Your Personalized <span className="text-[#4CAF50]">Fitness Plan</span>
              </h2>
              <p className="text-[#B0B0B0] text-lg">
                Follow this weekly routine to achieve your fitness goals
              </p>
            </div>

            <div className="grid gap-6">
              {generatedPlan.map((day, index) => (
                <Card key={index} className="bg-[#2C2C2C] border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300 rounded-xl overflow-hidden group">
                  <CardHeader className="border-b border-gray-700 bg-gradient-to-r from-[#2C2C2C] to-[#343434]">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-2xl font-bold">{day.day}</CardTitle>
                      <Badge className={`${getIntensityColor(day.intensity)} border font-medium px-3 py-1`}>
                        {day.intensity} Intensity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {day.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="flex items-center justify-between py-3 px-4 rounded-lg bg-[#1C1C1C] border border-gray-700 hover:border-[#4CAF50]/30 transition-all duration-200">
                          <div className="flex-1">
                            <p className="font-semibold text-white text-lg">{exercise.name}</p>
                            {exercise.sets && (
                              <p className="text-[#B0B0B0] mt-1">
                                {exercise.sets} sets × {exercise.reps}
                              </p>
                            )}
                            {!exercise.sets && exercise.reps && (
                              <p className="text-[#B0B0B0] mt-1">{exercise.reps}</p>
                            )}
                          </div>
                          {exercise.duration && (
                            <div className="flex items-center text-[#4CAF50] font-medium">
                              <Clock className="w-4 h-4 mr-2" />
                              {exercise.duration}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/30 rounded-xl">
              <CardContent className="p-8">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-blue-400 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-blue-400 mb-4 text-xl">Important Notes</h3>
                    <ul className="text-[#B0B0B0] space-y-2 leading-relaxed">
                      <li>• Always warm up before exercising and cool down afterward</li>
                      <li>• Listen to your body and rest if you feel pain or excessive fatigue</li>
                      <li>• Stay hydrated and maintain proper form during exercises</li>
                      <li>• Consult with a healthcare provider before starting any new fitness program</li>
                      <li>• Progress gradually and adjust intensity based on your comfort level</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}