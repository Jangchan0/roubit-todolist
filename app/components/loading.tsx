import Spinner from '@/public/loadingSpinner.gif';
import Image from 'next/image';

export const Loading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Image src={Spinner} alt="Loading..." width={150} />
        </div>
    );
};
