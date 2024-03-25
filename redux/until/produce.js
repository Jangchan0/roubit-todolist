import { produce } from 'immer';

// eslint-disable-next-line import/no-anonymous-default-export
export default (...args) => {
    return produce(...args);
};
