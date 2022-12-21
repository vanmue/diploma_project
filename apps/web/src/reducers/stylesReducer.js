
export const initialStore = {
  header: {
    crimson: 'rgba(65, 9, 53, 0.7)',
    beige: '#F5BFAB',
  },
  navigation: {
    colorWhite: '#FFFFFF',
    darkViolet: '#410935'
  }
}

export default function stylesReducer(store = initialStore, action) {
  switch (action.type) {
    default:
      return store;
  }
}