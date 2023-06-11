const getPublicUserData = async (userId) => {
  const response =
    await apiManager.apis.getPublicUserData.sendFullFeaturedRequest({
      userId,
    });

  return response.data.publicUserData;
};

export { getPublicUserData };
