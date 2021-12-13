import mongoose from 'mongoose';

export const dbConnection = (done: any) => {
  mongoose.connect('mongodb://localhost/hotels_test');
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', (error) => {
      console.warn('Error' + error);
    });
};
export const dbDropping = (done: any) => {
  const { hotels } = mongoose.connection.collections;
  hotels.drop(() => {
    // oauthclients.drop(() => {
    //   oauthtokens.drop(() => {
    //     oauthusers.drop(() => {
    done();
    //     })
    //   })
    // })
  });
};
