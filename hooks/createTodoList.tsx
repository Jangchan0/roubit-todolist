import fetchData from './fetch';

interface CreateTodoListInput {
    title: string;
}

const createTodoList = async (createTodoListInput: CreateTodoListInput) => {
    try {
        const { data } = await fetchData({
            query: `
        mutation CreateTodoList($createTodoListInput: CreateTodoListInput!) {
          createTodoList(createTodoListInput: $createTodoListInput) {
            status
            data {
              todolist {
                id
                title
                completed
              }
            }
            message
          }
        }
      `,
            variables: { createTodoListInput },
        });

        return data;
    } catch (error) {
        console.error('Error creating todo list:', error);
        throw new Error('Failed to create todo list');
    }
};

export default createTodoList;
