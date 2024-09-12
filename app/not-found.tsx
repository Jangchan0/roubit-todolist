'use client';

import errorPageBg from '@/public/error.jpg';
import Image from 'next/image';
import { Button } from './components/Button';
import { useRouter } from 'next/navigation';

const Error = () => {
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col justify-center items-center w-screen h-screen gap-10">
                <h2 className="text-7xl font-extrabold mb-8 select-none">Not Found</h2>

                <p className="text-center select-none">
                    존재하지 않는 주소를 입력하셨거나,
                    <br />
                    요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
                </p>

                <Button bgcolor="opacity" color="black" text="Go Home! " onClick={() => router.push('/')} />
                <Image src={errorPageBg} alt="Error" objectFit="contain" layout="fill" className="opacity-50 -z-10" />
            </div>
        </>
    );
};

export default Error;
