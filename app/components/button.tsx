type ButtonType = 'submit' | 'reset' | 'button';

interface ButtonProps {
    bgcolor: string;
    color: string;
    text: string;
    type?: ButtonType;
    disabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, bgcolor, color, text, disabled, onClick }) => {
    return (
        <button
            type={type}
            className={`bg-${bgcolor} text-${color}
             py-2 px-4 rounded-xl border-2 h-[49px] bg-gray w-[400px] shadow-sm cursor-pointer `}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
