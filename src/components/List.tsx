import {ReactNode} from "react";
import {Task} from "@/types/task.type";

interface ListProps {
    items: Task[];
    children?: ReactNode;
    removeTaskHandler: (id: number) => void;
}

const List = ({ items, children, removeTaskHandler }: ListProps) => {
    if (!items) {
        return <div>There are no items in this list</div>
    }

    return (
        <>
            {children}
            <div className='list-wrapper max-h-[70vh] overflow-y-scroll'>
                {
                    items
                        .map((item: Task) => {
                            return (
                                <div key={item.id} className='flex columns-2 px-6 py-4 bg-stone-50 shadow-sm mt-2 justify-between'>
                                    <div className="">
                                        <h2>{item.title}</h2>
                                        <p>{item.completed}</p>
                                    </div>
                                    <div className="">
                                        <input
                                            className="cursor-pointer hover:animate-[pulse_1s_ease-in-out] hover:font-semibold"
                                            type={"button"}
                                            value={"Remove Task"}
                                            onClick={removeTaskHandler.bind(null, item.id)}
                                        />
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </>
    )
}

export default List;
