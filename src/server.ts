import {app ,PORT} from "./app";

require('dotenv').config();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} \n`);
});