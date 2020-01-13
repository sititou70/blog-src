const makePxStyleConst = px => (scale = 1) => `${px * scale}px`;
const px = {
  grid: makePxStyleConst(25),
  index_width: makePxStyleConst(1100),
  postpage_width: makePxStyleConst(700),
  border_radius: makePxStyleConst(3),
};

const color = {
  key: "#1d3e53",
  text: "#223",
  bg: "#eeebeb",
  paper: "#f9f6f3",
  shadow: "rgba(0, 0, 0, 0.1)",
  border: "#ccc",
  transparent: "rgba(255, 255, 255, 0)",
};

const drop_shadow = `0 3px 10px ${color.shadow}`;
const ambient_shadow = `0 0 10px ${color.shadow}`;
const shadow = {
  shadow: `${drop_shadow}, ${ambient_shadow}`,
  drop_shadow,
  ambient_shadow,
};

export const style_consts = {
  px,
  color,
  shadow,
};
export default style_consts;
