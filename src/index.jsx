import { createRoot } from "react-dom/client";
import { injectGlobal } from "@emotion/css";

import App from "./public/components/app";

//eslint-disable-next-line no-unused-expressions
injectGlobal`
    * {
        margin: 0;
    }
`;

createRoot(document.getElementById("root")).render(<App />);