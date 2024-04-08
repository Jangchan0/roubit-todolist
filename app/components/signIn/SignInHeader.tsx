import Image from 'next/image';
import RoubitLogo from '@/public/logo_splash.png';

export const SignInHeader = () => {
    return (
        <div className="flex justify-center mb-8">
            <Image src={RoubitLogo} alt="Login" width={180} height={90} />
        </div>
    );
};
