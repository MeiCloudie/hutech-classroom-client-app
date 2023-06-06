import { ToastOptions } from "react-toastify";

const toastBasic: ToastOptions<{}> = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export { toastBasic };
