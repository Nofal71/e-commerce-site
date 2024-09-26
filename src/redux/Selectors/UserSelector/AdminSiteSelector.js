
export const getUserById = (state, userId) => {
    const user = state.admin.data.find(e => e.userId === userId);
    return user ? user : null;
};

export const getAllUsers = (state) => state.admin.data;

export const usersCount = (state) => state.admin.data.length;