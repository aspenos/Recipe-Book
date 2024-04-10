import express from 'express';

const app = express();

app.listen(PORT, function() {
    console.log(`Server running at PORT ${PORT}`);
});

