import environment from "../../config/env.js";

/************* Handle root route response **************/
const health = (req, res) => {
  res.json({ message: `Hello from ${environment} environment!` });
};


/*********** modules export from here ************/
export {
  health
};

