type ButtonType = 'submit' | 'reset' | 'button';

interface ButtonProps {
    bgcolor: string;
    color: string;
    text: string;
    type?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ type, bgcolor, color, text }) => {
    return (
        <button
            type={type}
            // className="bg-slate-400 w-[327px] h-[52px]  py-2 px-4 rounded-md`"
            className={`bg-${bgcolor} text-${color}
             py-2 px-4 rounded-xl border-2 w-[327px]  shadow-sm cursor-pointer focus:border-#55AB7B-500`}
        >
            {text}
        </button>
    );
};

export default Button;
