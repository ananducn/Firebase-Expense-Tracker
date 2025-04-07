export const useGetUserInfo = () => {
  const { name, profilePhoto, userId, isloggedIn } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profilePhoto, userId, isloggedIn };
};
