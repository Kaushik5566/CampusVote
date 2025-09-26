
'use client';

import type { Candidate } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Trophy } from "lucide-react";

interface WinnersDisplayProps {
    winners: Candidate[];
}

export function WinnersDisplay({ winners }: WinnersDisplayProps) {
    if (winners.length === 0) {
        return (
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>No Winners Determined Yet</CardTitle>
                    <CardDescription>
                        Once voting concludes and votes are tallied, the winners will be displayed here.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {winners.map(winner => (
                <Card key={winner.id} className="overflow-hidden shadow-lg border-yellow-500 border-2">
                    <div className="relative h-48 w-full bg-gradient-to-b from-yellow-300 to-yellow-500 flex items-center justify-center">
                        <Trophy className="h-16 w-16 text-white opacity-20 transform -rotate-12 absolute -top-4 -left-4" />
                        <Trophy className="h-12 w-12 text-white opacity-20 transform rotate-12 absolute bottom-2 right-12" />
                        <div className="relative h-32 w-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                            <Image 
                                src={winner.imageUrl} 
                                alt={`Photo of ${winner.name}`} 
                                fill
                                className="object-cover"
                                sizes="128px"
                                data-ai-hint="person portrait" 
                            />
                        </div>
                    </div>
                     <CardHeader className="text-center pb-2">
                        <CardTitle className="font-headline text-2xl text-primary">{winner.name}</CardTitle>
                        <CardDescription className="font-semibold text-lg text-yellow-600">{winner.position}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                       <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            <span className="font-bold text-lg text-foreground">{winner.votes} Votes</span>
                       </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
