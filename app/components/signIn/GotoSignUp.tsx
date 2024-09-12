'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';

export const GotoSignUp = () => {
    const router = useRouter();

    const goSignUp = () => {
        router.push('/auth/signUp');
    };
    return (
        <div className="text-center mt-8">
            <Button bgcolor="white" color="[#55AB7B]" text="Create new account" onClick={goSignUp} />
        </div>
    );
};
