import React from 'react';

type ButtonType = 'text' | 'password';

interface InputProps {
    type: ButtonType;
    placeholder: string;
    register: any;
}

const Input: React.FC<InputProps> = ({ type, placeholder, register }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border rounded-xl p-2 text-black w-[400px] h-[52px] outline-2 focus:outline-[#55AB7B]`}
            autoComplete="off"
            {...register}
        />
    );
};

export default Input;
