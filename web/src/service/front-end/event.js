export const makeImageStoragePath = (eventId, imageName) => {
    return `public/EventFlyer/${eventId}/${imageName}`;
}

export const getFirstFlyerURL = (flyers) => {
  if (flyers && flyers.length > 0) {
    return flyers[0];
  }
  return null;
};
