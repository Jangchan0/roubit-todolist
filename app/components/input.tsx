type ButtonType = 'text' | 'password';

interface InputProps {
    type: ButtonType;
    placeholder: string;
    register: any;
    value?: string;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, register, value }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border rounded-xl p-2 text-black w-[273px] h-[52px] outline-2 focus:outline-[#55AB7B]`}
            autoComplete="off"
            {...register}
            defaultValue={value}
        />
    );
};
