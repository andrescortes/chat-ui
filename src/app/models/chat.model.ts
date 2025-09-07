export interface IChat {
  id: string;
  created_at: string;
  text: string;
  editable: boolean;
  sender: string;
  users: IUser,
}

export interface IUser {
  id: string;
  full_name: string;
  avatar_url: string;
}

// {
//   "id": "b328b4c9-a8fe-433a-8a2c-d032221d46f8",
//   "created_at": "2025-09-06T22:57:05.665837+00:00",
//   "text": "test",
//   "editable": false,
//   "sender": "c4c0d1d9-a0fd-4f94-91d3-6c9174e4fa9d",
//   "users": {
//   "id": "c4c0d1d9-a0fd-4f94-91d3-6c9174e4fa9d",
//     "full_name": "Miguel Cortes",
//     "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJSIKHN2xInKp-ZXdljQ4P8434CF7HXw7DSWOh5n7NlNI2jR5U=s96-c"
// }
// }
