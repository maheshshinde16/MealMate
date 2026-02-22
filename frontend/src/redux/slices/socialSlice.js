import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  diningRooms: [],
  challenges: [],
  achievements: [],
  feed: [],
  loading: false,
  error: null,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    fetchFriendsStart: (state) => {
      state.loading = true;
    },
    fetchFriendsSuccess: (state, action) => {
      state.friends = action.payload;
      state.loading = false;
    },
    fetchFriendsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload
      );
    },
    createDiningRoom: (state, action) => {
      state.diningRooms.push(action.payload);
    },
    joinDiningRoom: (state, action) => {
      const room = state.diningRooms.find(
        (r) => r.id === action.payload.roomId
      );
      if (room) {
        room.participants.push(action.payload.userId);
      }
    },
    leaveDiningRoom: (state, action) => {
      const room = state.diningRooms.find(
        (r) => r.id === action.payload.roomId
      );
      if (room) {
        room.participants = room.participants.filter(
          (p) => p !== action.payload.userId
        );
      }
    },
    joinChallenge: (state, action) => {
      const challenge = state.challenges.find(
        (c) => c.id === action.payload
      );
      if (challenge) {
        challenge.participants.push(action.payload);
      }
    },
    unlockAchievement: (state, action) => {
      state.achievements.push(action.payload);
    },
    fetchFeedStart: (state) => {
      state.loading = true;
    },
    fetchFeedSuccess: (state, action) => {
      state.feed = action.payload;
      state.loading = false;
    },
    fetchFeedFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFriendsStart,
  fetchFriendsSuccess,
  fetchFriendsFailure,
  addFriend,
  removeFriend,
  createDiningRoom,
  joinDiningRoom,
  leaveDiningRoom,
  joinChallenge,
  unlockAchievement,
  fetchFeedStart,
  fetchFeedSuccess,
  fetchFeedFailure,
} = socialSlice.actions;

export default socialSlice.reducer;
