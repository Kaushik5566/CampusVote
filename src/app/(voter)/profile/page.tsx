
'use client';

import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { User as UserIcon, Building, GraduationCap, Calendar, Hash, Edit } from 'lucide-react';
import { StudentProfileForm } from '@/components/voter/student-profile-form';
import { Button } from '@/components/ui/button';

function ProfileDetail({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-lg font-semibold">{value}</p>
            </div>
        </div>
    )
}

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user || user.type !== 'student') {
        return null;
    }
    
    const student = user;

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
             <Card className="w-full shadow-2xl">
                <CardHeader className="flex flex-col items-center text-center space-y-4 pb-8 bg-accent/50 rounded-t-xl">
                     <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${student.name}`} alt={student.name} />
                        <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="relative">
                        <CardTitle className="font-headline text-3xl text-primary">{student.name}</CardTitle>
                        <CardDescription className="text-lg">{student.id}</CardDescription>
                         <StudentProfileForm student={student}>
                            <Button variant="ghost" size="icon" className="absolute -right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                                <Edit className="h-5 w-5" />
                            </Button>
                        </StudentProfileForm>
                    </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <ProfileDetail icon={UserIcon} label="Roll No" value={student.rollNo} />
                    <ProfileDetail icon={Building} label="College Name" value={student.collegeName} />
                    <ProfileDetail icon={GraduationCap} label="Course" value={student.course} />
                    <ProfileDetail icon={Hash} label="Year" value={student.year} />
                    <ProfileDetail icon={Calendar} label="Date of Birth" value={format(new Date(student.dob), 'dd MMMM, yyyy')} />
                </CardContent>
            </Card>
        </div>
    );
}
