export const setCityToLocalStorage = (res) => {
  localStorage.setItem("weather", res.city.name);
};

export const getCityFromLocalStorage = () => {
  return localStorage.getItem("weather");
};
