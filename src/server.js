import app from './app';

// run server
app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port ${process.env.PORT || 5000}`); // eslint-disable-line no-console
});
