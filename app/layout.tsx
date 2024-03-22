import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const myFont = localFont({ src: '../public/fonts/Pretendard-Medium.woff2' });
export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={myFont.className}>{children}</body>
        </html>
    );
}