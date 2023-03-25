import {ChangeEvent, ReactNode} from "react";

type InputWithLabelProps = {
    id: string;
    value: string;
    type?: string;
    placeholder: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
};


const InputWithLabel = ({ id, value, type = 'text', placeholder, onInputChange, children }: InputWithLabelProps) => {
    return (
        <>
            <label className="inline-block mr-2 py-2 focus:ring-transparent" htmlFor={id}>{children}</label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onInputChange}
            />
        </>
    );
};

export default InputWithLabel;