
'use client';

import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Vote, Calendar, UserPlus, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function StatCard({ icon: Icon, title, value, footer }: { icon: React.ElementType, title: string, value: string | number, footer: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{footer}</p>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboardPage() {
    const { candidates, votingStartDate, votingEndDate, admins, users } = useAuth();
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    icon={Users}
                    title="Total Candidates"
                    value={candidates.length}
                    footer="Number of candidates running"
                />
                <StatCard 
                    icon={Vote}
                    title="Total Votes Cast"
                    value={totalVotes}
                    footer="Across all positions"
                />
                 <StatCard 
                    icon={GraduationCap}
                    title="Total Students"
                    value={users.length}
                    footer="Registered student accounts"
                />
                <StatCard 
                    icon={Calendar}
                    title="Voting Period"
                    value={`${format(votingStartDate, 'MMM d')} - ${format(votingEndDate, 'MMM d')}`}
                    footer="Current active election dates"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Jump to key management areas.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <Button asChild variant="outline">
                            <Link href="/admin/candidates">Manage Candidates</Link>
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="/admin/students">Manage Students</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/admin/results">View Live Results</Link>
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="/admin/manage-admins">Manage Admins</Link>
                        </Button>
                        <Button asChild variant="outline" className="col-span-2">
                            <Link href="/admin/history">View History</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Election Status</CardTitle>
                        <CardDescription>A summary of the ongoing election.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>The election is currently in progress. You can monitor live results, manage candidates, and view incoming messages from the respective sections.</p>
                        <p className="mt-4">Total Admins: <span className="font-bold">{admins.length}</span></p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
