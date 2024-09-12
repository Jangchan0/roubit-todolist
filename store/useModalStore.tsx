import { create } from 'zustand';

interface ModalStoreState {
    updateTaskId: {
        id: string;
        title: string;
    };
    isOpenModal: boolean;
}

interface ModalStoreFunc {
    setModal: (value: boolean) => void;
    setUpdateTaskId: (id: string, title: string) => void;
}

const initalState: ModalStoreState = {
    updateTaskId: {
        id: '',
        title: '',
    },
    isOpenModal: false,
};

export const useModalStore = create<ModalStoreState & ModalStoreFunc>((set) => ({
    ...initalState,
    setModal: (value: boolean) => set({ isOpenModal: value }),
    setUpdateTaskId: (id: string, title: string) =>
        set({
            updateTaskId: {
                id: id,
                title: title,
            },
        }),
}));
